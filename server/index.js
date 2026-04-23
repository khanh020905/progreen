require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection helper
let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  await mongoose.connect(MONGODB_URI);
  cachedDb = mongoose.connection;
  
  // Auto-seed check
  const AdminUser = require('./models/AdminUser');
  const Reward = require('./models/Reward');
  const Voucher = require('./models/Voucher');
  
  const adminCount = await AdminUser.countDocuments();
  if (adminCount === 0) {
    const hashedPassword = await bcrypt.hash('ProGreenLife@2026', 10);
    await AdminUser.create({ username: 'admin', password: hashedPassword });
  }
  
  const rewardCount = await Reward.countDocuments();
  if (rewardCount === 0) {
    const sampleRewards = await Reward.insertMany([
      { name: 'Eco Bottle', description: 'Stainless steel bottle 500ml', image: 'https://images.unsplash.com/photo-1602143399827-bd95968330b7?q=80&w=800' },
      { name: 'Green Tote Bag', description: 'Eco-friendly reusable tote bag', image: 'https://images.unsplash.com/photo-1544816153-16ad4614ff98?q=80&w=800' },
      { name: 'Plant Gift Set', description: 'Mini plant with ceramic pot', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800' }
    ]);
    await Voucher.create({ code: 'WELCOME2026', rewards: [sampleRewards[0]._id], isActive: true });
  }

  return cachedDb;
}

// Ensure DB connection for all API routes
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await connectToDatabase();
      next();
    } catch (err) {
      console.error('Database connection error:', err.message);
      res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
  } else {
    next();
  }
});

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
app.get('/api/health', async (req, res) => {
  res.json({ 
    status: 'ok', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    env: process.env.NODE_ENV
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
