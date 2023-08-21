const express = require("express");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");

const path = require("path");

const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const sequelize = require("./utilities/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
/**constraints: true: This option enforces referential integrity constraints in the database. It ensures that the foreign key in the child (Product) model references a valid primary key in the parent (User) model.
onDelete: "CASCADE": This option specifies what happens when a user (parent) is deleted. When a user is deleted, the associated products (children) will also be deleted automatically. This is useful to maintain data integrity and prevent orphaned records. */
