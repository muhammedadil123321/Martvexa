const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists in DB
    let admin = await Admin.findOne({ email });

    // Fallback/Seed for default admin if DB is empty
    if (!admin && email === 'admin@gmail.com' && password === '12345678') {
      admin = await Admin.create({ email, password });
    }

    if (admin && admin.password === password) {
      const token = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '30d' }
      );

      res.json({
        success: true,
        user: { id: admin._id, email: admin.email },
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { loginAdmin };
