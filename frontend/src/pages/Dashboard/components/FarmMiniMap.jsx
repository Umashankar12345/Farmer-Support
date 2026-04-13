import React from 'react';

const FarmMiniMap = () => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">My Farms Map</h3>
        <span className="bg-green-50 text-green-600 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-tighter">GPS LIVE</span>
      </div>
      
      <div className="bg-green-50 rounded-xl h-32 relative overflow-hidden border border-green-100">
        <svg width="100%" height="100%" className="opacity-60">
          <line x1="0" y1="35" x2="100%" y2="50" stroke="#a7f3d0" strokeWidth="1.5"/>
          <line x1="0" y1="65" x2="100%" y2="80" stroke="#a7f3d0" strokeWidth="1"/>
          <line x1="55" y1="0" x2="70" y2="100%" stroke="#a7f3d0" strokeWidth="1.5"/>
          <line x1="125" y1="0" x2="140" y2="100%" stroke="#a7f3d0" strokeWidth="1"/>
          
          {/* Field 1 — Healthy */}
          <rect x="72" y="22" width="46" height="30" rx="3" fill="#22c55e" fillOpacity="0.55" stroke="#16a34a" strokeWidth="2" />
          {/* Field 2 — Alert */}
          <rect x="144" y="42" width="40" height="26" rx="3" fill="#ef4444" fillOpacity="0.5" stroke="#dc2626" strokeWidth="2" />
          {/* Field 3 — Monitor */}
          <rect x="115" y="76" width="34" height="22" rx="3" fill="#f59e0b" fillOpacity="0.5" stroke="#d97706" strokeWidth="2" />
        </svg>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-gray-200 text-[8px] font-black text-green-700 uppercase tracking-widest shadow-sm">
           Rajasthan · 4 Fields · 5.2 Ha
        </div>
      </div>

      <div className="flex gap-4 mt-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase">
          <span className="w-2 h-2 rounded bg-green-500"></span> Healthy
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase">
          <span className="w-2 h-2 rounded bg-red-500"></span> Alert
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase">
          <span className="w-2 h-2 rounded bg-amber-500"></span> Monitor
        </div>
      </div>
    </div>
  );
};

export default FarmMiniMap;
