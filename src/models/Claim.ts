import mongoose, { Document, Model, Types } from 'mongoose';

export interface IClaim extends Document {
  voucherCode: string;
  rewardName: string;
  rewardId: Types.ObjectId;
  customerName: string;
  phone: string;
  address: string;
  province?: string;
  district?: string;
  ward?: string;
  streetAddress?: string;
  provinceCity?: string;
  shirtChoice?: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Shipping' | 'Completed' | 'Rejected';
  claimReference: string;
  createdAt: Date;
}

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
  address: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: false
  },
  district: {
    type: String,
    required: false
  },
  ward: {
    type: String,
    required: false
  },
  streetAddress: {
    type: String,
    required: false
  },
  provinceCity: {
    type: String,
    required: false
  },
  shirtChoice: {
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

const Claim: Model<IClaim> = mongoose.models.Claim || mongoose.model<IClaim>('Claim', claimSchema);
export default Claim;
