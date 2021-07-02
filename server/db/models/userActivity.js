const Sequelize = require("sequelize");
const db = require("../db");

const UserActivity = db.define("userActivity", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: Sequelize.INTEGER,
  },
});

module.exports = UserActivity;
