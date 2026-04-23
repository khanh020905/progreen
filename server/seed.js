require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AdminUser = require('./models/AdminUser');
const Reward = require('./models/Reward');
const Voucher = require('./models/Voucher');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/progreenlife';

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await AdminUser.deleteMany({});
    await Reward.deleteMany({});
    await Voucher.deleteMany({});

    // Create default admin
    const hashedPassword = await bcrypt.hash('ProGreenLife@2026', 10);
    await AdminUser.create({
      username: 'admin',
      password: hashedPassword
    });
    console.log('Admin user created');

    // Create sample rewards
    const rewards = await Reward.insertMany([
      {
        name: 'Eco-Friendly Starter Kit',
        description: 'A curated selection of bamboo utensils, reusable bags, and a stainless steel water bottle.',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Organic Garden Bundle',
        description: 'Includes heirloom seeds, biodegradable pots, and organic fertilizer for your home garden.',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Premium Solar Charger',
        description: 'High-efficiency portable solar panel for charging your devices on the go.',
        image: 'https://images.unsplash.com/photo-1509391366360-fe5bb5848d22?auto=format&fit=crop&q=80&w=800'
      }
    ]);
    console.log('Rewards created');

    // Create sample vouchers
    await Voucher.create({
      code: 'WELCOME2026',
      rewards: [rewards[0]._id],
      isActive: true
    });
    await Voucher.create({
      code: 'GREENFUTURE',
      rewards: [rewards[0]._id, rewards[1]._id],
      isActive: true
    });
    await Voucher.create({
      code: 'PREMIUMGIFT',
      rewards: [rewards[2]._id],
      isActive: true
    });
    console.log('Vouchers created');

    console.log('Seeding completed successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
