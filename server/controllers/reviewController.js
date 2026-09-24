const Review = require('../models/Reviews');

// Get All Reviews (Optionally filter by product ID using query: ?product=ID)
exports.getReviews = async (req, res) => {
  try {
    const filter = req.query.productId ? { product: req.query.productId } : {};
    const reviews = await Review.find(filter)
      .populate('product', 'name image price')
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create New Review
exports.createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Review / Toggle Approval Status
exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Review
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};