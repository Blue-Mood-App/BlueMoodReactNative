const router = require("express").Router();
const fetch = require("node-fetch");
const { blue } = require("chalk");

router.get("/", async function (req, res, next) {
  /*
Once a user picks an activity, we need to find this activity in the table, grab the search query, and then modify that in the api call
*/

  try {
    const { searchQuery, lat, long } = req.query;

    const auth = {
      headers: {
        Authorization:
          "Bearer mzV3sXG2N7TBo_ESDOAeYcdVDFBC2sw2aTSI_NhEB4TRwFu6y7XxLSj_47_N2OLMIH0c0VCGuYKIOC--59jDtkmWMS1NhNhyXcO0q6ZiWJOmCRgjv8S4g35YGg_eYHYx",
      },
    };

    const data = await fetch(
      `https://api.yelp.com/v3/businesses/search?categories=${searchQuery}&latitude=${lat}&longitude=${long}&radius=20000`,
      auth
    );

    const mapData = await data.json();

    // console.log(blue('in route', mapData))
    res.send(mapData);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
