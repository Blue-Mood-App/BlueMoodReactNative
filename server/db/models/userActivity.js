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


// UserActivity.beforeCreate((userActivity) => {
//   const { userId, moodId, activityId } = userActivity
//   const doesItExistAlready = UserActivity.findAll({
  //  where: {
//     userId,
//     moodId,
//     activityId
//      }
//   })
//   if (doesItExistAlready.length) return new Error('activity/mood already exists for this user')
// })

module.exports = UserActivity;
