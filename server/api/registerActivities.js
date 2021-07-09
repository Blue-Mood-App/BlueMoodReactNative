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
    await UserActivity.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:activityId/:userId/:moodId", async function (req, res, next) {
  try {
    const { activityId, userId, moodId } = req.params;
    console.log(req.params);
    await UserActivity.destroy({
      where: {
        activityId,
        userId,
        moodId,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

//delete route for unselected activites goes here

module.exports = router;
