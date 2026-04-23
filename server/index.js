require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const voucherRoutes = require('./routes/voucherRoutes');
const claimRoutes = require('./routes/claimRoutes');
const adminRoutes = require('./routes/adminRoutes');
const rewardRoutes = require('./routes/rewardRoutes');

app.use('/api/vouchers', voucherRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rewards', rewardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pro Green Life API is running' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Database connection & Auto-seed
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/progreenlife';
const AdminUser = require('./models/AdminUser');
const Reward = require('./models/Reward');
const Voucher = require('./models/Voucher');
const bcrypt = require('bcryptjs');

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Auto-seed Admin
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('ProGreenLife@2026', 10);
      await AdminUser.create({ username: 'admin', password: hashedPassword });
    }

    // Auto-seed Rewards
    const rewardCount = await Reward.countDocuments();
    if (rewardCount === 0) {
      const sampleRewards = await Reward.insertMany([
        { name: 'Eco Bottle', description: 'Stainless steel bottle 500ml', image: 'https://images.unsplash.com/photo-1602143399827-bd95968330b7?q=80&w=800' },
        { name: 'Green Tote Bag', description: 'Eco-friendly reusable tote bag', image: 'https://images.unsplash.com/photo-1544816153-16ad4614ff98?q=80&w=800' },
        { name: 'Plant Gift Set', description: 'Mini plant with ceramic pot', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800' }
      ]);

      // Auto-seed sample Vouchers
      const voucherCount = await Voucher.countDocuments();
      if (voucherCount === 0) {
        await Voucher.create({ code: 'WELCOME2026', rewards: [sampleRewards[0]._id], isActive: true });
        await Voucher.create({ code: 'GREENFUTURE', rewards: [sampleRewards[0]._id, sampleRewards[1]._id], isActive: true });
        await Voucher.create({ code: 'PREMIUMGIFT', rewards: [sampleRewards[2]._id], isActive: true });
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = app; // For Vercel serverless
