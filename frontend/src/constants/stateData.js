export const STATE_DATA = {
  RJ: {
    name: "Rajasthan",
    crops: [
      { n: "Wheat (Raj-3077)", z: "Zone A1", p: 88 },
      { n: "Mustard (Pusa)", z: "Zone B2", p: 72 },
      { n: "Millet (Bajra)", z: "Zone C1", p: 91 },
      { n: "Chickpea", z: "Zone D4", p: 64 }
    ],
    yield: "14.2 T", yc: "+8.4%", rev: "₹12.5L", rc: "+14.2%", hum: "58%", hn: "Semi-arid", al: "03", an: "Locust + moisture",
    pa: "₹1.5% Premium", ps: "Kharif 2024 — active", pp: 70, pl: "70% claims settled",
    soil: { N: "Low", P: "Med", K: "High", pH: "7.2" },
    hl: "Rajasthan Kisan Call: 0141-2227849",
    tip: "Low nitrogen in RJ soils — apply urea before next sowing.",
    lat: 26.9, lon: 75.8
  },
  UP: {
    name: "Uttar Pradesh",
    crops: [
      { n: "Wheat (HD-2967)", z: "Zone A", p: 94 },
      { n: "Sugarcane", z: "Zone B", p: 82 },
      { n: "Paddy (Pusa-44)", z: "Zone C", p: 78 },
      { n: "Potato", z: "Zone D", p: 70 }
    ],
    yield: "18.6 T", yc: "+11.2%", rev: "₹18.2L", rc: "+9.8%", hum: "71%", hn: "High — skip irrigation", al: "02", an: "Blight risk",
    pa: "₹2% Premium", ps: "Rabi 2024–25 — active", pp: 78, pl: "78% farmers enrolled",
    soil: { N: "Med", P: "High", K: "Med", pH: "7.8" },
    hl: "UP Kisan: 1800-180-5109",
    tip: "High soil humidity in UP — reduce irrigation frequency.",
    lat: 26.8, lon: 80.9
  },
  PB: {
    name: "Punjab",
    crops: [
      { n: "Wheat (PBW-343)", z: "Zone A", p: 97 },
      { n: "Paddy (PR-126)", z: "Zone B", p: 92 },
      { n: "Maize", z: "Zone C", p: 76 },
      { n: "Potato", z: "Zone D", p: 68 }
    ],
    yield: "22.1 T", yc: "+5.8%", rev: "₹21.4L", rc: "+6.2%", hum: "68%", hn: "Good range", al: "01", an: "Yellow rust watch",
    pa: "₹1.5% Premium", ps: "Rabi 2024–25 — active", pp: 85, pl: "85% farmers enrolled",
    soil: { N: "High", P: "High", K: "Med", pH: "7.5" },
    hl: "Punjab Agri: 0172-2701010",
    tip: "Yellow rust detected in Ludhiana — apply propiconazole spray.",
    lat: 30.9, lon: 75.8
  },
  HR: {
    name: "Haryana",
    crops: [
      { n: "Wheat (WH-542)", z: "Zone A", p: 93 },
      { n: "Paddy", z: "Zone B", p: 88 },
      { n: "Mustard", z: "Zone C", p: 77 },
      { n: "Bajra", z: "Zone D", p: 69 }
    ],
    yield: "19.3 T", yc: "+7.1%", rev: "₹17.6L", rc: "+8.4%", hum: "63%", hn: "Normal", al: "02", an: "Aphid + lodging risk",
    pa: "₹2% Premium", ps: "Rabi 2024–25 — active", pp: 80, pl: "80% enrolled",
    soil: { N: "Med", P: "Med", K: "High", pH: "7.6" },
    hl: "HR Agri: 1800-180-1551",
    tip: "Aphid pressure rising in Haryana wheat — monitor fields weekly.",
    lat: 29.1, lon: 76.4
  }
};

export const MSP_DATA = {
  Wheat: { s: "Rabi", v: 2275 },
  Paddy: { s: "Kharif", v: 2300 },
  Bajra: { s: "Kharif", v: 2625 },
  Maize: { s: "Kharif", v: 2090 },
  Arhar: { s: "Kharif", v: 7550 },
  Mustard: { s: "Rabi", v: 5950 },
  Gram: { s: "Rabi", v: 5440 },
  Chickpea: { s: "Rabi", v: 5440 },
  Soybean: { s: "Kharif", v: 4892 },
  Cotton: { s: "Kharif", v: 7121 },
  Groundnut: { s: "Kharif", v: 6783 },
  Sugarcane: { s: "Annual", v: 3400 },
  Potato: { s: "Rabi", v: 600 }
};
