const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 5;

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
  displayName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  favoriteActivities: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  agreedToMeet: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  lat: {
    type: Sequelize.STRING,
  },
  long: {
    type: Sequelize.STRING,
  },
});

User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ usernameEmail, password }) {
  const user = await this.findOne({ where: { usernameEmail } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

// Get users on nearby radius.
User.nearbyUsers = async function (coord) {
  const { acos, sin, cos } = Math;
  // Callback function to calculate coordinates that are within 2km/2000m
  const radiusFilter = (user) => {
    return (
      acos(
        sin(user.lat * 0.0175) * sin(coord.lat * 0.0175) +
          cos(user.lat * 0.0175) *
            cos(coord.lat * 0.0175) *
            cos(coord.long * 0.0175 - user.long * 0.0175)
      ) *
        6371 <=
      2
    );
  };
  try {
    //Try find all users
    const users = await User.findAll();
    //Filter those users with the function above and return a new array.
    return users.filter(radiusFilter);
  } catch (err) {
    err.status = 500;
    throw err;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

//User security
//token? encrypt password

module.exports = User;
