require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

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
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    });
    isConnected = true;
    console.log('MongoDB Connected');
    
    // Auto-seed Admin
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('ProGreenLife@2026', 10);
      await AdminUser.create({ username: 'admin', password: hashedPassword });
    }
  } catch (err) {
    isConnected = false;
    throw new Error(`MongoDB Connection Failed: ${err.message}`);
  }
}

// Ensure DB connection for API routes
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await connectToDatabase();
      next();
    } catch (err) {
      return res.status(503).json({ 
        error: 'Backend Services Unavailable', 
        message: err.message,
        tip: 'Ensure MONGODB_URI is correctly configured in your Vercel Environment Variables.'
      });
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
