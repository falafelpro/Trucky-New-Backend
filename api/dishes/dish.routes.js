const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();

const {
  FetchDishes,
  fetchDishById,
  UpdateDish,
  deleteDish,
} = require("./dish.controllers");

router.param("dishId", async (req, res, next, dishId) => {
  const dish = await fetchDishById(dishId, next);
  if (dish) {
    req.dish = dish;
    next();
  } else {
    next({ status: 404, message: "Dish Not Found!" });
  }
});
router.put(
  "/:dishId",
  passport.authenticate("jwt", { session: false }),
  //here a middleware that checks user truck ownership
  upload.single("image"),
  UpdateDish
);
router.delete("/:dishId", deleteDish);
router.get("/", FetchDishes);
router.get("/:dishId", fetchDishById);

module.exports = router;
