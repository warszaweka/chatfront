export default class GraphNode {
  constructor(real) {
    this.real = real;
    this.x = Math.floor(Math.random() * 900 + 50);
    this.y = Math.floor(Math.random() * 900 + 50);
  }
}
