const Sequelize = require("sequelize");
const db = require("../db");

const UserActivity = db.define("userActivity", {
  rating: {
    type: Sequelize.INTEGER,
  },
});

module.exports = UserActivity;
