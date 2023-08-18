const express = require("express");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");

const path = require("path");

const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const db = require("./utilities/database"); //This will then be the pool basically or well the pool which allows us to use a connection in it

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

db.execute("SELECT * FROM products").then().catch();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
