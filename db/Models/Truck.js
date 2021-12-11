const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const TruckSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,

    slug: String,

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

    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  { timestamps: true }
);
TruckSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Truck", TruckSchema);
