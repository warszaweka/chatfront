export default class Link {
  constructor(node, id, name, nodes) {
    this.node = node;
    this.id = id;
    this.name = name;
    this.nodes = nodes;
    this.messages = {};
  }
}
