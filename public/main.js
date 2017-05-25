(function() {

  'use strict';

  var client = new XMLHttpRequest();

  client.open('GET', '/output.viz');
  client.onreadystatechange = function() {
    const code = client.responseText + '';
    if (code !== '') {
      const graph = document.getElementById('graph');
      const svg = Viz(code, 'svg');
      graph.innerHTML = '<hr>'+svg;
    }
  }

  client.send();
})();