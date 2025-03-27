// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  image: { type: String, required: true },
  categories: { type: [String], default: [] },
  trailer: { type: String },       // YouTube embed link for the game trailer
  developer: { type: String },       // Developer name
  releaseDate: { type: Date },       // Release date of the game
  platform: { type: String },        // Platforms the game is available on
  ratings: { type: Number }          // Average ratings (e.g., 4.5)
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);