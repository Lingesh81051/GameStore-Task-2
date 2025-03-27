// backend/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
