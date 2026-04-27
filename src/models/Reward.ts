import mongoose, { Document, Model } from 'mongoose';

export interface IReward extends Document {
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  stock: number;
  stockHistory: Array<{
    date: Date;
    change: number;
    reason: string;
    type: 'manual' | 'automatic';
  }>;
  createdAt: Date;
}

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // URL to image
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 0
  },
  stockHistory: [{
    date: { type: Date, default: Date.now },
    change: Number,
    reason: String,
    type: { type: String, enum: ['manual', 'automatic'] }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Handle Next.js hot-reloading: if the model exists but doesn't have the new fields, we need to re-register it.
if (mongoose.models.Reward && !mongoose.models.Reward.schema.paths.stock) {
  delete mongoose.models.Reward;
}

const Reward: Model<IReward> = mongoose.models.Reward || mongoose.model<IReward>('Reward', rewardSchema);
export default Reward;
