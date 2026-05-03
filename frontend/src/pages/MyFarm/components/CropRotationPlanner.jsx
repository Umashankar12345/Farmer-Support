import React, { useState } from 'react';

export default function CropRotationPlanner({ farm }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const soilType = farm.soilType || 'Mixed';
  const currentCrop = farm.crop || 'Unknown';

  const generateSuggestion = () => {
    setAnalyzing(true);
    setTimeout(() => {
      // Mock AI logic based on soil type and current crop
      let nextCrop = 'Legumes (Nitrogen Fixing)';
      let reason = `Since you grew ${currentCrop}, the soil needs nitrogen replenishment.`;
      
      if (currentCrop.toLowerCase().includes('legume')) {
        nextCrop = 'Wheat or Corn';
        reason = `The soil is rich in nitrogen from ${currentCrop}, perfect for heavy feeders.`;
      }
      
      setSuggestion({ nextCrop, reason, aiConfidence: 94 });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-[#14301f] to-[#1a402a] p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 opacity-10 -mr-16 -mt-16 rounded-full"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-[14px] font-black uppercase tracking-widest flex items-center gap-2">
          <span>🤖</span> AI Rotation Planner
        </h3>
      </div>

      <div className="mb-6 relative z-10">
        <div className="flex gap-4">
          <div className="flex-1 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <div className="text-[8px] font-black text-green-300 uppercase tracking-widest mb-1">Soil Type</div>
            <div className="text-sm font-bold">{soilType}</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <div className="text-[8px] font-black text-green-300 uppercase tracking-widest mb-1">Last Crop</div>
            <div className="text-sm font-bold">{currentCrop}</div>
          </div>
        </div>
      </div>

      {analyzing ? (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin mb-3"></div>
          <div className="text-[10px] font-black uppercase tracking-widest text-green-300 animate-pulse">Running Soil Models...</div>
        </div>
      ) : suggestion ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-green-400/30">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[10px] font-black text-green-300 uppercase tracking-widest">Recommended Next Crop</div>
            <div className="text-[9px] font-black bg-green-500/20 text-green-300 px-2 py-1 rounded border border-green-500/30">
              {suggestion.aiConfidence}% Match
            </div>
          </div>
          <div className="text-xl font-black text-white mb-2">{suggestion.nextCrop}</div>
          <p className="text-[11px] font-medium text-green-100/80 leading-relaxed italic border-l-2 border-green-400 pl-3">
            "{suggestion.reason}"
          </p>
        </div>
      ) : (
        <button 
          onClick={generateSuggestion}
          className="w-full py-4 bg-green-500 hover:bg-green-400 text-gray-900 font-black uppercase tracking-widest text-[11px] rounded-xl transition-all shadow-lg shadow-green-500/20"
        >
          Generate Season Plan
        </button>
      )}
    </div>
  );
}
