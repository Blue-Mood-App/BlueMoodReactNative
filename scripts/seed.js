const fetch = require("node-fetch");
const googleJSONCleaner = require("./googleJSONCleaner");
const { white, blue, green } = require("chalk");

const {
  db,
  models: { User, Activity, Mood, UserActivity },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true });
  console.log(blue("synced!"));
  let users, activities, moods, userSpecificActivities;

  try {
  const usersCall = await fetch(
    "https://spreadsheets.google.com/feeds/list/1FOJOP5FwnfP6xDrBp7eUWLqFZlDZL_0yxC3V35MgzrY/1/public/values?alt=json"
  );
  const usersJson = await usersCall.json();
  users = googleJSONCleaner(usersJson.feed.entry);

  const activitiesCall = await fetch(
    "https://spreadsheets.google.com/feeds/list/1QZ2L7CA0waqeGUUmU6aTpO76LnNh0vvmPF1gAE3A3WE/2/public/values?alt=json"
  );
  const activitiesJson = await activitiesCall.json();
  activities = googleJSONCleaner(activitiesJson.feed.entry);

  const moodsCall = await fetch(
    "https://spreadsheets.google.com/feeds/list/1FOJOP5FwnfP6xDrBp7eUWLqFZlDZL_0yxC3V35MgzrY/3/public/values?alt=json"
  );
  const moodsJson = await moodsCall.json();
  moods = googleJSONCleaner(moodsJson.feed.entry);

  const userSpecificActivitiesCall = await fetch(
    "https://spreadsheets.google.com/feeds/list/1FOJOP5FwnfP6xDrBp7eUWLqFZlDZL_0yxC3V35MgzrY/4/public/values?alt=json"
  );
  const userSpecificActivitiesJson = await userSpecificActivitiesCall.json();
  userSpecificActivities = googleJSONCleaner(
    userSpecificActivitiesJson.feed.entry
  );

  } catch(error) {
    console.log(error)
  }

  await User.bulkCreate(users)

  await Activity.bulkCreate(activities)

  await Mood.bulkCreate(moods)

  await Promise.all(
    userSpecificActivities.map((userSpecificActivity) =>
        UserActivity.create({
          moodId: +userSpecificActivity.moodId,
          userId: +userSpecificActivity.userId,
          activityId: +userSpecificActivity.activityId,
        })
    )
  );
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log(blue("closing db connection"));
    await db.close();
    console.log(blue("db connection closed"));
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed;
