const router = require("express").Router();
const {
  models: { Mood, Activity },
} = require("../db");
const { route } = require("./activities");

router.get("/moods", async function (req, res, next) {
  try {
    const moods = await Mood.findAll();
    console.log(moods);
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

module.exports = router;
