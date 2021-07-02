const db = require("./db");
const User = require("./models/user");
const Activity = require("./models/activity");
const Mood = require("./models/mood");
const UserActivity = require("./models/userActivity");

//associations
User.belongsToMany(User, { as: "friend", through: "friendship" });

//Mood to activities => mood belongs to activity
//activities can have many moods
Mood.belongsToMany(Activity, { through: UserActivity });
Activity.belongsToMany(Mood, { through: UserActivity });

//user can have many moods
User.belongsToMany(Mood, { through: UserActivity });

module.exports = {
  db,
  models: {
    User,
    Activity,
    Mood,
    UserActivity,
  },
};
