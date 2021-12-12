const express = require("express");
const passport = require("passport");
const isTruckOwner = require("../../middleware/isTruckOwner");
const upload = require("../../middleware/multer");

const {
  truckListFetch,
  updateTruck,
  createDish,
  fetchTruck,
  FetchTruckDishes,
} = require("./trucks.controllers");

const router = express.Router();

// Param Middleware
router.param("truckId", async (req, res, next, truckId) => {
  const truck = await fetchTruck(truckId, next);
  if (truck) {
    req.truck = truck;
    next();
  } else {
    next({ status: 404, message: "Truck Not Found!" });
  }
});

router.get("/", truckListFetch);
router.put("/", updateTruck);
router.post(
  "/:truckId/dishes",
  passport.authenticate("jwt", { session: false }),
  //here a middleware that checks user truck ownership
  isTruckOwner,
  upload.single("image"),
  createDish
);
router.get(
  "/:truckId/dishes",
  passport.authenticate("jwt", { session: false }),
  isTruckOwner,
  FetchTruckDishes
);
module.exports = router;
