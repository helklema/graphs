const Bucket = require('./Bucket');
const Edge = require('./Edge');

module.exports = Graph;

function Graph(edges, oriented) {
  // context
  const that = this;

  // private
  const _edges = oriented ? edges.map(e => new Edge(e.J, e.I, e.C)) : edges;
  const _nodes = _edges
    .map(e => e.I)
    .concat(_edges.map(e => e.J))
    .filter((v, i, a) => a.indexOf(v) === i);
  const edgeBunchList = {};
  _edges.forEach((el, index) => {
    const list = edgeBunchList[el.I] ? edgeBunchList[el.I] : [];
    list.push(index);
    edgeBunchList[el.I] = list;
  });

  // public methods
  that.kruskal = kruskal;
  that.depthFirstSearch = depthFirstSearch;
  that.breadthFirstSearch = breadthFirstSearch;
  that.dijkstraBucket = dijkstraBucket;
  that.toGraphVizCode = toGraphVizCode;
  that.getEdgeBunch = getEdgeBunch;

  function getEdgeBunch(node) {
    const result = [];
    if (edgeBunchList[node]) {
      edgeBunchList[node].forEach(el => {
        result.push(_edges[el]);
      });
    }
    return result;
  }

  function edgeComparerC(edgeA, edgeB) {
    return edgeA.C > edgeB.C ? 1 :
      edgeA.C < edgeB.C ? -1 : 0;
  }

  function kruskal() {
    const sortedEdges = _edges.sort(edgeComparerC);
    const resultEdges = [];
    const color = {};

    _nodes.forEach((el, index) => {
      color[el] = index;
    });

    for (let i = 0; i < sortedEdges.length; i += 1) {
      if (color[sortedEdges[i].I] != color[sortedEdges[i].J]) {
        resultEdges.push(sortedEdges[i]);
        const c = color[sortedEdges[i].J];
        for (let j = 0; j < _nodes.length; j += 1) {
          if (color[_nodes[j]] == c) {
            color[_nodes[j]] = color[sortedEdges[i].I];
          }
        }
      }
    }
    return new Graph(resultEdges, true);
  }

  function depthFirstSearch(startNode, goalNode) {
    const checked = [];
    let result = false;
    const map = {};
    let whiteNodes;
    let lastU;

    map[startNode] = [startNode];
    let u = startNode;
    do {
      whiteNodes = [];
      if (!checked.includes(u)) {
        checked.push(u);
        if (u == goalNode) {
          result = true;
          break;
        }
      }

      that.getEdgeBunch(u).forEach(e => {
        if (!checked.includes(e.J)) {
          whiteNodes.push(e.J);
        }
      });

      lastU = u;

      if (whiteNodes.length != 0) {
        const way = [].concat(map[u]);
        way[way.length] = whiteNodes[0];
        if (!map[whiteNodes[0]]) {
          map[whiteNodes[0]] = [...way];
        }
        u = whiteNodes[0];
      } else {
        if (u != startNode) {
          u = map[u][map[u].length - 2];
        }
      }
    } while (!(lastU == startNode && whiteNodes.length == 0));

    return result ? map[goalNode] : null;
  }

  function breadthFirstSearch(startNode, goalNode) {
    let result = false;
    const checked = [];
    const search = [startNode];
    const map = {[startNode]: [startNode]};
    while (search.length) {
      const curr = search.shift();
      if (curr === goalNode) {
        result = true;
        break;
      } else {
        checked.push(curr);
        that.getEdgeBunch(curr).forEach(e => {
          if (!checked.includes(e.J)) {
            const way = [].concat(map[curr]);
            way[way.length] = e.J;
            if (!map[e.J]) {
              map[e.J] = [...way];
            }
            search.push(e.J);
          }
        });
      }
    }
    return result ? map[goalNode] : null;
  }

  function dijkstraBucket(i) {
    const d = {};
    const map = {};
    const checked = [];
    const MAX = Number.MAX_SAFE_INTEGER;
    let u;

    d[i] = 0;
    map[i] = [i];

    _nodes.forEach(el => {
      if (el != i) {
        d[el] = MAX;
      }
    });

    let c = _edges[0].C;
    _edges.forEach(e => {
      if (e.C > c) {
        c = e.C;
      }
    });

    const bucket = new Bucket(c * _nodes.length);
    bucket.insert(i, 0);

    for (let b = 0; b < bucket.length; b += 1) {
      while((u = bucket.get(b)) != -1) {
        that.getEdgeBunch(u).forEach(e => {
          if (d[e.J] > d[u] + e.C) {
            const radj = d[e.J];
            d[e.J] = d[u] + e.C;
            if (radj != MAX) {
              bucket.remove(e.J, radj);
            }
            bucket.insert(e.J, d[e.J]);

            const way = [].concat(map[u]);
            way[way.length] = e.J;
            map[e.J] = [...way];
          }
        });
      }
    }
    return map;
  }

  function toGraphVizCode() {
    let code = 'digraph {\n';
    _edges.forEach(e => {
      code += `${e.I} -> ${e.J} [ label = "${e.C}" ]; \n`;
    })
    code += '}';
    return code;
  }
}