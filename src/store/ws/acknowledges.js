// Handling acknowledgements from server
import Link from "../classes/Link";
import Node from "../classes/Node";
import Message from "../classes/Message";

export function createNode(
  context,
  { payload: { id, nodes, links } },
  { name }
) {
  const node = new Node(id, name);
  context.commit("createNode", { node });
  context.commit("setRuntimeNode", { node });

  Object.values(nodes).forEach((iNode) => {
    const aNode = new Node(iNode.id, iNode.name);
    context.commit("createNode", { node: aNode });
  });

  Object.values(links).forEach((iLink) => {
    const aNodes = {};
    Object.values(iLink.nodes).forEach((jNode) => {
      aNodes[jNode] = context.state.nodes[jNode];
    });
    const bLink = new Link(
      context.state.links[iLink.node],
      iLink.id,
      iLink.name,
      aNodes
    );
    context.commit("createLink", { link: bLink });
  });
}

export function createLink(
  context,
  { payload: { id } },
  { node, name, nodes }
) {
  const link = new Link(node, id, name, { ...nodes, [node.id]: node });
  context.commit("createLink", { link });
  context.commit("setRuntimeLink", { link });
}

export function sendMessage(
  context,
  { payload: { id, time } },
  { node, content, link }
) {
  const message = new Message(node, id, content, link, time);
  context.commit("createMessage", { message });
}
