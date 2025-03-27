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
  ratings: { type: Number },         // Average ratings (e.g., 4.5)
  // New field: Minimum System Requirements
  minRequirements: {
    os: { type: String },
    processor: { type: String },
    ram: { type: String },
    hardDrive: { type: String },
    videoCard: { type: String },
    soundCard: { type: String },
    directX: { type: String },
    peripherals: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
