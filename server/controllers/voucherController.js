const Voucher = require('../models/Voucher');
const Reward = require('../models/Reward');

exports.validateVoucher = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'Voucher code is required' });
    }

    const voucher = await Voucher.findOne({ code: code.toUpperCase() })
      .populate('rewards');

    if (!voucher) {
      return res.status(404).json({ message: 'Voucher code not found' });
    }

    if (!voucher.isActive) {
      return res.status(400).json({ message: 'This voucher is currently inactive' });
    }

    if (voucher.isRedeemed) {
      return res.status(400).json({ message: 'This voucher has already been redeemed' });
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
