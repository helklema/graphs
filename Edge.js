module.exports = Edge;

function Edge(I, J, C) {
  this.I = parseInt(I, 10);
  this.J = parseInt(J, 10);
  this.C = parseInt(C, 10);
}