export function commCreateNode({ name }) {
  return {
    type: "comm",
    subtype: "createNode",
    payload: { name },
  };
}

export function commCreateLink({ name, nodes }) {
  return {
    type: "comm",
    subtype: "createLink",
    payload: { name, nodes: Object.values(nodes).map((iNode) => iNode.id) },
  };
}

export function commSendMessage({ content, link }) {
  return {
    type: "comm",
    subtype: "sendMessage",
    payload: { content, link: link.id },
  };
}
