const Customer = require("../../db/Models/Customer");
const User = require("../../db/models/User");

exports.fetchCustomer = async (req, res, next) => {
  try {
    console.log(req.user._id);

    const foundCustomer = await Customer.findOne({ owner: req.user._id });

    console.log(foundCustomer);

    if (foundCustomer) {
      return res.status(200).json(foundCustomer);
    } else {
      return res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    next(error);
  }
};

// exports.fetchCustomerById = async (req, next) => {
//   try {
//     const foundCustomer = await Customer.findById(req.user._id);
//     return foundCustomer;
//   } catch (error) {
//     next(error);
//   }
// };

exports.customerUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
    }
    const customer = await Customer.findOneAndUpdate(
      { owner: req.user._id },
      req.body,

      { new: true, runValidators: true } // returns the updated product
    );
    return res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};
