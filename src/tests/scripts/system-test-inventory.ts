import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

async function runSystemTest() {
  console.log('🚀 Starting Inventory System Test (API Integration)...');
  
  try {
    // 1. Fetch all rewards to find one to test with
    console.log('🔍 Fetching current rewards...');
    const listRes = await axios.get(`${BASE_URL}/api/rewards?t=${Date.now()}`);
    const rewards = listRes.data;
    
    if (!rewards || rewards.length === 0) {
      throw new Error('❌ No rewards found in database. Create one first!');
    }
    
    const target = rewards[0];
    const initialStock = target.stock || 0;
    const initialHistoryLength = (target.stockHistory || []).length;
    console.log(`✅ Targeted reward: "${target.name}" (ID: ${target._id})`);
    console.log(`📊 Initial state: Stock=${initialStock}, History=${initialHistoryLength}`);

    // 2. Perform API update
    const newQuantity = initialStock + 5;
    console.log(`🔄 Sending API request to update stock to ${newQuantity}...`);
    
    const updateRes = await axios.post(`${BASE_URL}/api/rewards/${target._id}/stock`, {
      quantity: newQuantity,
      reason: 'System API Test'
    });
    
    if (updateRes.status === 200) {
      console.log('✅ API responded with 200 OK');
    } else {
      throw new Error(`❌ API failed with status ${updateRes.status}`);
    }

    // 3. Verify via another GET request
    console.log('🔍 Verifying update via GET /api/rewards...');
    const verifyRes = await axios.get(`${BASE_URL}/api/rewards?t=${Date.now()}`);
    const updatedTarget = verifyRes.data.find((r: any) => r._id === target._id);
    
    if (!updatedTarget) {
      throw new Error('❌ Could not find target reward in the updated list');
    }

    console.log(`📊 Final state: Stock=${updatedTarget.stock}, History=${updatedTarget.stockHistory.length}`);

    if (updatedTarget.stock === newQuantity && updatedTarget.stockHistory.length === initialHistoryLength + 1) {
      const latestHistory = updatedTarget.stockHistory[updatedTarget.stockHistory.length - 1];
      console.log('✅ VERIFICATION SUCCESSFUL:');
      console.log(`   - Stock: ${initialStock} -> ${updatedTarget.stock}`);
      console.log(`   - History: ${initialHistoryLength} -> ${updatedTarget.stockHistory.length}`);
      console.log(`   - Latest Entry: ${latestHistory.reason} (Change: ${latestHistory.change})`);
    } else {
      throw new Error(`❌ Verification failed! Data mismatch.
        Expected Stock: ${newQuantity}, Got: ${updatedTarget.stock}
        Expected History Count: ${initialHistoryLength + 1}, Got: ${updatedTarget.stockHistory.length}`);
    }

    console.log('\n✨ SYSTEM TEST PASSED! The API and Database are fully synchronized. ✨');
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ SYSTEM TEST FAILED:', error.message || error);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
    process.exit(1);
  }
}

runSystemTest();
