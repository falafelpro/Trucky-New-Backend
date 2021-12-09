const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  FetchDishes,
  fetchDishById,
  UpdateDish,
  deleteDish,
  createDish,
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
router.put("/:dishId", UpdateDish);
router.delete("/:dishId", deleteDish);
router.get("/", FetchDishes);
router.get("/:dishId", fetchDishById);
router.post("/", passport.authenticate("jwt", { session: false }), createDish);

module.exports = router;
