require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const Reward = require('./models/Reward');
const Voucher = require('./models/Voucher');

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data (optional, but good for testing)
    await Reward.deleteMany({});
    await Voucher.deleteMany({});

    // Create Rewards
    const rewards = await Reward.insertMany([
      // 300k Level
      { name: '3 đôi tất', description: 'Tất cotton cao cấp, thấm hút mồ hôi' },
      { name: 'Bình đựng nước nhựa 550 ml Delites TH08771', description: 'Nhựa an toàn BPA Free' },
      // 500k Level
      { name: 'Kem đánh răng Close up 100gr', description: 'Hơi thở thơm mát, răng trắng sáng' },
      { name: 'Dây Sạc Nhanh 3 đầu (Lightning-Micro-TypeC)', description: 'Sạc nhanh đa năng 3 trong 1' },
      // 1tr Level
      { name: 'Áo Velosar', description: 'Áo phông thương hiệu Velosar cao cấp' },
      { name: 'Mũ lưỡi trai', description: 'Mũ thời trang Pro Green Life' }
    ]);

    console.log('Rewards seeded');

    // Create Vouchers
    await Voucher.create([
      { 
        code: 'PGL300', 
        rewards: [rewards[0]._id, rewards[1]._id],
        isActive: true 
      },
      { 
        code: 'PGL500', 
        rewards: [rewards[2]._id, rewards[3]._id],
        isActive: true 
      },
      { 
        code: 'PGL1TR', 
        rewards: [rewards[4]._id, rewards[5]._id],
        isActive: true 
      }
    ]);

    console.log('Vouchers seeded');
    console.log('Test codes: PGL300, PGL500, PGL1TR');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
