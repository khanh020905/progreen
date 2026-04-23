const Claim = require('../models/Claim');
const Voucher = require('../models/Voucher');
const Reward = require('../models/Reward');
const { v4: uuidv4 } = require('uuid');

exports.submitClaim = async (req, res) => {
  try {
    const { 
      voucherCode, 
      rewardId, 
      customerName, 
      phone, 
      email, 
      address, 
      provinceCity, 
      notes 
    } = req.body;

    // DEMO CLAIM FALLBACK
    if (voucherCode?.toUpperCase() === 'DEMO2026') {
       return res.status(201).json({
         success: true,
         claimReference: `PGL-DEMO-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
         message: 'Claim submitted successfully (DEMO MODE)'
       });
    }

    // Validate voucher again to prevent race conditions
    const voucher = await Voucher.findOne({ code: voucherCode.toUpperCase() });
    
    if (!voucher || !voucher.isActive || voucher.isRedeemed) {
      return res.status(400).json({ message: 'Voucher is invalid or already redeemed' });
    }

    const reward = await Reward.findById(rewardId);
    if (!reward) {
      return res.status(400).json({ message: 'Selected reward not found' });
    }

    const claimReference = `PGL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const claim = new Claim({
      voucherCode: voucher.code,
      rewardName: reward.name,
      rewardId: reward._id,
      customerName,
      phone,
      email,
      address,
      provinceCity,
      notes,
      claimReference
    });

    await claim.save();

    // Mark voucher as redeemed
    voucher.isRedeemed = true;
    voucher.redeemedAt = new Date();
    await voucher.save();

    res.status(201).json({
      success: true,
      claimReference,
      message: 'Claim submitted successfully'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find().sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateClaimStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const claim = await Claim.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    res.json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
