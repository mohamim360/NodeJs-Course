const http = require('http');

const express = require('express');

const app = express();
const server = http.createServer(app);

server.listen(3000);

/*The app object is essentially an instance of the Express class, and it provides a set of methods that you can use to define routes, handle HTTP requests and responses, configure middleware, set up error handling, and perform many other tasks required to build a web application.
ex--app.use()

 the app here actually also happens to be a valid request handler, so you can pass app here to create server and if you do that and you run npm start, you will actually have a running server which of course will not handle any requests though because we haven't defined any logic that should happen for incoming requests,*/