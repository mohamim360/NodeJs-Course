const express = require("express");

const app = express();

/*this set to be executed for all incoming requests that match the path /. The path '/' represents the root path, meaning it will be executed for all incoming requests.*/ 

app.use('/',(req, res, next) => {
  console.log("this always run");
  next();
});

app.use('/cart',(req, res, next) => {
  console.log("1st middleware");
  res.send('<h2>cart</h2>')
});

app.use('/',(req, res, next) => {
  console.log("2nd middleware");
  res.send('<h2>express.js</h2>')
});

app.listen(3000);
