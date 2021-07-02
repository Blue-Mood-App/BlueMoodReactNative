const router = require("express").Router();

router.use("/activities", require("./activities.js"));
router.use("/places", require("./places.js"));
router.use(function (req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
