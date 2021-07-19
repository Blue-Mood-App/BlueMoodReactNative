const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const requireToken = require("../auth/middleware");

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

router.get("/nearby", requireToken, async (req, res, next) => {
  try {
    const { user } = req;

    if (user.agreedToMeet) {
      const nearbyUsers = await User.nearbyUsers(user);
      res.send(nearbyUsers);
    } else res.send([])
  } catch (error) {
    next(error);
  }
});

router.put("/", requireToken, async (req, res, next) => {
  try {
    const { lat, long } = req.query;
    const { user } = req;
    await user.update({ lat, long });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
