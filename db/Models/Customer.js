const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    avatar: String,

    headerImage: String,

    favoriteTrucks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Truck" }],

    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
