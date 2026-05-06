const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,

  brand: String,
  warranty: String,
  offers: String,
  discount: String
});

module.exports = mongoose.model("Product", productSchema);