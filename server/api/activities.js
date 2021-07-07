const router = require("express").Router();
const {
  models: { User, UserActivity, Activity },
} = require("../db");
const requireToken = require("../auth/middleware");

router.get("/", async function (req, res, next) {
  try {
    // const { user } = req

    const user = await User.findByPk(1);
    user.generateToken();
    /*
    need to find all userSpecificActivities based on a user id
    */
    res.send("hi in activities");
  } catch (error) {
    console.log(error);
  }
});

router.get("/:moodId", requireToken, async function (req, res, next) {
  try {
    const { id } = req.user;
    console.log(id, "userid", req.params.moodId, "mood id in route");
    const activities = await UserActivity.findAll({
      where: {
        userId: id,
        moodId: +req.params.moodId,
      },
      include: [Activity],
    });
    res.send(activities);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
