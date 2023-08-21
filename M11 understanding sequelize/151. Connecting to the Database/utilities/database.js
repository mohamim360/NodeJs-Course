const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "ham20ham20", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;