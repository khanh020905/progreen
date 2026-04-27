const mongoose = require('mongoose');
const Reward = require('../models/Reward').default;
const connectToDatabase = require('../lib/mongodb').default;

describe('Inventory Integration Tests', () => {
  let testRewardId;

  beforeAll(async () => {
    await connectToDatabase();
    // Use a test reward to avoid polluting real data
    const reward = new Reward({
      name: 'Test Reward ' + Date.now(),
      description: 'Testing inventory system',
      stock: 0,
      stockHistory: []
    });
    const saved = await reward.save();
    testRewardId = saved._id.toString();
  });

  afterAll(async () => {
    if (testRewardId) {
      await Reward.findByIdAndDelete(testRewardId);
    }
    await mongoose.connection.close();
  });

  it('should update stock and create history entry using findOneAndUpdate', async () => {
    const quantity = 50;
    const reason = 'Integration Test Adjustment';

    const currentReward = await Reward.findById(testRewardId);
    const currentStock = currentReward.stock || 0;
    const change = quantity - currentStock;

    const historyEntry = {
      date: new Date(),
      change,
      reason,
      type: 'manual'
    };

    const updated = await Reward.findOneAndUpdate(
      { _id: testRewardId },
      { 
        $set: { stock: quantity },
        $push: { stockHistory: historyEntry }
      },
      { new: true }
    );

    expect(updated).toBeDefined();
    expect(updated.stock).toBe(50);
    expect(updated.stockHistory.length).toBe(1);
    expect(updated.stockHistory[0].change).toBe(50);
    expect(updated.stockHistory[0].reason).toBe(reason);
  });
});

