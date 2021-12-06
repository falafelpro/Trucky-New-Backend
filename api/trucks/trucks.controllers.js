const Truck = require("../../db/Models/Truck");
const normalize = require("normalize-path");

exports.truckListFetch = async (req, res, next) => {
  try {
    const trucks = await Truck.find();
    return res.json(trucks);
  } catch (error) {
    next(error);
  }
};
