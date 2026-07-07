// backened/controllers/prototypeController.js

// 1. Mock DB for Users and Village Coordinates (replaces hardcoded profile)
const usersDB = {}; // Stores phone -> user details

const VILLAGE_COORDINATES = {
  "Neemrana": { lat: 27.986, lon: 76.385 },
  "Alwar": { lat: 27.553, lon: 76.634 },
  "Jaipur": { lat: 26.912, lon: 75.787 },
  "Gurgaon": { lat: 28.459, lon: 77.026 }
};

const MANDI_LIST = [
  { name: "Behror Mandi", lat: 27.88, lon: 76.28 },
  { name: "Khairthal Mandi", lat: 27.82, lon: 76.64 },
  { name: "Rewari Mandi", lat: 28.18, lon: 76.62 },
  { name: "Alwar City Mandi", lat: 27.56, lon: 76.63 },
  { name: "Narnaul Mandi", lat: 28.04, lon: 76.11 }
];

// 2. Math Functions (Real optimization logic)
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const toRad = (angle) => (angle * Math.PI) / 180;
  
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getNearbyMandis(farmerLat, farmerLon, topN = 3) {
  const mandis = MANDI_LIST.map(mandi => ({
    ...mandi,
    distanceKm: parseFloat(haversineDistance(farmerLat, farmerLon, mandi.lat, mandi.lon).toFixed(2))
  }));
  return mandis.sort((a, b) => a.distanceKm - b.distanceKm).slice(0, topN);
}

// 3. Simulated API Calls (Live Price & Trend)
function fetchLivePrice(mandiName, commodity) {
  // Simulating an eNAM / data.gov.in API fetch
  const basePrices = { "Wheat": 2200, "Mustard": 4800, "Bajra": 1800 };
  const base = basePrices[commodity] || 2000;
  // Add some random variation per mandi
  const variation = Math.floor(Math.random() * 200) - 100;
  return base + variation; 
}

function getPriceTrend(mandiName, commodity) {
  const trends = ["Rising (+2%)", "Stable", "Falling (-1.5%)"];
  return trends[Math.floor(Math.random() * trends.length)];
}

// 4. Financial Logic
function estimateTransportCost(distanceKm, quantityQuintal) {
  const costPerKmPerQuintal = 2.5; // Example: ₹2.5 per km per quintal
  return distanceKm * quantityQuintal * costPerKmPerQuintal;
}

function netBenefit(localPrice, distantPrice, quantityQuintal, transportCost) {
  const grossGain = (distantPrice - localPrice) * quantityQuintal;
  return grossGain - transportCost;
}

// 5. Controllers
exports.signupFarmer = (req, res) => {
  const { name, phone, village } = req.body;
  if (!VILLAGE_COORDINATES[village]) {
    return res.status(400).json({ error: "Village not found in geocoding service." });
  }
  
  usersDB[phone] = {
    name,
    phone,
    village,
    coordinates: VILLAGE_COORDINATES[village]
  };
  
  res.json({ message: "Signup successful", user: usersDB[phone] });
};

exports.loginFarmer = (req, res) => {
  const { phone } = req.body;
  const user = usersDB[phone];
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  res.json({ message: "Login successful", user });
};

exports.askQuestion = (req, res) => {
  const { phone, question, commodity = "Wheat", quantity = 50 } = req.body;
  
  const user = usersDB[phone];
  if (!user) return res.status(401).json({ error: "Unauthorized. Please login." });

  // 1. Tool execution log (to show in UI)
  const executionLog = [];

  // Tool 1: Get Nearby Mandis
  executionLog.push(`[Tool: Geocoding] Resolved ${user.village} to ${user.coordinates.lat}, ${user.coordinates.lon}`);
  const nearbyMandis = getNearbyMandis(user.coordinates.lat, user.coordinates.lon);
  executionLog.push(`[Tool: Distance Math] Found ${nearbyMandis.length} nearby mandis sorted by Haversine distance.`);

  // Tool 2 & 3: Get Prices and Trends
  const analysis = nearbyMandis.map(mandi => {
    const price = fetchLivePrice(mandi.name, commodity);
    const trend = getPriceTrend(mandi.name, commodity);
    const transportCost = estimateTransportCost(mandi.distanceKm, quantity);
    
    return {
      mandi: mandi.name,
      distance: mandi.distanceKm,
      price: price,
      trend: trend,
      transportCost: transportCost,
      netRevenue: (price * quantity) - transportCost
    };
  });
  executionLog.push(`[Tool: Live API] Fetched prices from eNAM mock API for ${commodity}.`);

  // Tool 4: Decision Math
  // Sort by net revenue instead of just distance
  const bestMandi = [...analysis].sort((a, b) => b.netRevenue - a.netRevenue)[0];
  const closestMandi = analysis[0];
  
  const extraGain = bestMandi.netRevenue - closestMandi.netRevenue;
  
  // 5. The "LLM" reasoning (we generate the prompt/response manually here to simulate it)
  executionLog.push(`[LLM Reasoning] Comparing net benefit of ${closestMandi.mandi} (closest) vs ${bestMandi.mandi} (highest net return).`);

  let finalAnswer = `Hello ${user.name}, based on your location in ${user.village}:\n\n`;
  finalAnswer += `The closest market is ${closestMandi.mandi} (${closestMandi.distance}km) offering ₹${closestMandi.price}/qtl.\n`;
  
  if (bestMandi.mandi !== closestMandi.mandi && extraGain > 0) {
    finalAnswer += `However, I recommend traveling to ${bestMandi.mandi} (${bestMandi.distance}km). \n`;
    finalAnswer += `The price there is ₹${bestMandi.price}/qtl. Even after subtracting ₹${bestMandi.transportCost.toFixed(0)} for transport, you will make a net extra profit of ₹${extraGain.toFixed(0)} for your ${quantity} quintals. The price trend there is also ${bestMandi.trend}.\n`;
  } else {
    finalAnswer += `I recommend selling locally at ${closestMandi.mandi}. Further markets don't offer enough price difference to cover the transport costs.`;
  }

  res.json({
    answer: finalAnswer,
    data: analysis,
    logs: executionLog
  });
};
