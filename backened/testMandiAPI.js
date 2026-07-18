require('dotenv').config();
const { fetchRealMandiPrice } = require('./services/mandiPriceService');

async function runTest() {
  console.log('Testing mandiPriceService with API key:', process.env.DATA_GOV_IN_API_KEY);
  console.log('Fetching live price for Wheat at Jaipur Mandi...');
  
  try {
    const result = await fetchRealMandiPrice('Jaipur', 'Wheat', 'Rajasthan');
    
    if (result) {
      console.log('✅ Success! Found live data:');
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log('⚠️ No live data returned for this market/commodity combo today.');
    }
  } catch (err) {
    console.error('❌ Error fetching data:');
    if (err.response) {
      console.error(`Status: ${err.response.status}`);
      console.error(err.response.data);
    } else {
      console.error(err.message);
    }
  }
}

runTest();
