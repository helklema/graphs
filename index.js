const fs = require('fs'); // модуль системных файлов
const open = require('open'); // браузер
const static = require('node-static'); // поднимаем статический сервер
const Graph = require('./Graph');
const Edge = require('./Edge');
// const Heap = require('./Heap');

const INPUT_FILE_NAME = './input/data.list';
const BFS = 'Алгоритм поиска в ширину';
const DFS = 'Алгоритм поиска в глубину';
const DIJKSTRA_BUCKET = 'Алгоритм Дейкстры на черпаках';
const PORT = 8282;

fs.readFile(INPUT_FILE_NAME, 'utf8', (err, data) => {
  if (err) throw err;
  const isWin = /^win/.test(process.platform); // для виндовс
  const lines = data.split(isWin ? '\r\n' : '\n'); // чтение файла
  const edgesProps = lines.map(line => line.split(' ')); // преобразование входных данных в массив
  const edges = edgesProps.map(p => { // конвертация в ребра
    if (p[0] && p[1] && p[2]) { // проверка корректности введенных данных для ребер
      return new Edge(p[0], p[1], p[2])
    } else { // иначе ошибка
      console.error('Incorrect arguments');
      // throw new Error('Incorrect arguments');
    }
  });
  const graph = new Graph(edges); // создается новый объект графа
  print(BFS, graph.breadthFirstSearch(3, 10));  //поиск в глубину из тройки 
  print(DFS, graph.depthFirstSearch(3, 10));  //поиск в ширину из тройки
  print(DIJKSTRA_BUCKET, graph.dijkstraBucket(3));
  const code = graph.toGraphVizCode();

  const heapOfTrash = [4, 10, 11, 55, 1, 2, 0, 5, 6];
  print('input', heapOfTrash);
  print('output', heapSort(heapOfTrash));
  /*heapOfTrash.forEach(el => {
    console.log(`${el}, `);
  });
  console.log('output')
  heapSort(heapOfTrash).forEach(el => {
    console.log(`${el}, `);
  })*/
/*  Heap.sort(heapOfTrash).forEach(el => {
    console.log(`${el}, `);
  });
*/  // const kruskal = graph.kruskal().toGraphVizCode();
  /* fs.writeFile('./public/output.viz', code, function (err) {
    if (err) return console.log(err);
    fs.writeFile('./public/kruskal.viz', kruskal, function(err) {
      if (err) return console.log(err);
      buildGraph();
    });
  }); */
  console.log('Exit: ctrl + c')
});

function print(header, arg) {
  console.log(header);
  if (arg.length) {
    console.log(getPath(arg));
  } else {
    Object.keys(arg).forEach(key => { // для черпаков дейкстры
      console.log(`To ${key}: ${getPath(arg[key])}`);  //макет
    });
  }
  console.log();
  function getPath(path) {
    return path.map(el => `${el}`).join('->')
  }
}

function heapSort(list) {
  if (list.length == 0) return [];
  var n = list.length,
    i = Math.floor(n/2), j, k, t; 
      while (true) {
    if (i > 0) t = list[--i];
    else {
      n--;
      if (n == 0) return list;
      t = list[n];
      list[n] = list[0];
    }
    j = i; k = j*2+1;
    while (k < n) {
      if (k + 1 < n && list[k + 1] > list[k]) k++;
      if (list[k] > t) {
        list[j] = list[k];
        j = k;
        k = j*2+1;
      } else break;
    }
    list[j] = t;
  }
}


function buildGraph() {
  const fileServer = new static.Server('./public');  //визуализация

  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      fileServer.serve(request, response);
    }).resume();
  }).listen(PORT);
  open(`http://localhost:${PORT}`);
}
