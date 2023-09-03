const express = require("express");

const bodyParser = require("body-parser");

const path = require("path");

const mongoose = require("mongoose");



//models
const User = require("./models/user");

//routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//controllers
const errorController = require("./controllers/error");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findById("64f4582b1d1e8ce9b35451e4")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://mohamim360:M51lUp9tDsG545SF@cluster0.k4fqzxy.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then(user =>{
      if(!user){
        const user = new User({
          name: 'Hamim',
          email: 'Hamim@gmail.com',
          cart: {
            items: []
          }
        })
        user.save();
      }
    })
    console.log('connected');
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
