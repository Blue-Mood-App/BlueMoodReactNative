const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  usernameEmail: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  agreedToMeet: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  favoriteActivities: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  contactList: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

//User security
//token? encrypt password

module.exports = User;
