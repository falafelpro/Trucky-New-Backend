const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const { truckListFetch, updateTruck } = require("./trucks.controllers");

const router = express.Router();

router.get("/", truckListFetch);
router.put("/", updateTruck);

module.exports = router;
