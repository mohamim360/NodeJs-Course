

const express = require("express");

const app = express();



const logMiddleware = (req, res, next) => {
  console.log("received request for:", req.url);
  next(); 
};

app.use(logMiddleware);

app.use((req, res, next) => {
  console.log("2nd middleware");
  res.send('<h2>express.js</h2>')
});
//https://github.com/expressjs/express/blob/master/lib/response.js

app.listen(3000);

//https://github.com/expressjs/express/blob/master/lib/application.js
/*
app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
*/