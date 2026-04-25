import mongoose, { Document, Model, Types } from 'mongoose';

export interface IVoucher extends Document {
  code: string;
  rewards: Types.ObjectId[];
  isRedeemed: boolean;
  redeemedAt?: Date;
  isActive: boolean;
  createdAt: Date;
}

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

const Voucher: Model<IVoucher> = mongoose.models.Voucher || mongoose.model<IVoucher>('Voucher', voucherSchema);
export default Voucher;
