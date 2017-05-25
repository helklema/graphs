const fs = require('fs');
const open = require('open');
const static = require('node-static');
const Graph = require('./Graph');
const Edge = require('./Edge');

const INPUT_FILE_NAME = './input/data.list';
const BFS = 'Алгоритм поиска в ширину';
const DFS = 'Алгоритм поиска в глубину';
const DIJKSTRA_BUCKET = 'Алгоритм Дейкстры на черпаках';
const PORT = 8282;

fs.readFile(INPUT_FILE_NAME, 'utf8', (err, data) => {
  if (err) throw err;
  const isWin = /^win/.test(process.platform); // is Windows OS
  const lines = data.split(isWin ? '\r\n' : '\n'); // read file lines
  const edgesProps = lines.map(line => line.split(' ')); // convert each line to an array
  const edges = edgesProps.map(p => { // convert each set to an edge
    if (p[0] && p[1] && p[2]) { // if elements is not null and not undefined, create an edge
      return new Edge(p[0], p[1], p[2])
    } else { // else show error message
      console.error('Incorrect arguments');
      // throw new Error('Incorrect arguments');
    }
  });
  const graph = new Graph(edges); // create new graph object
  print(BFS, graph.breadthFirstSearch(3, 10));
  print(DFS, graph.depthFirstSearch(3, 10));
  print(DIJKSTRA_BUCKET, graph.dijkstraBucket(3));
  const code = graph.toGraphVizCode();
  fs.writeFile('./public/output.viz', code, function (err) {
    if (err) return console.log(err);
    buildGraph();
  });
  console.log('Exit: ctrl + c')
});

function print(header, arg) {
  console.log(header);
  if (arg.length) {
    console.log(getPath(arg));
  } else {
    Object.keys(arg).forEach(key => { // for dijkstraBucket
      console.log(`To ${key}: ${getPath(arg[key])}`);
    });
  }
  console.log();
  function getPath(path) {
    return path.map(el => `${el}`).join('->')
  }
}

function buildGraph() {
  const fileServer = new static.Server('./public');

  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      fileServer.serve(request, response);
    }).resume();
  }).listen(PORT);
  open(`http://localhost:${PORT}`);
}
