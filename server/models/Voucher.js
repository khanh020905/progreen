const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  rewards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward'
  }],
  isRedeemed: {
    type: Boolean,
    default: false
  },
  redeemedAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Voucher', voucherSchema);
