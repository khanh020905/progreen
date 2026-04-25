import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  voucherCode: {
    type: String,
    required: true
  },
  rewardName: {
    type: String,
    required: true
  },
  rewardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward'
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  provinceCity: {
    type: String,
    required: false
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipping', 'Completed', 'Rejected'],
    default: 'Pending'
  },
  claimReference: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Claim || mongoose.model('Claim', claimSchema);
