const express = require("express");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");

const path = require('path');

const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req,res,next)=>{
   res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})//catch all middleware

app.listen(3000);
