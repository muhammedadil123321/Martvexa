const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    whatsappNumber: {
      type: String,
      default: '918891900699',
    },
    messageTemplate: {
      type: String,
      default: 'Hi Martvexa,\n\nI want to order this item:\n🛍️ *{product_name}*\n💵 Total Amount: *₹{price}*\n\nPlease confirm my order.',
    },
    adminEmail: {
      type: String,
      default: 'admin@gmail.com',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
