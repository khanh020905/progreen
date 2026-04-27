import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import mongoose from 'mongoose';
import Claim from '../../models/Claim.js';
import Reward from '../../models/Reward.js';
import connectToDatabase from '../../lib/mongodb.js';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:3000/api';

async function testClaimDeduction() {
  console.log('🧪 Starting TDD: Claim Confirmation Stock Deduction Test...');
  
  try {
    await connectToDatabase();
    
    // 1. Setup: Create a test reward
    const rewardName = 'TDD Velosar Shirt ' + Date.now();
    const reward = new Reward({
      name: rewardName,
      description: 'TDD Test',
      stock: 10,
      stockHistory: [{
        date: new Date(),
        change: 10,
        reason: 'Initial setup',
        type: 'manual'
      }]
    });
    await reward.save();
    console.log(`✅ Created test reward: "${rewardName}" with stock 10`);

    // 2. Setup: Create a pending claim for this reward
    // Note: We use a slightly different name to test the "Fuzzy Matching"
    const claimRewardName = rewardName.replace('Velosar', 'phông Velosar');
    console.log(`🔍 Will test matching "${claimRewardName}" against "${rewardName}"`);

    const claim = new Claim({
      claimReference: 'TDD-' + Math.random().toString(36).substring(7).toUpperCase(),
      voucherCode: 'PGL1TR', // Use a real demo code
      rewardId: undefined, // Must be undefined for demo codes
      rewardName: claimRewardName,
      customerName: 'TDD Tester',
      phone: '0900000000',
      address: 'TDD Address',
      status: 'Pending'
    });
    await claim.save();
    console.log(`✅ Created pending claim: ${claim.claimReference}`);

    // 3. Action: Confirm the claim via API
    console.log(`🔄 Confirming claim via API: PUT /api/claims/${claim._id}...`);
    const response = await axios.put(`${API_BASE}/claims/${claim._id}`, {
      status: 'Confirmed'
    });

    if (response.status === 200) {
      console.log('✅ API responded with 200 OK');
    } else {
      throw new Error(`API failed with status ${response.status}`);
    }

    // 4. Verification: Check stock deduction
    console.log('🧐 Verifying stock deduction in database...');
    // Wait a short moment for async operations
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedReward = await Reward.findById(reward._id);
    console.log(`📊 Current Stock: ${updatedReward.stock}`);
    
    if (updatedReward.stock === 9) {
      console.log('✅ SUCCESS: Stock decreased from 10 to 9!');
    } else {
      console.error(`❌ FAILURE: Stock is ${updatedReward.stock}, expected 9.`);
    }

    // 5. Verification: Check history entry
    const history = updatedReward.stockHistory;
    const lastEntry = history[history.length - 1];
    console.log(`📝 Last History Entry: [${lastEntry.change}] ${lastEntry.reason} (${lastEntry.type})`);

    if (lastEntry.change === -1 && lastEntry.type === 'automatic') {
      console.log('✅ SUCCESS: Automatic history entry created!');
    } else {
      console.error('❌ FAILURE: History entry is incorrect or missing.');
    }

    // Cleanup
    await Reward.findByIdAndDelete(reward._id);
    await Claim.findByIdAndDelete(claim._id);
    console.log('\n✨ TEST COMPLETED SUCCESSFULLY! ✨');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
    if (error.response) {
      console.error('API Error Response:', error.response.data);
    }
    process.exit(1);
  }
}

testClaimDeduction();
