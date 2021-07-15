const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const result = require("dotenv").config();
const seed = require("../scripts/seed");
const { db } = require('./db')


app.use(morgan("dev"));
app.use(cors());
//app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    const port = process.env.PORT || 1337;
    app.listen(port, () => {
      console.log("Knock, knock");
      console.log("Who's there?");
      console.log(`Your server, listening on port ${port}`);
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();
