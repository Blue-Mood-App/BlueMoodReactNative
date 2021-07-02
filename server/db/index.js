const db = require("./db");
const User = require("./models/user");
const Activity = require("./models/activity");
const Mood = require("./models/mood");
const UserActivity = require("./models/userActivity");

//associations
User.belongsToMany(User, { through: "friendship" });

//Mood to activities => mood belongs to activity
//activities can have many moods
Mood.belongsTo(Activity, { through: UserActivity });
Activity.hasMany(Mood, { through: UserActivity });

//user can have many moods
User.hasMany(Mood);

module.exports = {
  db,
  models: {
    User,
    Activity,
    Mood,
    UserActivity,
  },
};
