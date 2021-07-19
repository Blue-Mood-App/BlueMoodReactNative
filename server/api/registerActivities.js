const router = require("express").Router();
const {
  models: { Mood, Activity, UserActivity, User },
} = require("../db");

router.get("/moods", async function (req, res, next) {
  try {
    const moods = await Mood.findAll();
    res.send(moods);
  } catch (err) {
    next(err);
  }
});

router.get("/activities", async function (req, res, next) {
  try {
    const activities = await Activity.findAll();
    res.send(activities);
  } catch (err) {
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    await UserActivity.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.delete("/:activityId/:userId/:moodId", async function (req, res, next) {
  try {
    const { activityId, userId, moodId } = req.params;

    await UserActivity.destroy({
      where: {
        activityId,
        userId,
        moodId,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//delete route for unselected activites goes here
router.delete("/:activityId/:userId/:moodId", async function (req, res, next) {
  try {
    const { activityId, userId, moodId } = req.params;

    await UserActivity.destroy({
      where: {
        activityId,
        userId,
        moodId,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//Contact List put route.
router.put("/:userId", async function (req, res, next) {
  const { agreedToMeet, displayName, phoneNumber } = req.body;
  const { userId } = req.params;
  try {
    await User.update(
      { agreedToMeet, displayName: displayName, phoneNumber: phoneNumber },
      { where: { id: userId } }
    );
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//update agreedToMeet
router.put("/:userId", async function (req, res, next) {
  const { userId } = req.params;
  try {
    await User.update({ agreedToMeet }, { where: { id: userId } });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
