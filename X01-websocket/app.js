var ws = require('nodejs-websocket');

var server = ws.createServer(function(conn) {
  conn.on('text', function(text) {
    broadcast(text);
  });

  conn.on('error', function(err) {
    console.log(err);
  });

}).listen(2333);

function broadcast(str) {
  server.connections.forEach(conn => {
    conn.sendText(str);
  })
}
