import React from 'react';

const SoilMiniWidget = () => {
  const params = [
    { label: 'Nitrogen', val: 'Low', color: 'bg-red-500', w: '42%' },
    { label: 'Phosphorus', val: 'Med', color: 'bg-yellow-500', w: '70%' },
    { label: 'Potassium', val: 'High', color: 'bg-green-500', w: '88%' },
    { label: 'pH Level', val: '6.8', color: 'bg-blue-500', w: '62%' }
  ];

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Soil Health</h3>
        <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-1.5 py-0.5 rounded">Jan 2025</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {params.map((p, i) => (
          <div key={i} className="flex flex-col gap-1">
             <div className="flex justify-between items-center">
                <span className="text-[9px] text-gray-400 font-bold uppercase">{p.label}</span>
                <span className="text-[10px] font-black text-gray-900">{p.val}</span>
             </div>
             <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                <div className={`h-full ${p.color} transition-all duration-1000`} style={{ width: p.w }}></div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoilMiniWidget;
