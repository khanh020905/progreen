import mongoose from 'mongoose';

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

export default mongoose.models.Voucher || mongoose.model('Voucher', voucherSchema);
