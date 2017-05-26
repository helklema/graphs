(function() {

  'use strict';

  var client = new XMLHttpRequest();
  var client2 = new XMLHttpRequest();

  client.open('GET', '/output.viz');
  client.onreadystatechange = function() {
    const code = client.responseText + '';
    if (code !== '') {
      const graph = document.getElementById('graph');
      const svg = Viz(code, 'svg');
      graph.innerHTML = '<hr>'+svg;
    }
  }

  client2.open('GET', '/kruskal.viz');
  client2.onreadystatechange = function() {
    const code = client.responseText + '';
    if (code !== '') {
      const graph = document.getElementById('kruskal');
      const svg = Viz(code, 'svg');
      graph.innerHTML = '<hr>'+svg;
    }
  }

  client.send();
  client2.send();
})();