const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const { truckListFetch } = require("./trucks.controllers");

const router = express.Router();

router.get("/", truckListFetch);

module.exports = router;
