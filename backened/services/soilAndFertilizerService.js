// Target nutrient benchmarks (kg/hectare) for target crops
const CROP_BENCHMARKS = {
  RICE: { N: 80, P: 40, K: 40, targetPh: 6.5 },
  MAIZE: { N: 100, P: 50, K: 50, targetPh: 6.2 },
  CHICKPEA: { N: 20, P: 60, K: 20, targetPh: 7.2 },
  COTTON: { N: 120, P: 60, K: 60, targetPh: 7.0 },
  COFFEE: { N: 100, P: 30, K: 30, targetPh: 6.5 },
  APPLE: { N: 30, P: 130, K: 200, targetPh: 6.0 },
  WATERMELON: { N: 90, P: 20, K: 50, targetPh: 6.5 },
  LENTIL: { N: 20, P: 68, K: 20, targetPh: 7.0 }
};

exports.analyzeSoilHealth = (soilData) => {
  const { N, P, K, ph } = soilData;
  const observations = [];

  // Nitrogen Status
  if (N < 50) observations.push({ nutrient: "Nitrogen (N)", status: "Low", detail: "Deficient. Can lead to stunted plant growth and yellowing leaves." });
  else if (N > 120) observations.push({ nutrient: "Nitrogen (N)", status: "High", detail: "Excessive. May burn roots or delay flowering/fruiting." });
  else observations.push({ nutrient: "Nitrogen (N)", status: "Optimal", detail: "Sufficient nitrogen levels present." });

  // Phosphorus Status
  if (P < 30) observations.push({ nutrient: "Phosphorus (P)", status: "Low", detail: "Deficient. Impairs root development and seed formation." });
  else observations.push({ nutrient: "Phosphorus (P)", status: "Optimal", detail: "Adequate root support levels." });

  // Potassium Status
  if (K < 30) observations.push({ nutrient: "Potassium (K)", status: "Low", detail: "Deficient. Reduces crop disease resistance and drought tolerance." });
  else observations.push({ nutrient: "Potassium (K)", status: "Optimal", detail: "Sufficient stress resistance levels." });

  // pH Evaluation
  let phCondition = "Neutral";
  let amendmentAdvice = "None required";
  if (ph < 6.0) {
    phCondition = "Acidic";
    amendmentAdvice = "Apply Agricultural Lime (Calcium Carbonate) at 2-3 tons/ha to raise pH.";
  } else if (ph > 7.5) {
    phCondition = "Alkaline / Saline";
    amendmentAdvice = "Apply Gypsum (Calcium Sulfate) or organic compost to lower pH.";
  }

  return {
    phCondition,
    amendmentAdvice,
    nutrientObservations: observations
  };
};

exports.calculateFertilizerDose = (cropName, currentSoil) => {
  const benchmark = CROP_BENCHMARKS[cropName] || { N: 80, P: 40, K: 40 };

  // Deficit in kg/ha
  const defN = Math.max(0, benchmark.N - currentSoil.N);
  const defP = Math.max(0, benchmark.P - currentSoil.P);
  const defK = Math.max(0, benchmark.K - currentSoil.K);

  // Conversion Standard:
  // Urea = 46% Nitrogen
  // DAP = 18% Nitrogen & 46% P2O5
  // MOP = 60% K2O (Potash)
  const dapReq = +(defP / 0.46).toFixed(1);
  const nitrogenFromDap = dapReq * 0.18;
  const remainingDeficitN = Math.max(0, defN - nitrogenFromDap);
  const ureaReq = +(remainingDeficitN / 0.46).toFixed(1);
  const mopReq = +(defK / 0.60).toFixed(1);

  return {
    targetCrop: cropName,
    deficitsKgPerHa: { N: defN, P: defP, K: defK },
    commercialFertilizersRequired: [
      { name: "Urea (46% N)", dosage: `${ureaReq} kg/hectare`, applicationTime: "Split into 2 doses (Basal & Top dressing)" },
      { name: "DAP (18% N, 46% P2O5)", dosage: `${dapReq} kg/hectare`, applicationTime: "Apply full dose as basal application during sowing" },
      { name: "MOP / Muriate of Potash (60% K2O)", dosage: `${mopReq} kg/hectare`, applicationTime: "Apply during land preparation" }
    ]
  };
};
