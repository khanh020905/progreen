import mongoose, { Document, Model } from 'mongoose';

export interface IReward extends Document {
  name: string;
  description: string;
  image: string;
  isActive: boolean;
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reward: Model<IReward> = mongoose.models.Reward || mongoose.model<IReward>('Reward', rewardSchema);
export default Reward;
