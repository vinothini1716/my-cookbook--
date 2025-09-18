const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  userId: { type: String, default: "guest" },
  mealId: String,
  name: String,
  image: String,
  origin: String
}, { timestamps: true });

module.exports = mongoose.model("Favourite", favouriteSchema);
