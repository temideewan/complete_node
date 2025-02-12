const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  inStock: Boolean,
  tags: [String],
});
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
