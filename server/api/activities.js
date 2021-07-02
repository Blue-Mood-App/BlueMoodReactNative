const router = require("express").Router();

router.get("/", async function (req, res, next) {
  try {
    /*
    need to find all userSpecificActivities based on a user id
    */
    res.send("hi in activities");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
