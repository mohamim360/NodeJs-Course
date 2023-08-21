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

app.use((req,res,next)=>{
	User.findByPk(1)
	.then(user => {
		req.user = user;
		next()
	})
	.catch(err => console.log(err))
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

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
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

/**The .sync({ force: true }) method call in Sequelize is used to synchronize your defined models with the database by creating the corresponding database tables. The { force: true } option is a powerful flag that tells Sequelize to drop existing tables if they exist and then recreate them according to the model definitions. This essentially means that it will delete any existing data in those tables and start fresh.

Here's a breakdown of what happens when you use .sync({ force: true }):

Dropping Tables: If the tables corresponding to your models already exist in the database, the force: true option will cause Sequelize to drop these tables first.

Recreating Tables: After dropping the existing tables (if any), Sequelize will recreate them based on your model definitions. This includes all the specified columns and their data types.

Data Loss: Keep in mind that using { force: true } will result in data loss, as all the existing data in the dropped tables will be permanently deleted. */
