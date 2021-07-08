const router = require("express").Router();
const {
  models: { Mood, Activity, UserActivity },
} = require("../db");

router.get("/moods", async function (req, res, next) {
  try {
    const moods = await Mood.findAll();
    res.send(moods);
  } catch (err) {
    console.error(err);
  }
});

router.get("/activities", async function (req, res, next) {
  try {
    const activities = await Activity.findAll();
    res.send(activities);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    await UserActivity.create(req.body)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
  }
});

module.exports = router;
