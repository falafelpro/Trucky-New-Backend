const Truck = require("../../db/Models/Truck");
const normalize = require("normalize-path");
const fs = require("fs");

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
