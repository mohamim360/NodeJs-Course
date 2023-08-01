const express = require('express');

const app = express();

const path = require('path');

const rootDir = require('./utilities/path')

app.use(express.static(path.join(__dirname,'public')));

app.use('/users',(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','users.html'))
})

app.use('/',(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','main.html'))
})



app.listen(3000);