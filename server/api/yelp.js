const fetch = require("node-fetch")
// const result = require('dotenv').config()




const yelpFetch = async (searchQuery, lat, long) => {
  console.log(process.env.Y_KEY)
  const auth = {
    headers: {
      Authorization:
      `Bearer ${process.env.Y_KEY}`,
    },
  };

  const data = await fetch(
    `https://api.yelp.com/v3/businesses/search?categories=${searchQuery}&latitude=${lat}&longitude=${long}&radius=20000`,
    auth
  );

  const mapData = await data.json()

  return mapData
}

module.exports = yelpFetch
