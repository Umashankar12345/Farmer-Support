import React, { useState, useMemo } from "react";

// 1. Dynamic State Database (Simulating Backend / API Payload)
const STATE_DATA = {
  Punjab: {
    advisory: "High soil moisture detected in Zone PB1 — delay wheat irrigation.",
    crops: [
      { name: "Wheat (PBW-725)", zone: "Zone PB1", health: 92, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Paddy (PR-126)", zone: "Zone PB2", health: 85, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Mustard (Giriraj)", zone: "Zone PB3", health: 68, color: "bg-amber-500", text: "text-amber-600" },
      { name: "Cotton (LH-2170)", zone: "Zone PB4", health: 48, color: "bg-red-500", text: "text-red-600" },
    ],
    yield: "18.5 T",
    yieldGain: "+12.1% vs last yr",
    humidity: "64%",
    temp: "31°C",
    sky: "Partly Cloudy",
    alerts: "02",
    alertText: "Yellow Rust Warning",
    soil: { n: "Low", p: "High", k: "High", ph: "7.4" }
  },
  Bihar: {
    advisory: "Nitrogen deficiency in North Bihar soils — top-dress with Urea before rain.",
    crops: [
      { name: "Maize (Shaktiman-5)", zone: "Zone BH1", health: 88, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Paddy (Rajendra Sweta)", zone: "Zone BH2", health: 79, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Wheat (HD-2967)", zone: "Zone BH3", health: 62, color: "bg-amber-500", text: "text-amber-600" },
      { name: "Lentil (BR-25)", zone: "Zone BH4", health: 41, color: "bg-red-500", text: "text-red-600" },
    ],
    yield: "11.8 T",
    yieldGain: "+5.2% vs last yr",
    humidity: "78%",
    temp: "29°C",
    sky: "Light Rain",
    alerts: "04",
    alertText: "Stem Borer & Flood Watch",
    soil: { n: "Very Low", p: "Med", k: "Med", ph: "6.8" }
  },
  Rajasthan: {
    advisory: "Low nitrogen in B2 soils — apply urea before next sowing.",
    crops: [
      { name: "Wheat (Raj-3077)", zone: "Zone A1", health: 88, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Mustard (Pusa)", zone: "Zone B2", health: 72, color: "bg-amber-500", text: "text-amber-600" },
      { name: "Millet (Bajra)", zone: "Zone C1", health: 91, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Chickpea", zone: "Zone D4", health: 65, color: "bg-red-500", text: "text-red-600" },
    ],
    yield: "14.2 T",
    yieldGain: "+8.4% vs last yr",
    humidity: "58%",
    temp: "28°C",
    sky: "Clear Sky",
    alerts: "03",
    alertText: "Locust + Moisture",
    soil: { n: "Low", p: "Med", k: "High", ph: "7.2" }
  },
  "Uttar Pradesh": {
    advisory: "Sugarcane red rot early detection reported in Western UP zones.",
    crops: [
      { name: "Sugarcane (Co-0238)", zone: "Zone UP1", health: 94, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Wheat (PBW-343)", zone: "Zone UP2", health: 81, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Rice (Pusa 1121)", zone: "Zone UP3", health: 70, color: "bg-amber-500", text: "text-amber-600" },
      { name: "Potato (Kufri Pukhraj)", zone: "Zone UP4", health: 55, color: "bg-red-500", text: "text-red-600" },
    ],
    yield: "16.7 T",
    yieldGain: "+10.1% vs last yr",
    humidity: "71%",
    temp: "30°C",
    sky: "Humid / Hazy",
    alerts: "01",
    alertText: "Red Rot Risk",
    soil: { n: "Med", p: "High", k: "Med", ph: "7.1" }
  },
  Haryana: {
    advisory: "Paddy stubble management protocol active. Monitor air quality indices.",
    crops: [
      { name: "Basmati Rice (CSR-30)", zone: "Zone HR1", health: 90, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Wheat (WH-1105)", zone: "Zone HR2", health: 84, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Mustard (RH-749)", zone: "Zone HR3", health: 76, color: "bg-amber-500", text: "text-amber-600" },
      { name: "Cotton (H-1098)", zone: "Zone HR4", health: 59, color: "bg-red-500", text: "text-red-600" },
    ],
    yield: "17.1 T",
    yieldGain: "+9.2% vs last yr",
    humidity: "60%",
    temp: "30°C",
    sky: "Sunny",
    alerts: "02",
    alertText: "Whitefly Activity",
    soil: { n: "Med", p: "Med", k: "High", ph: "7.5" }
  },
  "Madhya Pradesh": {
    advisory: "Soybean black soil drainage checks required after heavy precipitation.",
    crops: [
      { name: "Soybean (JS-335)", zone: "Zone MP1", health: 89, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Wheat (Sharbati)", zone: "Zone MP2", health: 86, color: "bg-emerald-500", text: "text-emerald-600" },
      { name: "Gram (Chana)", zone: "Zone MP3", health: 74, color: "bg-amber-500", text: "text-amber-600" },
      { name: "Garlic (Amleta)", zone: "Zone MP4", health: 61, color: "bg-red-500", text: "text-red-600" },
    ],
    yield: "13.5 T",
    yieldGain: "+6.8% vs last yr",
    humidity: "62%",
    temp: "27°C",
    sky: "Overcast",
    alerts: "02",
    alertText: "Fungal Spot Advisory",
    soil: { n: "High", p: "Low", k: "Med", ph: "6.9" }
  }
};

export default function DigitalKrishiDashboard() {
  // State 1: Active Region
  const [selectedState, setSelectedState] = useState("Punjab");
  
  // State 2: Dynamic Logged-in User
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { name: "Umashankar Kumar" };
  });

  // Derived current state data
  const currentData = useMemo(() => {
    return STATE_DATA[selectedState] || STATE_DATA["Punjab"];
  }, [selectedState]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Hey, {user.name} 👋
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            EXECUTIVE DASHBOARD • THU, 30 JUL, 2026 • <span className="text-emerald-600">{selectedState.toUpperCase()}</span>
          </p>
        </div>

        {/* CONTROLS: LANGUAGE & STATE DROPDOWN */}
        <div className="flex items-center gap-3">
          <select className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm outline-none">
            <option>🌐 हिन्दी (Hindi)</option>
            <option>🌐 English</option>
          </select>

          {/* DYNAMIC STATE SELECTOR */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {Object.keys(STATE_DATA).map((stateName) => (
              <option key={stateName} value={stateName}>
                📍 {stateName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* DYNAMIC ADVISORY BANNER */}
      <div className="bg-[#0b291a] text-emerald-300 text-xs font-medium px-4 py-2.5 rounded-lg mb-6 flex items-center gap-2 shadow-inner">
        <span>💡</span>
        <span>{currentData.advisory}</span>
      </div>

      {/* TOP METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PROJECTED YIELD</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-extrabold text-slate-800">{currentData.yield}</span>
            <span className="text-[10px] font-bold text-emerald-600">{currentData.yieldGain}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SOIL HUMIDITY</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-extrabold text-slate-800">{currentData.humidity}</span>
            <span className="text-[10px] font-bold text-emerald-600">+GAIN</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">EST. REVENUE</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-extrabold text-slate-800">₹12.5L</span>
            <span className="text-[10px] font-bold text-emerald-600">+14.2% vs last yr</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LIVE TEMP / RAIN</span>
          <div className="mt-1">
            <span className="text-xl font-extrabold text-slate-800">{currentData.temp}</span>
            <p className="text-[10px] font-semibold text-slate-500">{currentData.sky}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ACTIVE ALERTS</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-extrabold text-slate-800">{currentData.alerts}</span>
            <span className="text-[10px] font-bold text-amber-600">⚠️ WATCH</span>
          </div>
          <p className="text-[10px] font-bold text-amber-600 truncate mt-0.5">{currentData.alertText}</p>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT & CENTER: DYNAMIC CROP HEALTH INDEX */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-extrabold text-slate-700 tracking-wider uppercase flex items-center gap-1.5">
              🌽 CROP HEALTH INDEX — <span className="text-emerald-600">{selectedState.toUpperCase()}</span>
            </h2>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded">
              AI ANALYZED
            </span>
          </div>

          <div className="space-y-4">
            {currentData.crops.map((crop, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>{crop.name} • <span className="text-slate-400">{crop.zone}</span></span>
                  <span className={crop.text}>{crop.health}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${crop.color} transition-all duration-500 ease-out`}
                    style={{ width: `${crop.health}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: SCHEMES & SOIL HEALTH CARD */}
        <div className="space-y-4">
          
          {/* PM-KISAN CARD */}
          <div className="bg-[#0b291a] text-white p-4 rounded-xl shadow-sm">
            <span className="text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase">PM-KISAN SAMMAN NIDHI</span>
            <h3 className="text-xl font-black mt-1">₹6,000 / year</h3>
            <p className="text-[10px] text-emerald-200 mt-0.5">Next installment: ₹2,000 in 15 days</p>
            <div className="w-full bg-emerald-950 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-400 h-full w-2/3"></div>
            </div>
          </div>

          {/* DYNAMIC SOIL HEALTH CARD */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">SOIL HEALTH CARD</span>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-rose-50 border border-rose-100 p-2 rounded-lg flex justify-between items-center text-xs">
                <span className="font-bold text-slate-600">NITROGEN (N)</span>
                <span className="font-extrabold text-rose-600">{currentData.soil.n}</span>
              </div>
              <div className="bg-amber-50 border border-amber-100 p-2 rounded-lg flex justify-between items-center text-xs">
                <span className="font-bold text-slate-600">PHOSPHORUS (P)</span>
                <span className="font-extrabold text-amber-600">{currentData.soil.p}</span>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-lg flex justify-between items-center text-xs">
                <span className="font-bold text-slate-600">POTASSIUM (K)</span>
                <span className="font-extrabold text-emerald-600">{currentData.soil.k}</span>
              </div>
              <div className="bg-blue-50 border border-blue-100 p-2 rounded-lg flex justify-between items-center text-xs">
                <span className="font-bold text-slate-600">PH LEVEL</span>
                <span className="font-extrabold text-blue-600">{currentData.soil.ph}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}