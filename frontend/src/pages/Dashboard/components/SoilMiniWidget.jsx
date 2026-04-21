import React from 'react';

const SoilMiniWidget = ({ data = {} }) => {
  const getStatusClass = (val) => {
    if (val === 'Low') return 'bg-red-50 text-red-700 border-red-100';
    if (val === 'Med') return 'bg-amber-50 text-amber-700 border-amber-100';
    if (val === 'High') return 'bg-green-50 text-green-700 border-green-100';
    return 'bg-blue-50 text-blue-700 border-blue-100';
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-[#cde4c6] shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[#14301f] text-[12px] font-extrabold uppercase flex items-center gap-2">
          🧪 Soil Health Card
        </h4>
        <span className="text-[10px] text-[#1a7a3a] font-bold">soilhealth.dac.gov.in</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Nitrogen (N)', val: data.N },
          { label: 'Phosphorus (P)', val: data.P },
          { label: 'Potassium (K)', val: data.K },
          { label: 'pH Level', val: data.pH },
        ].map((item, idx) => (
          <div key={idx} className="group">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-1">
              {item.label}
            </p>
            <div className={`text-[12px] font-black px-3 py-1.5 rounded-lg border inline-block w-full text-center ${getStatusClass(item.val)}`}>
              {item.val || '--'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoilMiniWidget;
