// backend/services/cropRecommenderService.js
//
// Replaces fixed "94% / 78% / 65%" match scores with a real, transparent
// scoring engine. Every score is COMPUTED from the farmer's actual inputs
// against sourced agronomic reference ranges - change the inputs, the
// scores genuinely change.
//
// SOURCING NOTE: The pH/rainfall ranges below were compiled from general
// agricultural extension sources (cross-crop references). Before using
// this in front of real farmers, cross-check each crop's range against
// your state's Krishi Vigyan Kendra (KVK) or ICAR crop production guide -
// treat this as a correct METHODOLOGY with placeholder-grade reference
// numbers, not verified production data yet.

const CROP_REQUIREMENTS = {
  Wheat: {
    phRange: [6.0, 7.5],       // performs poorly below 5.5 (aluminum toxicity)
    rainfallRangeMm: [450, 650],
    season: "Rabi",
    soilTypes: ["Loamy", "Clay", "Black"],
  },
  Mustard: {
    phRange: [6.0, 7.5],
    rainfallRangeMm: [300, 400],
    season: "Rabi",
    soilTypes: ["Loamy", "Sandy", "Black"],
  },
  Cotton: {
    phRange: [5.8, 8.0],       // broad tolerance, but best fiber quality near neutral
    rainfallRangeMm: [600, 1200],
    season: "Kharif",
    soilTypes: ["Black", "Loamy"],
  },
  Chickpea: {
    phRange: [6.0, 7.5],
    rainfallRangeMm: [350, 500],
    season: "Rabi",
    soilTypes: ["Loamy", "Sandy", "Black"],
  },
  Soybean: {
    phRange: [6.0, 7.0],
    rainfallRangeMm: [600, 1000],
    season: "Kharif",
    soilTypes: ["Loamy", "Black"],
  },
  Onion: {
    phRange: [6.0, 7.0],
    rainfallRangeMm: [350, 550],   // lowest irrigation need among common vegetables
    season: "Rabi",
    soilTypes: ["Loamy", "Sandy"],
  },
};

/**
 * Scores how well a value fits inside a range, 0-100.
 * A value dead-center in the range scores 100; values outside the range
 * fall off linearly, hitting 0 at 1.5x the range width beyond the edge.
 * This is the key mechanism that makes the score actually MOVE when the
 * farmer changes their pH/rainfall input - not a fixed lookup.
 */
function scoreAgainstRange(value, [min, max]) {
  if (value >= min && value <= max) return 100;
  const width = max - min;
  const tolerance = width * 1.5;
  const distance = value < min ? min - value : value - max;
  const score = 100 * (1 - distance / tolerance);
  return Math.max(0, Math.round(score));
}

function scoreSoilTypeMatch(soilType, acceptedTypes) {
  return acceptedTypes.includes(soilType) ? 100 : 40; // partial credit, not zero - many crops tolerate non-ideal soil at reduced yield
}

function scoreSeasonMatch(farmerSeason, cropSeason) {
  return farmerSeason === cropSeason ? 100 : 20;
}

/**
 * Combines agronomic fit with real market data (price trend from your
 * existing mandiPriceService.js) to produce a final recommendation score.
 * marketData is optional - if not provided, only agronomic fit is used.
 */
function computeCropScore(cropName, farmerInputs, marketData = null) {
  const req = CROP_REQUIREMENTS[cropName];
  if (!req) return null;

  const phScore = scoreAgainstRange(farmerInputs.soilPH, req.phRange);
  const rainfallScore = scoreAgainstRange(farmerInputs.rainfallMm, req.rainfallRangeMm);
  const soilTypeScore = scoreSoilTypeMatch(farmerInputs.soilType, req.soilTypes);
  const seasonScore = scoreSeasonMatch(farmerInputs.season, req.season);

  // Agronomic fit: weighted average of the four physical factors
  const agronomicScore =
    phScore * 0.30 +
    rainfallScore * 0.30 +
    soilTypeScore * 0.20 +
    seasonScore * 0.20;

  let finalScore = agronomicScore;
  let marketNote = null;

  if (marketData) {
    // Blend in real profitability: agronomic fit still dominates (70%),
    // but current market trend nudges the ranking (30%) - a crop that's
    // agronomically fine but at a price low shouldn't outrank one that's
    // both suitable AND currently profitable.
    const trendScore = marketData.trendDirection === "rising" ? 100
                      : marketData.trendDirection === "stable" ? 60
                      : 20;
    finalScore = agronomicScore * 0.7 + trendScore * 0.3;
    marketNote = `Current price trend: ${marketData.trendDirection}`;
  }

  return {
    cropName,
    matchPercent: Math.round(finalScore),
    breakdown: { phScore, rainfallScore, soilTypeScore, seasonScore },
    marketNote,
  };
}

function recommendCrops(farmerInputs, marketDataByCrop = {}) {
  const results = Object.keys(CROP_REQUIREMENTS)
    .map((crop) => computeCropScore(crop, farmerInputs, marketDataByCrop[crop] || null))
    .filter(Boolean)
    .sort((a, b) => b.matchPercent - a.matchPercent);

  return results;
}

module.exports = { computeCropScore, recommendCrops, CROP_REQUIREMENTS };
