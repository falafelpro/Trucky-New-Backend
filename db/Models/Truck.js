const mongoose = require("mongoose");
const TruckSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    specialty: {
      type: String,
      enum: ["Burger", "Coffee", "Mexican", "Indian", "", null],
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
      },
    ],
    location: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Truck", TruckSchema);
