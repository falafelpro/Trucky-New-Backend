const fs = require("fs");
const Dish = require("../../db/Models/Dish");

exports.FetchDishes = async (req, res, next) => {
  try {
    const dishes = await Dish.find();
    return res.json(dishes);
  } catch (error) {
    next(error);
  }
};
exports.fetchDishById = async (dishId, req, res, next) => {
  try {
    const foundDish = await Dish.findById(dishId);
    return foundDish;
  } catch (error) {
    next(error);
  }
};

exports.UpdateDish = async (req, res, next) => {
  if (req.file) {
    req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
  }
  try {
    console.log(req.body);
    //deletes old Truck picture from assets
    if (fs.existsSync(req.dish.image)) fs.unlinkSync(req.dish.image);
    const newUpdatedDish = await Dish.findByIdAndUpdate(req.dish, req.body, {
      new: true,
    });
    return res.status(200).json(newUpdatedDish);
  } catch (error) {
    next(error);
  }
};

exports.deleteDish = async (req, res, next) => {
  try {
    if (req.dish) {
      await req.dish.remove();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Dish not found" });
    }
  } catch (error) {
    next(error);
  }
};
