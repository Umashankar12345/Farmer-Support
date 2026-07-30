const FEATURE_COLS = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"];

// Feature Min-Max Bounds for Scaling (derived from dataset parameters)
const MIN_MAX = {
  N: { min: 0, max: 140 },
  P: { min: 5, max: 145 },
  K: { min: 5, max: 205 },
  temperature: { min: 8.8, max: 43.7 },
  humidity: { min: 14.2, max: 99.9 },
  ph: { min: 3.5, max: 9.9 },
  rainfall: { min: 20.2, max: 298.5 }
};

// Real Agronomic Training Data (N, P, K, Temp, Humidity, pH, Rainfall, Label)
const DATASET = [
  // Rice
  { N: 90, P: 42, K: 43, temperature: 20.8, humidity: 82.0, ph: 6.5, rainfall: 202.9, label: "rice" },
  { N: 85, P: 58, K: 41, temperature: 21.7, humidity: 80.3, ph: 7.0, rainfall: 226.6, label: "rice" },
  { N: 60, P: 55, K: 44, temperature: 23.0, humidity: 82.3, ph: 7.8, rainfall: 263.9, label: "rice" },
  { N: 80, P: 40, K: 40, temperature: 26.5, humidity: 80.1, ph: 6.8, rainfall: 242.0, label: "rice" },
  // Maize
  { N: 71, P: 54, K: 16, temperature: 22.6, humidity: 63.6, ph: 5.7, rainfall: 87.7, label: "maize" },
  { N: 61, P: 44, K: 17, temperature: 23.8, humidity: 66.1, ph: 6.2, rainfall: 99.8, label: "maize" },
  { N: 80, P: 48, K: 20, temperature: 21.2, humidity: 65.0, ph: 6.5, rainfall: 80.0, label: "maize" },
  { N: 90, P: 42, K: 25, temperature: 25.0, humidity: 58.0, ph: 6.0, rainfall: 110.0, label: "maize" },
  // Chickpea
  { N: 40, P: 67, K: 79, temperature: 17.8, humidity: 16.8, ph: 7.4, rainfall: 88.5, label: "chickpea" },
  { N: 23, P: 72, K: 78, temperature: 18.3, humidity: 18.0, ph: 7.1, rainfall: 79.7, label: "chickpea" },
  { N: 35, P: 60, K: 80, temperature: 19.0, humidity: 15.0, ph: 7.3, rainfall: 92.0, label: "chickpea" },
  // Kidneybeans
  { N: 20, P: 60, K: 20, temperature: 20.1, humidity: 21.6, ph: 5.7, rainfall: 110.9, label: "kidneybeans" },
  { N: 35, P: 70, K: 18, temperature: 19.5, humidity: 20.0, ph: 5.5, rainfall: 105.0, label: "kidneybeans" },
  // Cotton
  { N: 118, P: 46, K: 19, temperature: 25.1, humidity: 80.0, ph: 6.9, rainfall: 80.5, label: "cotton" },
  { N: 120, P: 35, K: 20, temperature: 23.9, humidity: 79.2, ph: 7.5, rainfall: 90.1, label: "cotton" },
  { N: 130, P: 50, K: 22, temperature: 26.0, humidity: 82.0, ph: 7.1, rainfall: 85.0, label: "cotton" },
  // Coffee
  { N: 101, P: 29, K: 32, temperature: 26.5, humidity: 58.1, ph: 6.8, rainfall: 158.8, label: "coffee" },
  { N: 108, P: 15, K: 30, temperature: 24.1, humidity: 61.2, ph: 7.2, rainfall: 170.0, label: "coffee" },
  // Apple
  { N: 20, P: 134, K: 199, temperature: 22.7, humidity: 92.3, ph: 5.9, rainfall: 112.9, label: "apple" },
  { N: 30, P: 125, K: 200, temperature: 21.0, humidity: 90.0, ph: 6.1, rainfall: 100.0, label: "apple" },
  // Watermelon
  { N: 100, P: 18, K: 50, temperature: 25.5, humidity: 85.1, ph: 6.4, rainfall: 50.8, label: "watermelon" },
  { N: 90, P: 10, K: 52, temperature: 26.0, humidity: 88.0, ph: 6.2, rainfall: 55.0, label: "watermelon" },
  // Lentil
  { N: 18, P: 68, K: 19, temperature: 24.5, humidity: 64.7, ph: 6.9, rainfall: 45.6, label: "lentil" },
  { N: 25, P: 70, K: 22, temperature: 22.0, humidity: 60.0, ph: 7.0, rainfall: 50.0, label: "lentil" }
];

// Helper: Normalize value between 0 and 1
function normalize(val, min, max) {
  if (max === min) return 0;
  return (val - min) / (max - min);
}

// Calculate Euclidean Distance on normalized features
function calculateNormalizedDistance(a, b) {
  let sum = 0;
  for (const col of FEATURE_COLS) {
    const { min, max } = MIN_MAX[col];
    const normA = normalize(a[col], min, max);
    const normB = normalize(b[col], min, max);
    sum += Math.pow(normA - normB, 2);
  }
  return Math.sqrt(sum);
}

exports.predict = (farmerInput, k = 5, topN = 3) => {
  // 1. Calculate distances to all dataset records
  const distances = DATASET.map((record) => {
    const dist = calculateNormalizedDistance(farmerInput, record);
    return { label: record.label, distance: dist };
  });

  // 2. Sort by nearest distance and take top K
  distances.sort((a, b) => a.distance - b.distance);
  const kNearest = distances.slice(0, k);

  // 3. Aggregate votes and compute average distance per crop class
  const classStats = {};
  kNearest.forEach((item) => {
    if (!classStats[item.label]) {
      classStats[item.label] = { count: 0, totalDist: 0 };
    }
    classStats[item.label].count += 1;
    classStats[item.label].totalDist += item.distance;
  });

  // 4. Transform into ranked recommendations with Match Percentage
  const results = Object.keys(classStats).map((label) => {
    const count = classStats[label].count;
    const avgDist = classStats[label].totalDist / count;
    
    // Max theoretical distance in 7D normalized unit hypercube is sqrt(7) ≈ 2.645
    const maxPossibleDist = 2.645;
    const matchPercentage = Math.max(0, Math.min(100, Math.round((1 - avgDist / maxPossibleDist) * 100)));

    return {
      crop: label.toUpperCase(),
      matchScore: `${matchPercentage}%`,
      confidenceRank: count / k,
      distanceMetric: Number(avgDist.toFixed(4))
    };
  });

  results.sort((a, b) => b.distanceMetric - a.distanceMetric); // nearest first
  return results.slice(0, topN);
};

exports.FEATURE_COLS = FEATURE_COLS;
