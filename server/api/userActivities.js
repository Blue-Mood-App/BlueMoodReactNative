const router = require("express").Router();
const {
  models: { Mood, Activity, UserActivity },
} = require("../db");
const requireToken = require("../auth/middleware");

router.get("/:userId", async function (req, res, next) {
  try {
    const activities = await UserActivity.findAll({
      where: {
        userId: +req.params.userId,
      },
    });
    res.send(activities);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", requireToken, async function (req, res, next) {
  try {
    await UserActivity.destroy({
      where: {
        userId: +req.user.id,
      },
    });
    const { activities } = req.body;

    for (let i = 0; i < activities.length; i++) {
      let [activityId, moodId] = activities[i].queensAddress.split("-");
      await UserActivity.create({
        userId: +req.user.id,
        activityId: Number(activityId[0]),
        moodId: Number(moodId[0]),
      });
    }
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
});

// router.delete("/:userId", async function (req, res, next) {
//   try {
//     await UserActivity.destroy({
//       where: {
//         userId: +req.params.userId,
//       },
//     });
//     res.sendStatus(204);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
