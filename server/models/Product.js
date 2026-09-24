const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    smallDescription: { type: String, trim: true },
    price: { type: Number, required: true },
    codCharge: { type: Number, default: 0 },
    image: { type: String, default: '' },
    images: [{ type: String }],
    videoUrl: { type: String, default: '' },
    isTrending: { type: Boolean, default: false },
    returnable: { type: Boolean, default: true },
    exchangeable: { type: Boolean, default: true },
    returnDays: { type: Number, default: 7 },
    description: { type: String, trim: true },
    keyBenefits: [{ type: String }],
    
    // Dynamic Key-Value Pairs (Material, Color, etc.) save cheyyaan
    additionalDetails: { type: Object, default: {} },
    
    deliveryInformation: { type: String, trim: true },
    returnExchangePolicy: { type: String, trim: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
