const express = require('express');
const {
  getVideos,
  createVideo,
  deleteVideo,
} = require('../controllers/videoController');

const router = express.Router();

router.route('/')
  .get(getVideos)
  .post(createVideo);

router.route('/:id')
  .delete(deleteVideo);

module.exports = router;
