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

  const usersCall = await fetch(
    "https://spreadsheets.google.com/feeds/list/2PACX-1vTJyTrq6Hz5eg98WUiy2IWG3pBVuAJaqmxdYrs0AE4xKlgRrlEsZCRylOhlo3wQSCLL-nMXIU4RiWOj/1/public/values?alt=json"
  );
  const usersJson = await usersCall.json();
  users = googleJSONCleaner(usersJson.feed.entry);

  const activitiesCall = await fetch(
    "https://spreadsheets.google.com/feeds/list/2PACX-1vTJyTrq6Hz5eg98WUiy2IWG3pBVuAJaqmxdYrs0AE4xKlgRrlEsZCRylOhlo3wQSCLL-nMXIU4RiWOj/2/public/values?alt=json"
  );
  const activitiesJson = await activitiesCall.json();
  activities = googleJSONCleaner(activitiesJson.feed.entry);

  const moodsCall = await fetch(
    "https://spreadsheets.google.com/feeds/list/2PACX-1vTJyTrq6Hz5eg98WUiy2IWG3pBVuAJaqmxdYrs0AE4xKlgRrlEsZCRylOhlo3wQSCLL-nMXIU4RiWOj/3/public/values?alt=json"
  );
  const moodsJson = await moodsCall.json();
  moods = googleJSONCleaner(moodsJson.feed.entry);

  const userSpecificActivitiesCall = await fetch(
    "https://spreadsheets.google.com/feeds/list/2PACX-1vTJyTrq6Hz5eg98WUiy2IWG3pBVuAJaqmxdYrs0AE4xKlgRrlEsZCRylOhlo3wQSCLL-nMXIU4RiWOj/4/public/values?alt=json"
  );
  const userSpecificActivitiesJson = await userSpecificActivitiesCall.json();
  userSpecificActivities = googleJSONCleaner(
    userSpecificActivitiesJson.feed.entry
  );

  await Promise.all(users.map(async (user) => await User.create(user)));
  await Promise.all(
    activities.map(async (activity) => await Activity.create(activity))
  );
  await Promise.all(moods.map(async (mood) => await Mood.create(mood)));
  await Promise.all(
    userSpecificActivities.map(
      async (userSpecificActivity) =>
        await UserActivity.create(userSpecificActivity)
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

runSeed();

module.exports = seed;
