const express = require('express');
const { getSettings, updateSettings, changePassword } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, updateSettings);
router.post('/change-password', protect, changePassword);

module.exports = router;