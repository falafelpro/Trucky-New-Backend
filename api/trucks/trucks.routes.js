const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const {
  truckListFetch,
  updateTruck,
  createDish,
  fetchTruck,
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
  upload.single("image"),
  createDish
);

module.exports = router;
