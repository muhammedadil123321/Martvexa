const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');

// Wrap multer middleware in a Promise so errors surface as JSON (not HTML)
function runUpload(req, res) {
  return new Promise((resolve, reject) => {
    upload.single('file')(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

router.post('/upload', async (req, res) => {
  try {
    await runUpload(req, res);

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file received. Make sure the field name is "file".' });
    }

    const fileUrl = req.file.path;
    const isVideo = req.file.mimetype.startsWith('video');

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully!',
      url: fileUrl,
      fileType: isVideo ? 'video' : 'image',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: error.message || 'Upload failed' });
  }
});

module.exports = router;