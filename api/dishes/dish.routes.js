const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  FetchDishes,
  fetchProfileBySlug,
  UpdateDishes,
  deleteDish,
  createDish,
} = require("./dish.controllers");

router.param("dishSlug", async (req, res, next, dishSlug) => {
  const dish = await fetchIngredients(dishSlug, next);
  if (dish) {
    req.dish = dish;
    next();
  } else {
    next({ status: 404, message: "Dish Not Found!" });
  }
});

router.get("/", FetchDishes);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ingredientCreate
);

module.exports = router;
