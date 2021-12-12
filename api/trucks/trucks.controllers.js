const Truck = require("../../db/Models/Truck");
const normalize = require("normalize-path");
const fs = require("fs");
const Dish = require("../../db/Models/Dish");

exports.fetchTruck = async (truckId, next) => {
  try {
    const truck = await Truck.findById(truckId);
    return truck;
  } catch (error) {
    next(error);
  }
};

exports.truckListFetch = async (req, res, next) => {
  try {
    const trucks = await Truck.find();
    return res.json(trucks);
  } catch (error) {
    next(error);
  }
};

exports.updateTruck = async (req, res, next) => {
  if (req.file) {
    req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
  }
  try {
    const foundTruck = await Truck.findOne({ "owner._id": req.payload.id });
    if (foundTruck) {
      //deletes old Truck picture from assets
      if (fs.existsSync(foundTruck.image)) fs.unlinkSync(foundTruck.image);
      await foundTruck.update(req.body);
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "Truck not found" });
    }
  } catch (error) {
    next(error);
  }
};
exports.createDish = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    req.body.truck = req.params.truckId;
    const newDish = await Dish.create(req.body);
    await Truck.findByIdAndUpdate(req.truck, {
      $push: { dishes: newDish },
    });
    return res.status(201).json(newDish);
  } catch (error) {
    next(error);
  }
};

exports.FetchTruckDishes = async (req, res, next) => {
  try {
    const dishes = await Dish.find({ truck: req.params.truckId });
    return res.json(dishes);
  } catch (error) {
    next(error);
  }
};
