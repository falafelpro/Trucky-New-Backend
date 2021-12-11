const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: { type: String },
  slug: { type: String },
  type: {
    type: String,
    enum: ["starter", "main-course", "side", "desert", "drink", "", null],
  },
  description: { type: String },
  price: {
    type: Number,
  },
  truck: { type: mongoose.Schema.Types.ObjectId, ref: "Truck" },
});
DishSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Dish", DishSchema);
