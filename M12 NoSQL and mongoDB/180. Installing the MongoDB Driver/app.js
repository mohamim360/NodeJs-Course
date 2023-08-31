const express = require("express");

const bodyParser = require("body-parser");

const path = require("path");

//utilities
const mongoConnect = require("./utilities/database").mongoConnect;

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
  User.findById("64e6b3b97be7daf4ae3722cc")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
