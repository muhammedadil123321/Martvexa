const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true },
    linkedProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Video', videoSchema);
