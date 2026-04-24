import React from 'react';

const CropHealthBars = ({ crops = [], stateName = '' }) => {
  const getProgressColor = (pct) => {
    if (pct >= 85) return 'bg-[#16a34a]';
    if (pct >= 70) return 'bg-[#d97706]';
    return 'bg-[#dc2626]';
  };

  const getTextColor = (pct) => {
    if (pct >= 85) return 'text-[#16a34a]';
    if (pct >= 70) return 'text-[#d97706]';
    return 'text-[#dc2626]';
  };

  return (
    <div className="glass-card p-5 rounded-2xl border border-white/40 hover-lift transition-all">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-[#14301f] text-[13px] font-extrabold flex items-center gap-2">
          🌿 Crop Health Index — <span className="text-[#1a8a4a]">{stateName}</span>
        </h4>
        <span className="text-[9.5px] bg-[#e0f5e7] text-[#1a7a3a] px-2 py-1 rounded-md font-bold uppercase tracking-wider">
          AI ANALYSED
        </span>
      </div>

      <div className="space-y-4">
        {crops.map((crop, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-end mb-1.5">
              <div>
                <span className="text-[12px] font-bold text-gray-800">{crop.n}</span>
                <span className="text-[10.5px] text-gray-400 font-medium ml-2">{crop.z}</span>
              </div>
              <span className={`text-[12px] font-black ${getTextColor(crop.p)}`}>
                {crop.p}%
              </span>
            </div>
            <div className="h-[7px] bg-[#e8ede6] rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ease-out rounded-full ${getProgressColor(crop.p)}`}
                style={{ width: `${crop.p}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropHealthBars;
