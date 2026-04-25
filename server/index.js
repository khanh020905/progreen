require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const dns = require('dns');

// Fix for MongoDB Atlas connection issues on some networks
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}
// Force Google DNS for SRV record resolution (fixes networks that block SRV lookups)
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Pre-import models to avoid runtime require issues
const AdminUser = require('./models/AdminUser');
const Reward = require('./models/Reward');
const Voucher = require('./models/Voucher');
const Claim = require('./models/Claim');

// Pre-import routes
const voucherRoutes = require('./routes/voucherRoutes');
const claimRoutes = require('./routes/claimRoutes');
const adminRoutes = require('./routes/adminRoutes');
const rewardRoutes = require('./routes/rewardRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection helper with better error handling
let isConnected = false;
async function connectToDatabase() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is missing. Please set it in Vercel Project Settings > Environment Variables.');
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('MongoDB Connected');
    
    // Auto-seed Admin
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('ProGreenLife@2026', 10);
      await AdminUser.create({ username: 'admin', password: hashedPassword });
      console.log('Admin user seeded');
    }

    // Auto-seed Vouchers & Rewards if empty
    const voucherCount = await Voucher.countDocuments();
    if (voucherCount === 0) {
      console.log('Database empty, seeding rewards and vouchers...');
      const rewards = await Reward.insertMany([
        { name: '3 đôi tất', description: 'Tất cotton cao cấp, thấm hút mồ hôi' },
        { name: 'Bình đựng nước nhựa 550 ml Delites TH08771', description: 'Nhựa an toàn BPA Free' },
        { name: 'Kem đánh răng Close up 100gr', description: 'Hơi thở thơm mát, răng trắng sáng' },
        { name: 'Dây Sạc Nhanh 3 đầu (Lightning-Micro-TypeC)', description: 'Sạc nhanh đa năng 3 trong 1' },
        { name: 'Áo Velosar', description: 'Áo phông thương hiệu Velosar cao cấp' },
        { name: 'Mũ lưỡi trai', description: 'Mũ thời trang Pro Green Life' }
      ]);

      await Voucher.create([
        { code: 'PGL300', rewards: [rewards[0]._id, rewards[1]._id], isActive: true },
        { code: 'PGL500', rewards: [rewards[2]._id, rewards[3]._id], isActive: true },
        { code: 'PGL1TR', rewards: [rewards[4]._id, rewards[5]._id], isActive: true }
      ]);
      console.log('Rewards and Vouchers seeded successfully');
    }
  } catch (err) {
    isConnected = false;
    throw new Error(`MongoDB Connection Failed: ${err.message}`);
  }
}

// Ensure DB connection for API routes (Non-blocking for demo support)
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await connectToDatabase();
      next();
    } catch (err) {
      console.warn('Database connection failed, proceeding to controllers (Demo fallback mode):', err.message);
      // We don't block the request here, controllers will handle DB-dependent logic or use demo fallbacks
      next();
    }
  } else {
    next();
  }
});

// API Routes
app.use('/api/vouchers', voucherRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rewards', rewardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    node_env: process.env.NODE_ENV
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), 'client', 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

// Global error handler to prevent crashes
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
