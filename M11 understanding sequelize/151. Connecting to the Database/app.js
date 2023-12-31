const express = require("express");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");

const path = require("path");

const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const sequelize = require("./utilities/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order)
Order.belongsToMany(Product, { through : OrderItem})

sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    //console.log(result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "hamim", email: "hamim@mail.com" });
    }
    return user;
  })
  .then((user) => {
    //console.log(user);
    return user.createCart();
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
/**the reason app.listen(3000); is placed where it is in the promise chain is to ensure that the server starts only after all the database synchronization, user creation/retrieval, and cart creation tasks have been successfully completed. This approach ensures that your server doesn't start prematurely and that the necessary database setup is in place before handling incoming requests. */