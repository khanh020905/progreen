const AdminUser = require('../models/AdminUser');
const Claim = require('../models/Claim');
const Voucher = require('../models/Voucher');
const Reward = require('../models/Reward');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // HARDCODED DEMO FALLBACK (No DB required)
    if (username === 'admin' && password === 'ProGreenLife@2026') {
      const token = jwt.sign(
        { id: 'demo-admin-id', username: 'admin' },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '24h' }
      );
      return res.json({
        token,
        admin: { id: 'demo-admin-id', username: 'admin', isDemo: true }
      });
    }

    // Standard DB Check
    const admin = await AdminUser.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalVouchers = await Voucher.countDocuments();
    const redeemedVouchers = await Voucher.countDocuments({ isRedeemed: true });
    const pendingClaims = await Claim.countDocuments({ status: 'Pending' });
    const completedClaims = await Claim.countDocuments({ status: 'Completed' });

    res.json({
      totalVouchers,
      redeemedVouchers,
      pendingClaims,
      completedClaims
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
