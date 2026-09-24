const Settings = require('../models/Settings');
const Admin = require('../models/Admin');

// Settings Fetch & Save controllers
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({}); // Creates with default values
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings", error: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { whatsappNumber, messageTemplate, adminEmail } = req.body;
    let settings = await Settings.findOne();
    
    if (settings) {
      settings.whatsappNumber = whatsappNumber || settings.whatsappNumber;
      settings.messageTemplate = messageTemplate || settings.messageTemplate;
      settings.adminEmail = adminEmail || settings.adminEmail;
      await settings.save();
    } else {
      settings = await Settings.create({ whatsappNumber, messageTemplate, adminEmail });
    }
    
    res.json({ message: "Settings saved successfully", settings });
  } catch (error) {
    res.status(500).json({ message: "Error updating settings", error: error.message });
  }
};

// Password Change Controller
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Validate request
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please provide both passwords." });
    }

    // Since we use the protect middleware, we have req.admin
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // In a real app we'd use bcrypt.compare. The current logic uses plain text password matching based on authController.js
    if (admin.password !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password", error: error.message });
  }
};

module.exports = { getSettings, updateSettings, changePassword };