import React, { useState, useEffect } from "react";
import { apiRequest } from "../../services/api";

export default function NDVISatellite({ farmId = 'defaultUser123' }) {
  const [loading, setLoading] = useState(true);
  const [ndviData, setNdviData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch live Sentinel-2 / Agromonitoring satellite payload via Node.js proxy
    const fetchSatelliteData = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(`/satellite/ndvi/${farmId}`);
        setNdviData(data);
      } catch (err) {
        console.warn("Satellite API failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSatelliteData();
  }, [farmId]);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-medium">
        🛰️ Fetching Sentinel-2 satellite telemetry & processing NDVI matrix...
      </div>
    );
  }

  if (error || !ndviData || !ndviData.activeField) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="p-4 bg-gray-100 text-gray-500 rounded-lg border border-gray-200 text-sm text-center shadow-sm w-96">
          <div className="text-xl mb-2">🛠️</div>
          <div>Feature under maintenance.</div>
          <div className="text-xs mt-1">Please check back shortly.</div>
        </div>
      </div>
    );
  }

  const { activeField, allFields, advisories } = ndviData;

  return (
    <div className="p-6 bg-[#f1f5f3] min-h-screen font-sans text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span>🛰️</span> NDVI Satellite Crop Health Map
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Field-level vegetation index • Green = Healthy | Red = Stressed
          </p>
        </div>
        <button className="bg-[#0b1320] hover:bg-[#1e293b] text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-1.5">
          🔄 Refresh Satellite
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Grid: Heatmap (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0c1911] border border-emerald-950 p-5 rounded-2xl shadow-sm text-white relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {activeField.name} — {activeField.crop} • {activeField.zone}
              </span>
              <span className="bg-emerald-900/80 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-700/50">
                NDVI {activeField.score}
              </span>
            </div>

            {/* Simulated Satellite Spatial Heatmap Grid */}
            <div className="relative bg-[#050c07] p-4 rounded-xl border border-emerald-900/40 grid grid-cols-6 gap-2 my-2 min-h-[220px]">
              {activeField.gridCells.map((cell, idx) => {
                let bgColor = "bg-emerald-600";
                if (cell.status === "stress") bgColor = "bg-red-600 animate-pulse";
                if (cell.status === "warning") bgColor = "bg-amber-500";
                if (cell.status === "dry") bgColor = "bg-emerald-700";

                return (
                  <div
                    key={idx}
                    className={`${bgColor} rounded-md h-12 flex items-center justify-center text-[10px] font-bold text-white shadow-inner cursor-pointer hover:opacity-90 transition`}
                  >
                    {cell.label && <span>{cell.label}</span>}
                  </div>
                );
              })}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded border border-gray-700 font-mono">
                NDVI: {activeField.score} - {activeField.areaHa} Ha
              </div>
            </div>

            {/* Active Field Alert */}
            {activeField.alert && (
              <div className="bg-red-600/90 text-white text-xs font-semibold p-3 rounded-xl mt-3 flex items-center gap-2">
                <span>⚠️ {activeField.alert}</span>
              </div>
            )}
          </div>

          {/* Vegetation Index Scale Bar */}
          <div className="bg-white/70 border border-gray-200/80 p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              VEGETATION INDEX LEGEND
            </span>
            <div className="h-3 rounded-full bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 to-emerald-900 w-full mb-1"></div>
            <div className="flex justify-between text-[10px] text-gray-500 font-medium">
              <span>0.0 (Bare soil)</span>
              <span>0.2</span>
              <span>0.5</span>
              <span>0.8</span>
              <span>1.0 (Dense)</span>
            </div>
          </div>
        </div>

        {/* Right Section: Multi-field bars & AI Advisories (1 Col) */}
        <div className="space-y-6">
          {/* All Fields list */}
          <div className="bg-white/70 border border-gray-200/80 p-5 rounded-2xl shadow-sm">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              ALL FIELDS NDVI
            </h2>
            <div className="space-y-3">
              {allFields.map((field, idx) => {
                let barColor = "bg-emerald-600";
                let textColor = "text-emerald-700";
                if (field.ndvi < 0.5) { barColor = "bg-red-500"; textColor = "text-red-600"; }
                else if (field.ndvi < 0.7) { barColor = "bg-amber-500"; textColor = "text-amber-600"; }

                return (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="w-1/3">
                      <span className="font-bold text-slate-800 block truncate">{field.name}</span>
                      <span className="text-[10px] text-gray-400">{field.crop}</span>
                    </div>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2 overflow-hidden mx-2">
                      <div className={`h-2 rounded-full ${barColor}`} style={{ width: `${field.ndvi * 100}%` }}></div>
                    </div>
                    <span className={`font-mono font-bold w-10 text-right ${textColor}`}>
                      {field.ndvi.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Satellite Advisories */}
          <div className="bg-white/70 border border-gray-200/80 p-5 rounded-2xl shadow-sm">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              SATELLITE ADVISORY
            </h2>
            <div className="space-y-3">
              {advisories.map((item, idx) => {
                let badgeClass = "bg-emerald-50 border-emerald-200 text-emerald-900";
                let dot = "🟢";
                if (item.level === "severe") { badgeClass = "bg-red-50 border-red-200 text-red-900"; dot = "🔴"; }
                if (item.level === "moderate") { badgeClass = "bg-amber-50 border-amber-200 text-amber-900"; dot = "🟡"; }

                return (
                  <div key={idx} className={`p-3 rounded-xl border text-xs ${badgeClass}`}>
                    <p className="font-bold flex items-center gap-1.5 mb-1">
                      <span>{dot}</span> {item.fieldName} • NDVI {item.ndvi}
                    </p>
                    <p className="text-[11px] opacity-90 leading-relaxed">{item.message}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
