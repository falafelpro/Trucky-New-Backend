const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  slug: String,
  type: {
    type: String,
    enum: ["starter", "main-course", "side", "desert", "drink", "", null],
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: String,
  price: {
    type: Number,
  },
});
DishSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Dish", DishSchema);
