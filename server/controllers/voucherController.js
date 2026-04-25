const mongoose = require('mongoose');
const Voucher = require('../models/Voucher');
const Reward = require('../models/Reward');

exports.validateVoucher = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'Voucher code is required' });
    }

    // DEMO VOUCHER FALLBACK
    if (code?.toUpperCase() === 'DEMO2026') {
      return res.json({
        valid: true,
        voucher: {
          code: 'DEMO2026',
          rewards: [
            { _id: 'r1', name: 'Premium Eco Bottle', description: 'Double-walled stainless steel', image: 'https://images.unsplash.com/photo-1602143399827-bd95968330b7?q=80&w=800' },
            { _id: 'r2', name: 'Green Tote Bag', description: 'Eco-friendly reusable bag', image: 'https://images.unsplash.com/photo-1544816153-16ad4614ff98?q=80&w=800' }
          ]
        }
      });
    }

    // Check DB status if not demo
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database connection is currently unavailable. Please use the DEMO2026 code to test.' });
    }

    const voucher = await Voucher.findOne({ code: code.toUpperCase() })
      .populate('rewards');

    if (!voucher) {
      return res.status(404).json({ message: 'Mã số thẻ không hợp lệ' });
    }

    if (!voucher.isActive) {
      return res.status(400).json({ message: 'Mã số thẻ không hợp lệ' });
    }

    if (voucher.isRedeemed) {
      return res.status(400).json({ message: 'Rất tiếc, mã thẻ này đã được sử dụng' });
    }

    res.json({
      valid: true,
      voucher: {
        code: voucher.code,
        rewards: voucher.rewards
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find().populate('rewards').sort({ createdAt: -1 });
    res.json(vouchers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createVoucher = async (req, res) => {
  try {
    const { code, rewards, isActive } = req.body;
    
    const existing = await Voucher.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({ message: 'Voucher code already exists' });
    }

    const voucher = new Voucher({
      code: code.toUpperCase(),
      rewards,
      isActive: isActive !== undefined ? isActive : true
    });

    await voucher.save();
    res.status(201).json(voucher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
