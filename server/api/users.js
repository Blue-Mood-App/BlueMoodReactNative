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

module.exports = router;
