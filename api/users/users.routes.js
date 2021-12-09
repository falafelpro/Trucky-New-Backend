const express = require("express");
const passport = require("passport");
const {
  signup,
  signin,
  updateCredentials,
  updateUserDetail,
} = require("./users.controllers");

const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
// REVIEW: Bad naming, call it for example /users, we dont add the word update, delete to our paths
router.put(
  "/update-credentials",
  passport.authenticate("local", { session: false }),
  updateCredentials
);

router.put(
  "/update-user-detail",
  passport.authenticate("jwt", { session: false }),
  updateUserDetail
);
module.exports = router;
