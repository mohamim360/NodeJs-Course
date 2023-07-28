const http = require("http");

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

const server = http.createServer(app);

/* you see that we also get no dying request anymore because even though we're not calling

next here and we shouldn't, we're doing the alternative, we're sending a response with send*/

server.listen(3000);

