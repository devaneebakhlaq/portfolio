const Admin   = require('../models/Admin');
const Message = require('../models/Message');
const Project = require('../models/Project');
const Profile = require('../models/Profile');
const jwt     = require('jsonwebtoken');

const signToken = (id) =>
  jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });

// POST /api/admin/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = signToken(admin._id);
    res.json({ success: true, token, admin: { id: admin._id, email: admin.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/admin/stats — admin dashboard overview
exports.getStats = async (req, res) => {
  try {
    const [totalProjects, totalMessages, unreadMessages, profile] = await Promise.all([
      Project.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ isRead: false }),
      Profile.findOne().select('name title'),
    ]);

    const recentMessages = await Message.find()
      .sort('-createdAt')
      .limit(5)
      .select('name email message createdAt isRead');

    res.json({
      success: true,
      data: { totalProjects, totalMessages, unreadMessages, profile, recentMessages },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
