const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/cart" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>'
  );
});

//this middleware always executes, not just for post requests but also for get requests, what can we do regarding that?
// app.use("/cart", (req,res)=>{
//   console.log(req.body);
//   res.redirect('/');
// })

//solution use app.get app.post
app.post("/cart", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h2>express.js</h2>");
});

app.listen(3000);
