const Sequelize = require("sequelize");
const db = require("../db");

const Activity = db.define("activity", {
  name: {
    type: Sequelize.STRING,
  },
  searchQuery: {
    type: Sequelize.STRING,
  },
});

module.exports = Activity;
