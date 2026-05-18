import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env');
  process.exit(1);
}

// Inline Reward schema since we want to execute this standalone and reliably
const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
});

const Reward = mongoose.models.Reward || mongoose.model('Reward', rewardSchema);

async function runMigration() {
  console.log('🚀 Connecting to MongoDB to migrate rewards...');
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Connected to MongoDB.');

    const rewards = await Reward.find({});
    console.log(`📋 Found ${rewards.length} rewards in database:`);
    rewards.forEach(r => console.log(`  - ID: ${r._id} | Name: "${r.name}" | Stock: ${r.stock}`));

    console.log('\n🔄 Applying updates to rewards collection...');
    
    let updatedCount = 0;

    for (const reward of rewards) {
      const oldName = reward.name;
      let newName = oldName;

      // Match rules
      const lowerName = oldName.toLowerCase().trim();
      
      if (lowerName.includes('velosar')) {
        newName = 'Áo thể thao';
      } else if (lowerName.includes('procumin')) {
        newName = 'Mũ lưỡi trai';
      } else if (lowerName.includes('tất') || lowerName.includes('sock')) {
        newName = 'Bít tất thể thao';
      } else if (lowerName === 'kđr' || lowerName === 'kdr' || lowerName.includes('close up') || lowerName.includes('kem đánh răng') || lowerName.includes('toothpaste')) {
        newName = 'Kem đánh răng';
      } else if (lowerName.includes('sạc') || lowerName.includes('charging') || lowerName.includes('sac')) {
        newName = 'Dây sạc 3 đầu';
      }

      if (newName !== oldName) {
        reward.name = newName;
        await reward.save();
        console.log(`✨ Updated: "${oldName}" ➡️ "${newName}"`);
        updatedCount++;
      }
    }

    console.log(`\n🎉 Completed migration. Updated ${updatedCount} rewards in database.`);
    
    // Log final list
    const updatedRewards = await Reward.find({});
    console.log('\n📋 Final rewards list in database:');
    updatedRewards.forEach(r => console.log(`  - ID: ${r._id} | Name: "${r.name}" | Stock: ${r.stock}`));

    await mongoose.connection.close();
    console.log('🔌 Closed database connection.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
