const fs = require('fs');
const path = require('path');
const { FEATURE_COLS } = require('./services/cropRecommenderService');

const CSV_PATH = path.join(__dirname, 'data/crop_data.csv');

function loadCsv(csvPath) {
  const raw = fs.readFileSync(csvPath, "utf8").trim();
  const [headerLine, ...lines] = raw.split("\n");
  const headers = headerLine.split(",");

  const rows = lines.map((line) => {
    const values = line.split(",");
    const row = {};
    headers.forEach((h, i) => (row[h] = values[i]));
    return row;
  });

  return rows;
}

function standardize(features, testFeatures = null) {
  const n = features.length;
  const dims = features[0].length;

  const mean = new Array(dims).fill(0);
  for (const row of features) {
    for (let d = 0; d < dims; d++) mean[d] += row[d];
  }
  for (let d = 0; d < dims; d++) mean[d] /= n;

  const std = new Array(dims).fill(0);
  for (const row of features) {
    for (let d = 0; d < dims; d++) std[d] += (row[d] - mean[d]) ** 2;
  }
  for (let d = 0; d < dims; d++) std[d] = Math.sqrt(std[d] / n) || 1;

  const scaled = features.map((row) => row.map((v, d) => (v - mean[d]) / std[d]));
  
  let scaledTest = null;
  if (testFeatures) {
    scaledTest = testFeatures.map((row) => row.map((v, d) => (v - mean[d]) / std[d]));
  }

  return { scaled, scaledTest, mean, std };
}

function euclideanDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2;
  return Math.sqrt(sum);
}

function runEvaluation() {
  const rows = loadCsv(CSV_PATH);
  
  // Shuffle randomly (deterministic seed not strictly needed for a quick check, but let's just do a simple split)
  // To match 1760 train and 440 test (80/20 split)
  // Let's use a deterministic pseudo-random shuffle to ensure consistent results
  let seed = 42;
  function random() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }
  
  rows.sort(() => random() - 0.5);
  
  const trainRows = rows.slice(0, 1760);
  const testRows = rows.slice(1760);
  
  const trainFeatures = trainRows.map(r => FEATURE_COLS.map(c => parseFloat(r[c])));
  const trainLabels = trainRows.map(r => r.label);
  
  const testFeatures = testRows.map(r => FEATURE_COLS.map(c => parseFloat(r[c])));
  const testLabels = testRows.map(r => r.label);
  
  const { scaled: scaledTrain, scaledTest, mean, std } = standardize(trainFeatures, testFeatures);
  
  let correct = 0;
  
  for (let i = 0; i < testRows.length; i++) {
    const x = scaledTest[i];
    const distances = scaledTrain.map((row, idx) => ({
      distance: euclideanDistance(x, row),
      label: trainLabels[idx],
    }));
    
    distances.sort((a, b) => a.distance - b.distance);
    const neighbors = distances.slice(0, 5); // k=5
    
    const votes = {};
    let totalWeight = 0;
    for (const n of neighbors) {
      const weight = 1 / (n.distance + 1e-6);
      votes[n.label] = (votes[n.label] || 0) + weight;
      totalWeight += weight;
    }
    
    const predicted = Object.entries(votes)
      .sort((a, b) => b[1] - a[1])[0][0];
      
    if (predicted === testLabels[i]) {
      correct++;
    }
  }
  
  const accuracy = (correct / testRows.length) * 100;
  console.log(`Train set: ${trainRows.length}`);
  console.log(`Test set: ${testRows.length}`);
  console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
}

runEvaluation();
