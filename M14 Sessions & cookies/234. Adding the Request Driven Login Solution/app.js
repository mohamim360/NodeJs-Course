const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const session = require("express-session");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);

//session middleware:

// secret: This is a required option and should be a string that serves as the secret key for signing the session ID cookie. It's important to keep this secret secure, as it helps protect your users' session data.

// resave: When set to false, it indicates that the session should not be saved to the store on every request. Instead, it will only be saved when the session data has been modified. Setting this to false is generally recommended to reduce unnecessary session store writes and improve performance.

// saveUninitialized: When set to false, it means that the session will not be saved for a session that is uninitialized (i.e., if no changes have been made to the session data). This can help reduce storage and improve performance because it avoids creating unnecessary sessions.

app.use((req, res, next) => {
  User.findById("5bab316ce0a7c75f783cb8a8")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://mohamim360:M51lUp9tDsG545SF@cluster0.k4fqzxy.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "max@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
