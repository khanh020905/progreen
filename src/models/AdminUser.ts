import mongoose, { Document, Model } from 'mongoose';

export interface IAdminUser extends Document {
  username: string;
  password: string;
  role: string;
  createdAt: Date;
}

const adminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AdminUser: Model<IAdminUser> = mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', adminUserSchema);
export default AdminUser;
