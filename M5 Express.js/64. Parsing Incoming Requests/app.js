const express = require("express");

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/cart" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>'
  );
});

//Now one thing of course is missing. This right now would also execute for incoming get data request,well we only want to listen to a post request,so what can we do regarding that? see next--65

app.use("/cart", (req,res)=>{
  console.log(req.body);                                 
  //without parser--undefined
  //request gives us this body convenience property here but by default, request doesn't try to parse the incoming request body.
  res.redirect('/');
})

app.use("/", (req, res, next) => {
  res.send("<h2>express.js</h2>");
});

app.listen(3000);


//1
/*
the difference between express.urlencoded({ extended: true }) and express.urlencoded({ extended: false }) lies in how nested objects in URL-encoded form data are handled. If you expect to receive nested objects in your form data 
{
  "user": {
    "name": "John",
    "age": "30"
  }
}
, use express.urlencoded({ extended: true }). Otherwise, if you only need simple key-value pairs {
  "user[name]": "John",
  "user[age]": "30"
}
, you can use express.urlencoded({ extended: false }).





*/
