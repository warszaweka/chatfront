import Node from "../classes/Node";
import Link from "../classes/Link";
import Message from "../classes/Message";

export function newNode(context, { payload: { id, name } }) {
  const node = new Node(id, name);
  context.commit("createNode", { node });
  return node;
}

export function newLink(context, { payload: { node, id, name, nodes } }) {
  const aNodes = {};
  Object.values(nodes).forEach((iNode) => {
    aNodes[iNode] = context.state.nodes[iNode];
  });
  const link = new Link(context.state.nodes[node], id, name, aNodes);
  context.commit("createLink", { link });
  return link;
}

export function recievedMessage(
  context,
  { payload: { node, id, content, link, time } }
) {
  const message = new Message(
    context.state.nodes[node],
    id,
    content,
    context.state.links[link],
    time
  );
  context.commit("createMessage", { message });
  return message;
}

export function newMessage(context, { payload: { node, id, link, time } }) {
  const message = new Message(
    context.state.nodes[node],
    id,
    "",
    context.state.links[link],
    time
  );
  context.commit("createMessage", { message });
}

export function deadNode(context, { payload: { id } }) {
  context.commit("killNode", { node: context.state.nodes[id] });
}
