const router = require("express").Router();
const {
  models: { Mood, Activity, UserActivity },
} = require("../db");

router.get("/:userId", async function (req, res, next) {
  try {
    const activities = await UserActivity.findAll({
      where: {
        userId: +req.params.userId,
      },
    });
    res.send(activities);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
