const router = require("express").Router();
const {
  models: { User },
} = require("../db");

router.get("/me", async (req, res, next) => {
  try {
    const { usernameEmail, password } = req.body;
    const user = await User.findOne({
      where: {
        usernameEmail,
        password: password,
      },
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/nearby", async (req, res, next) => {
  try {
    //Not totally suer if deconstruct is needed or we can pass down the whole query.

    const { lat, long } = req.query;
    //console.log(lat, long);
    const nearbyUsers = await User.nearbyUsers({ lat, long });
    res.send(nearbyUsers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
