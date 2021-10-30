const express = require("express");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
app.use(passport.initialize());

const google = express.Router();
app.use("/", google);
require("./Auth/google")(app, passport);

app.listen(8013, () => {
  console.log("we are connescted 8013");
});
