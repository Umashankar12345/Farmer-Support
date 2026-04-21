export const STATE_DATA = {
  RJ: {
    name: "Rajasthan",
    crops: [{ n: "Wheat (Raj-3077)", z: "Zone A1", p: 88 }, { n: "Mustard (Pusa)", z: "Zone B2", p: 72 }, { n: "Millet (Bajra)", z: "Zone C1", p: 91 }, { n: "Chickpea", z: "Zone D4", p: 64 }],
    yield: "14.2 T", yc: "+8.4%", rev: "₹12.5L", rc: "+14.2%", hum: "58%", hn: "Semi-arid", al: "03", an: "Locust + moisture",
    pa: "₹1.5% Premium", ps: "Kharif 2024 — active", pp: 70, pl: "70% claims settled",
    soil: { N: "Low", P: "Med", K: "High", pH: "7.2" },
    hl: "Rajasthan Kisan Call: 0141-2227849",
    tip: "Low nitrogen in RJ soils — apply urea before next sowing.",
    lat: 26.9, lon: 75.8
  },
  UP: {
    name: "Uttar Pradesh",
    crops: [{ n: "Wheat (HD-2967)", z: "Zone A", p: 94 }, { n: "Sugarcane", z: "Zone B", p: 82 }, { n: "Paddy (Pusa-44)", z: "Zone C", p: 78 }, { n: "Potato", z: "Zone D", p: 70 }],
    yield: "18.6 T", yc: "+11.2%", rev: "₹18.2L", rc: "+9.8%", hum: "71%", hn: "High — skip irrigation", al: "02", an: "Blight risk",
    pa: "₹2% Premium", ps: "Rabi 2024–25 — active", pp: 78, pl: "78% farmers enrolled",
    soil: { N: "Med", P: "High", K: "Med", pH: "7.8" },
    hl: "UP Kisan: 1800-180-5109",
    tip: "High soil humidity in UP — reduce irrigation frequency.",
    lat: 26.8, lon: 80.9
  },
  MP: {
    name: "Madhya Pradesh",
    crops: [{ n: "Soybean", z: "Zone A", p: 86 }, { n: "Wheat (GW-322)", z: "Zone B", p: 80 }, { n: "Gram", z: "Zone C", p: 73 }, { n: "Maize", z: "Zone D", p: 61 }],
    yield: "15.8 T", yc: "+6.5%", rev: "₹14.1L", rc: "+7.3%", hum: "65%", hn: "Moderate", al: "04", an: "Stem borer alert",
    pa: "₹1.5% Premium", ps: "Kharif 2024 — claim open", pp: 55, pl: "55% enrolled",
    soil: { N: "Med", P: "Low", K: "High", pH: "6.9" },
    hl: "MP Kisan: 1800-233-4000",
    tip: "Stem borer alert in MP — apply chlorpyrifos at recommended dose.",
    lat: 23.2, lon: 77.4
  },
  MH: {
    name: "Maharashtra",
    crops: [{ n: "Cotton (BT)", z: "Zone A", p: 79 }, { n: "Sugarcane", z: "Zone B", p: 88 }, { n: "Soybean", z: "Zone C", p: 71 }, { n: "Tur (Arhar)", z: "Zone D", p: 66 }],
    yield: "12.4 T", yc: "+4.2%", rev: "₹16.8L", rc: "+12.1%", hum: "74%", hn: "High — watch fungal", al: "05", an: "Pink bollworm + fungal",
    pa: "₹2% Premium", ps: "Kharif 2024 — active", pp: 62, pl: "62% claims settled",
    soil: { N: "Low", P: "Med", K: "Med", pH: "6.5" },
    hl: "MH Helpline: 1800-233-4000",
    tip: "Pink bollworm risk high in Vidarbha — check cotton fields daily.",
    lat: 19.1, lon: 72.9
  },
  PB: {
    name: "Punjab",
    crops: [{ n: "Wheat (PBW-343)", z: "Zone A", p: 97 }, { n: "Paddy (PR-126)", z: "Zone B", p: 92 }, { n: "Maize", z: "Zone C", p: 76 }, { n: "Potato", z: "Zone D", p: 68 }],
    yield: "22.1 T", yc: "+5.8%", rev: "₹21.4L", rc: "+6.2%", hum: "68%", hn: "Good range", al: "01", an: "Yellow rust watch",
    pa: "₹1.5% Premium", ps: "Rabi 2024–25 — active", pp: 85, pl: "85% farmers enrolled",
    soil: { N: "High", P: "High", K: "Med", pH: "7.5" },
    hl: "Punjab Agri: 1800-180-1551",
    tip: "Yellow rust detected in Ludhiana — apply propiconazole spray.",
    lat: 30.9, lon: 75.8
  },
  HR: {
    name: "Haryana",
    crops: [{ n: "Wheat (WH-542)", z: "Zone A", p: 93 }, { n: "Paddy", z: "Zone B", p: 88 }, { n: "Mustard", z: "Zone C", p: 77 }, { n: "Bajra", z: "Zone D", p: 69 }],
    yield: "19.3 T", yc: "+7.1%", rev: "₹17.6L", rc: "+8.4%", hum: "63%", hn: "Normal", al: "02", an: "Aphid + lodging risk",
    pa: "₹2% Premium", ps: "Rabi 2024–25 — active", pp: 80, pl: "80% enrolled",
    soil: { N: "Med", P: "Med", K: "High", pH: "7.6" },
    hl: "HR Agri: 1800-180-1551",
    tip: "Aphid pressure rising in Haryana wheat — monitor fields weekly.",
    lat: 29.1, lon: 76.4
  },
  GJ: {
    name: "Gujarat",
    crops: [{ n: "Groundnut", z: "Zone A", p: 83 }, { n: "Cotton (BT)", z: "Zone B", p: 76 }, { n: "Wheat", z: "Zone C", p: 70 }, { n: "Cumin", z: "Zone D", p: 64 }],
    yield: "13.5 T", yc: "+5.2%", rev: "₹15.2L", rc: "+9.6%", hum: "60%", hn: "Adequate", al: "03", an: "Thrips + drought watch",
    pa: "₹1.5% Premium", ps: "Kharif 2024 — active", pp: 67, pl: "67% enrolled",
    soil: { N: "Low", P: "Med", K: "High", pH: "7.4" },
    hl: "GJ Agri: 1800-233-5500",
    tip: "Drought watch in Saurashtra — use micro-irrigation where possible.",
    lat: 23.0, lon: 72.6
  },
  AP: {
    name: "Andhra Pradesh",
    crops: [{ n: "Paddy (BPT-5204)", z: "Zone A", p: 91 }, { n: "Chilli (LCA-305)", z: "Zone B", p: 84 }, { n: "Cotton", z: "Zone C", p: 74 }, { n: "Groundnut", z: "Zone D", p: 66 }],
    yield: "16.2 T", yc: "+9.3%", rev: "₹19.8L", rc: "+11.4%", hum: "76%", hn: "High — fungal watch", al: "04", an: "BLB in paddy",
    pa: "₹2% Premium", ps: "Kharif 2024 — active", pp: 72, pl: "72% enrolled",
    soil: { N: "Med", P: "Low", K: "High", pH: "6.2" },
    hl: "AP Agri: 1800-425-1188",
    tip: "Bacterial leaf blight in Godavari districts — apply copper fungicide.",
    lat: 16.5, lon: 80.6
  },
  TN: {
    name: "Tamil Nadu",
    crops: [{ n: "Paddy (ADT-36)", z: "Zone A", p: 89 }, { n: "Banana", z: "Zone B", p: 85 }, { n: "Sugarcane", z: "Zone C", p: 79 }, { n: "Groundnut", z: "Zone D", p: 63 }],
    yield: "17.4 T", yc: "+10.1%", rev: "₹20.3L", rc: "+13.2%", hum: "79%", hn: "High — manage water", al: "03", an: "Stem rot + flood watch",
    pa: "₹2% Premium", ps: "Rabi 2024–25 — active", pp: 68, pl: "68% enrolled",
    soil: { N: "Med", P: "High", K: "Low", pH: "6.0" },
    hl: "TN Agri: 1800-425-1188",
    tip: "Heavy monsoon forecast in delta districts — check field bunds.",
    lat: 13.1, lon: 80.3
  },
  KA: {
    name: "Karnataka",
    crops: [{ n: "Ragi (GPU-28)", z: "Zone A", p: 87 }, { n: "Tur (Arhar)", z: "Zone B", p: 73 }, { n: "Maize", z: "Zone C", p: 80 }, { n: "Paddy", z: "Zone D", p: 68 }],
    yield: "13.9 T", yc: "+6.8%", rev: "₹14.5L", rc: "+8.1%", hum: "67%", hn: "Good", al: "02", an: "Blast in ragi",
    pa: "₹1.5% Premium", ps: "Kharif 2024 — active", pp: 60, pl: "60% enrolled",
    soil: { N: "Low", P: "Med", K: "Med", pH: "6.4" },
    hl: "KA Agri: 1800-425-1188",
    tip: "Blast disease in ragi — use resistant varieties next season.",
    lat: 15.3, lon: 75.7
  },
  WB: {
    name: "West Bengal",
    crops: [{ n: "Paddy (MTU-7029)", z: "Zone A", p: 90 }, { n: "Jute", z: "Zone B", p: 82 }, { n: "Potato", z: "Zone C", p: 76 }, { n: "Mustard", z: "Zone D", p: 62 }],
    yield: "16.8 T", yc: "+8.9%", rev: "₹15.4L", rc: "+7.6%", hum: "82%", hn: "Very high", al: "05", an: "Flood + BLB risk",
    pa: "₹2% Premium", ps: "Kharif 2024 — active", pp: 65, pl: "65% enrolled",
    soil: { N: "High", P: "Low", K: "Med", pH: "5.8" },
    hl: "WB Agri: 1800-345-6666",
    tip: "Flood advisory South Bengal — drain excess water from paddy fields.",
    lat: 22.6, lon: 88.4
  },
  OR: {
    name: "Odisha",
    crops: [{ n: "Paddy (Swarna)", z: "Zone A", p: 88 }, { n: "Groundnut", z: "Zone B", p: 70 }, { n: "Maize", z: "Zone C", p: 66 }, { n: "Arhar", z: "Zone D", p: 60 }],
    yield: "13.1 T", yc: "+5.4%", rev: "₹11.8L", rc: "+6.1%", hum: "75%", hn: "High", al: "04", an: "Cyclone + flood watch",
    pa: "₹2% Premium", ps: "Kharif 2024 — active", pp: 58, pl: "58% enrolled",
    soil: { N: "Low", P: "Low", K: "Med", pH: "5.5" },
    hl: "OR Agri: 1800-345-6770",
    tip: "Cyclone watch coastal Odisha — secure crop produce before landfall.",
    lat: 20.3, lon: 85.8
  },
  BR: {
    name: "Bihar",
    crops: [{ n: "Wheat (K-307)", z: "Zone A", p: 86 }, { n: "Paddy", z: "Zone B", p: 80 }, { n: "Maize", z: "Zone C", p: 72 }, { n: "Arhar", z: "Zone D", p: 58 }],
    yield: "14.0 T", yc: "+7.2%", rev: "₹12.0L", rc: "+5.8%", hum: "69%", hn: "Moderate", al: "03", an: "Flood + stem borer",
    pa: "₹2% Premium", ps: "Kharif 2024 — active", pp: 52, pl: "52% enrolled",
    soil: { N: "Low", P: "Med", K: "Low", pH: "6.8" },
    hl: "BR Agri: 1800-180-1551",
    tip: "Flood alert North Bihar — elevate seed storage immediately.",
    lat: 25.6, lon: 85.1
  },
  CG: {
    name: "Chhattisgarh",
    crops: [{ n: "Paddy (Danteshwari)", z: "Zone A", p: 85 }, { n: "Maize", z: "Zone B", p: 71 }, { n: "Groundnut", z: "Zone C", p: 64 }, { n: "Arhar", z: "Zone D", p: 59 }],
    yield: "11.8 T", yc: "+4.6%", rev: "₹10.2L", rc: "+5.3%", hum: "71%", hn: "High", al: "03", an: "Neck blast + flood",
    pa: "₹1.5% Premium", ps: "Kharif 2024 — active", pp: 50, pl: "50% enrolled",
    soil: { N: "Low", P: "Low", K: "Med", pH: "5.6" },
    hl: "CG Agri: 1800-180-1551",
    tip: "Neck blast in Raipur region — apply tricyclazole spray.",
    lat: 21.3, lon: 81.6
  },
  JH: {
    name: "Jharkhand",
    crops: [{ n: "Paddy", z: "Zone A", p: 84 }, { n: "Maize", z: "Zone B", p: 70 }, { n: "Arhar", z: "Zone C", p: 65 }, { n: "Potato", z: "Zone D", p: 60 }],
    yield: "10.6 T", yc: "+4.1%", rev: "₹9.5L", rc: "+3.8%", hum: "68%", hn: "Moderate", al: "02", an: "Drought watch",
    pa: "₹1.5% Premium", ps: "Kharif 2024 — active", pp: 48, pl: "48% enrolled",
    soil: { N: "Low", P: "Low", K: "Low", pH: "5.2" },
    hl: "JH Agri: 1800-180-1551",
    tip: "Low soil nutrients in Jharkhand — apply balanced NPK fertilizer.",
    lat: 23.3, lon: 85.3
  },
  HP: {
    name: "Himachal Pradesh",
    crops: [{ n: "Apple", z: "Zone A", p: 91 }, { n: "Wheat", z: "Zone B", p: 83 }, { n: "Maize", z: "Zone C", p: 74 }, { n: "Potato", z: "Zone D", p: 68 }],
    yield: "9.8 T", yc: "+5.9%", rev: "₹22.1L", rc: "+15.4%", hum: "55%", hn: "Good for orchards", al: "02", an: "Hail + frost",
    pa: "₹1.5% Premium", ps: "Rabi 2024–25 — active", pp: 72, pl: "72% enrolled",
    soil: { N: "Med", P: "High", K: "Med", pH: "6.8" },
    hl: "HP Agri: 1800-180-8060",
    tip: "Hail netting recommended in Kullu orchards — subsidy available.",
    lat: 31.1, lon: 77.2
  },
  UK: {
    name: "Uttarakhand",
    crops: [{ n: "Wheat", z: "Zone A", p: 87 }, { n: "Paddy", z: "Zone B", p: 79 }, { n: "Mandua", z: "Zone C", p: 82 }, { n: "Potato", z: "Zone D", p: 70 }],
    yield: "8.4 T", yc: "+3.8%", rev: "₹10.8L", rc: "+4.5%", hum: "61%", hn: "Good", al: "02", an: "Landslide + hail",
    pa: "₹1.5% Premium", ps: "Rabi 2024–25 — active", pp: 60, pl: "60% enrolled",
    soil: { N: "Med", P: "Med", K: "High", pH: "6.5" },
    hl: "UK Agri: 1800-180-1551",
    tip: "Landslide risk in hill districts — check terrace drainage before monsoon.",
    lat: 30.3, lon: 78.0
  },
  AS: {
    name: "Assam",
    crops: [{ n: "Paddy (Ranjit)", z: "Zone A", p: 88 }, { n: "Tea", z: "Zone B", p: 90 }, { n: "Mustard", z: "Zone C", p: 71 }, { n: "Jute", z: "Zone D", p: 65 }],
    yield: "14.2 T", yc: "+7.4%", rev: "₹13.6L", rc: "+8.2%", hum: "84%", hn: "Very high — manage", al: "05", an: "Flood + BLB",
    pa: "₹2% Premium", ps: "Kharif 2024 — active", pp: 55, pl: "55% enrolled",
    soil: { N: "Med", P: "Low", K: "High", pH: "5.4" },
    hl: "AS Agri: 1800-345-6770",
    tip: "Flood advisory Brahmaputra valley — deploy temporary bunds.",
    lat: 26.2, lon: 91.7
  },
  KL: {
    name: "Kerala",
    crops: [{ n: "Paddy (Jyothi)", z: "Zone A", p: 85 }, { n: "Coconut", z: "Zone B", p: 92 }, { n: "Rubber", z: "Zone C", p: 77 }, { n: "Banana", z: "Zone D", p: 83 }],
    yield: "8.1 T", yc: "+4.2%", rev: "₹18.4L", rc: "+10.3%", hum: "88%", hn: "Very high — monsoon", al: "04", an: "Flood + landslide",
    pa: "₹2% Premium", ps: "Kharif 2024 — active", pp: 64, pl: "64% enrolled",
    soil: { N: "High", P: "Low", K: "High", pH: "5.2" },
    hl: "KL Agri: 1800-425-1188",
    tip: "Heavy monsoon Wayanad — check hill farm drainage urgently.",
    lat: 10.9, lon: 76.3
  },
  GA: {
    name: "Goa",
    crops: [{ n: "Paddy (Goa Dhan)", z: "Zone A", p: 82 }, { n: "Cashew", z: "Zone B", p: 88 }, { n: "Coconut", z: "Zone C", p: 80 }, { n: "Banana", z: "Zone D", p: 71 }],
    yield: "4.2 T", yc: "+2.1%", rev: "₹8.6L", rc: "+5.4%", hum: "85%", hn: "High — coastal", al: "02", an: "Salt spray + monsoon",
    pa: "₹1.5% Premium", ps: "Kharif 2024 — active", pp: 45, pl: "45% enrolled",
    soil: { N: "Med", P: "High", K: "Med", pH: "5.8" },
    hl: "GA Agri: 1800-233-4000",
    tip: "Salt spray risk coastal Goa — apply kaolin clay spray on cashew.",
    lat: 15.5, lon: 74.0
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
  Potato: { s: "Rabi", v: 600 },
  Jute: { s: "Kharif", v: 5050 },
  Ragi: { s: "Kharif", v: 3846 },
  Tur: { s: "Kharif", v: 7550 },
  Coconut: { s: "Annual", v: 3275 },
  Mandua: { s: "Kharif", v: 3846 }
};
