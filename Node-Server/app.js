const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  process.exit();
});

//Listen now actually starts a process where nodejs will not immediately exit our script but where nodejs will instead keep this running to listen

server.listen(3000);