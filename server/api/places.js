const router = require("express").Router();
const fetch = require("node-fetch");
const { blue } = require("chalk");
const yelpFetch = require('./yelp')

router.get("/", async function (req, res, next) {
  /*
Once a user picks an activity, we need to find this activity in the table, grab the search query, and then modify that in the api call
*/
  try {
    const { searchQuery, lat, long } = req.query;
    const mapData = await yelpFetch(searchQuery, lat, long)

    res.send(mapData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
