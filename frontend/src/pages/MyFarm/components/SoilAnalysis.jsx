import React from 'react';

const SOIL_PARAMS = [
    { name: 'Nitrogen', value: 78, unit: 'kg/ha', optimal: '60-90' },
    { name: 'Phosphorus', value: 42, unit: 'kg/ha', optimal: '30-50' },
    { name: 'Potassium', value: 89, unit: 'kg/ha', optimal: '80-120' },
    { name: 'pH Level', value: 6.8, unit: 'idx', optimal: '6.5-7.5', isBar: false },
    { name: 'Organic Carbon', value: 0.65, unit: '%', optimal: '0.5-0.8' },
    { name: 'Moisture', value: 24, unit: '%', optimal: '20-30' },
    { name: 'Zinc', value: 1.2, unit: 'ppm', optimal: '1.0-2.0' },
];

export default function SoilAnalysis({ farmId, farmName, onClose }) {
  const getColor = (val, param) => {
    if (param === 'pH Level') return val >= 6.5 && val <= 7.5 ? 'text-green-500' : 'text-amber-500';
    if (val >= 70) return 'bg-green-500';
    if (val >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-green-100 transition-colors"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{farmName}</h3>
          <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-1">Live Soil Health Card</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400">✕</button>
      </div>

      <div className="space-y-4 relative z-10">
        {SOIL_PARAMS.map((param, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="flex justify-between items-end mb-1.5 px-0.5">
              <span className="text-xs font-bold text-gray-700">{param.name}</span>
              <div className="flex items-baseline gap-1">
                 <span className={`text-sm font-black ${param.name === 'pH Level' ? getColor(param.value, param.name) : 'text-gray-900'}`}>{param.value}</span>
                 <span className="text-[8px] text-gray-400 font-bold uppercase">{param.unit}</span>
              </div>
            </div>
            {param.isBar !== false && (
              <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-1000 ${getColor(param.value, param.name)}`}
                  style={{ width: `${(param.value / 100) * 100}%` }}
                />
              </div>
            )}
            <p className="text-[8px] text-gray-400 mt-1 px-1 tracking-tighter">Optimal Range: {param.optimal} {param.unit}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-900 rounded-2xl relative z-10">
         <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-2">AI Advisory</p>
         <p className="text-xs text-gray-300 leading-relaxed font-medium">Nitrogen levels optimal for current growth stage. Slight Zinc deficiency detected — consider foliar spray recommendation from AI Query tool.</p>
         <button className="mt-4 w-full py-2 bg-green-500 text-white text-[10px] font-black uppercase rounded-lg hover:bg-green-600 transition-colors">Download PDF Report</button>
      </div>
    </div>
  );
}
