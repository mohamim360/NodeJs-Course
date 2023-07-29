const express = require('express');

const app = express();

app.use('/users',(req,res,next)=>{
  console.log("1st middleware");
  res.send('<h2>users</h2>')
})

app.use('/',(req,res,next)=>{
  console.log("2nd middleware");
  res.send('<h2>hello</h2>')
})

/*
  app.use((req,res,next)=>{
  console.log("2nd middleware");
  res.send('<h2>hello</h2>')

})*/

app.listen(3000);