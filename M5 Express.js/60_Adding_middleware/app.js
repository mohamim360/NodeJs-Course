const http = require("http");

const express = require("express");

const app = express();

//Custom middleware function

const logMiddleware = (req, res, next) => {
  console.log("received request for:", req.url);
  next(); // Pass control to the next middleware function,if you do not use next it will not show next middleware
};

app.use(logMiddleware);

app.use((req, res, next) => {
  console.log("2nd middleware");
});

const server = http.createServer(app);

server.listen(3000);

/*
Middleware functions are executed in the order they are defined and can either end the request-response cycle by sending a response or pass the control to the next middleware function using next(). Middleware functions can be added using the app.use() method or specific HTTP method functions like app.get(), app.post(), etc.
*/
