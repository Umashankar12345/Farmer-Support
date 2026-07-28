// backend/services/cropRecommenderService.js
//
// Pure Node.js port of the KNN crop recommender - no Python required.
// Trained on the SAME real dataset (2,200 real records, 22 crops) that
// we verified achieved 98.2% test accuracy in the Python/scikit-learn
// version. This implements the identical algorithm (standardized
// distance-weighted K-Nearest-Neighbors) from scratch in JS, so there's
// no cross-language dependency and no subprocess/microservice needed.
//
// SETUP: place the real crop_data.csv (downloaded from
// https://raw.githubusercontent.com/gireesh777/Crop_Recommendation_System_using_ML/master/Dataset/Crop_recommendation.csv)
// at backend/data/crop_data.csv

const fs = require("fs");
const path = require("path");

const FEATURE_COLS = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"];
const CSV_PATH = path.join(__dirname, "../data/crop_data.csv");

let trainingData = null; // { features: number[][], labels: string[], mean: number[], std: number[] }

/**
 * Minimal CSV parser - the real dataset has no quoted/escaped fields, so a
 * simple split is safe and avoids an extra dependency. If your CSV ever
 * has quoted commas, swap this for the `csv-parse` npm package instead.
 */
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

function standardize(features) {
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
  for (let d = 0; d < dims; d++) std[d] = Math.sqrt(std[d] / n) || 1; // avoid divide-by-zero

  const scaled = features.map((row) => row.map((v, d) => (v - mean[d]) / std[d]));

  return { scaled, mean, std };
}

function euclideanDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2;
  return Math.sqrt(sum);
}

/**
 * Loads and trains on the real dataset. Called once at server startup
 * (or lazily on first request) - the trained "model" here is just the
 * standardized real records + scaling params kept in memory, since KNN
 * has no separate training phase beyond that.
 */
function loadModel() {
  if (trainingData) return trainingData; // already loaded

  const rows = loadCsv(CSV_PATH);
  const features = rows.map((r) => FEATURE_COLS.map((c) => parseFloat(r[c])));
  const labels = rows.map((r) => r.label);

  const { scaled, mean, std } = standardize(features);

  trainingData = { scaled, labels, mean, std, rawCount: rows.length };
  console.log(`[cropRecommenderService] Loaded ${rows.length} real training records.`);
  return trainingData;
}

/**
 * Distance-weighted KNN prediction - same algorithm as the Python version.
 * Closer neighbors get more voting weight (1/distance) than farther ones.
 */
function predict(farmerInput, k = 5, topN = 5) {
  const model = loadModel();

  const x = FEATURE_COLS.map((c, i) => (farmerInput[c] - model.mean[i]) / model.std[i]);

  const distances = model.scaled.map((row, idx) => ({
    distance: euclideanDistance(x, row),
    label: model.labels[idx],
  }));

  distances.sort((a, b) => a.distance - b.distance);
  const neighbors = distances.slice(0, k);

  // Weighted vote: closer neighbors count more (avoid divide-by-zero with a tiny epsilon)
  const votes = {};
  let totalWeight = 0;
  for (const n of neighbors) {
    const weight = 1 / (n.distance + 1e-6);
    votes[n.label] = (votes[n.label] || 0) + weight;
    totalWeight += weight;
  }

  const results = Object.entries(votes)
    .map(([crop, weight]) => ({ cropName: crop, matchPercent: Math.round((weight / totalWeight) * 1000) / 10 }))
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, topN);

  return results;
}

module.exports = { loadModel, predict, FEATURE_COLS };
