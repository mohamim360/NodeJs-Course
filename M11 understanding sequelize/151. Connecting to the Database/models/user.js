const Sequelize = require("sequelize");

const sequelize = require("../utilities/database");

const User = sequelize.define("user", {//edit
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,

  
});
 
module.exports = User;