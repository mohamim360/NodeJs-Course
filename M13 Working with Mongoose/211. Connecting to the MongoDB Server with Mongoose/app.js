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
  // User.findById("64e6b3b97be7daf4ae3722cc")
  //   .then((user) => {
  //     req.user = new User(user.name, user.email, user.cart, user._id);
  //     next();
  //   })
  //   .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://mohamim360:M51lUp9tDsG545SF@cluster0.k4fqzxy.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log('connected');
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
