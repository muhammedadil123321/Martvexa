const Video = require('../models/Video');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
exports.getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().populate('linkedProductId', 'name image price').sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new video
// @route   POST /api/videos
// @access  Public / Admin
exports.createVideo = async (req, res, next) => {
  try {
    const { title, videoUrl, linkedProductId } = req.body;

    const newVideo = new Video({
      title,
      videoUrl,
      linkedProductId: linkedProductId || null,
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Public / Admin
exports.deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    await video.deleteOne();
    res.status(200).json({ success: true, message: 'Video deleted' });
  } catch (error) {
    next(error);
  }
};
