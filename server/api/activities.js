const router = require("express").Router();
const {
  models: { User },
} = require("../db");

router.get("/", async function (req, res, next) {
  try {
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

module.exports = router;
