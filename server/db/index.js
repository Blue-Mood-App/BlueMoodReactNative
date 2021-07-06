const db = require("./db");
const User = require("./models/user");
const Activity = require("./models/activity");
const Mood = require("./models/mood");
const UserActivity = require("./models/userActivity");

//associations
User.belongsToMany(User, { as: "friend", through: "friendship" });

//Mood to activities => mood belongs to activity
//activities can have many moods
// Mood.belongsToMany(Activity, { through: UserActivity });
// Activity.belongsToMany(Mood, { through: UserActivity });

// //user can have many moods
// Mood.belongsToMany(User, { through: UserActivity });
// User.belongsToMany(Mood, { through: UserActivity })

// Activity.belongsToMany(User, { through: UserActivity })
// User.belongsToMany(Activity, { through: UserActivity })


UserActivity.belongsTo(User)
User.hasMany(UserActivity)
UserActivity.belongsTo(Activity)
Activity.hasMany(UserActivity)
UserActivity.belongsTo(Mood)
Mood.hasMany(UserActivity)


module.exports = {
  db,
  models: {
    User,
    Activity,
    Mood,
    UserActivity,
  },
};
