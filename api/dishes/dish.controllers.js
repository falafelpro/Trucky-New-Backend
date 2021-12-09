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
exports.fetchDishById = async (req, res, next) => {
  try {
    const foundDish = await Dish.findById(req.dish._id);
    if (foundDish) {
      return res.status(200).json(foundDish);
    } else {
      return res.status(404).json({ message: "Dish not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.UpdateDish = async (req, res, next) => {
  if (req.file) {
    req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
  }
  try {
    const foundDish = await Dish.findOne(req.dish);
    if (foundDish) {
      //deletes old Truck picture from assets
      if (fs.existsSync(foundDish.image)) fs.unlinkSync(foundDish.image);
      await foundDish.update(req.body);
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "Dish not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.createDish = async (req, res, next) => {
  if (req.file) {
    req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
  }

  req.body.owner._id = req.payload.id;
  try {
    const newDish = await Dish.create(req.body);
    console.log(newDish);
    return res.status(200).json(newDish);
  } catch (error) {
    next(error);
  }
};

exports.deleteDish = async (req, res, next) => {
  try {
    const foundDish = await Dish.find(req.dish);
    if (foundDish) {
      await foundDish.remove();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Dish not found" });
    }
  } catch (error) {
    next(error);
  }
};
