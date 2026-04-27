import mongoose from 'mongoose';
import Reward from '../models/Reward.js'; // Note the .js for ESM if needed, but ts-node handles it
import connectToDatabase from '../lib/mongodb.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function runTest() {
  console.log('🚀 Starting Inventory Integration Test...');
  
  try {
    await connectToDatabase();
    console.log('✅ Connected to Database');

    // 1. Create a test reward
    const testName = `Test Item ${Date.now()}`;
    const reward = new Reward({
      name: testName,
      description: 'System Test Reward',
      stock: 10,
      stockHistory: []
    });
    const saved = await reward.save();
    const id = saved._id.toString();
    console.log(`✅ Created test reward with ID: ${id}`);

    // 2. Perform a stock update (Simulating the API logic)
    console.log('🔄 Updating stock to 25...');
    const quantity = 25;
    const currentStock = saved.stock || 0;
    const change = quantity - currentStock;
    const reason = 'System Test Adjustment';

    const historyEntry = {
      date: new Date(),
      change,
      reason,
      type: 'manual'
    };

    const updated = await Reward.findOneAndUpdate(
      { _id: id },
      { 
        $set: { stock: quantity },
        $push: { stockHistory: historyEntry }
      },
      { new: true }
    );

    if (updated && updated.stock === 25 && updated.stockHistory.length === 1) {
      console.log('✅ Stock updated successfully in DB');
      console.log(`✅ History entry created: Change=${updated.stockHistory[0].change}, Reason=${updated.stockHistory[0].reason}`);
    } else {
      throw new Error('❌ Stock update verification failed');
    }

    // 3. Cleanup
    await Reward.findByIdAndDelete(id);
    console.log('✅ Cleanup successful');
    
    console.log('\n✨ ALL TESTS PASSED SUCCESSFULLY! ✨');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error);
    process.exit(1);
  }
}

runTest();
