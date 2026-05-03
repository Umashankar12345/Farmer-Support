import React from 'react';

export default function ActiveCropTracker({ farm }) {
  const crop = farm.crop || 'Unknown';
  const growth = farm.growth || 0;
  const status = farm.status || 'Vegetative';

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[14px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
          <span>🌱</span> Active Crop Tracker
        </h3>
        <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase rounded tracking-widest border border-green-100">
          {status} Stage
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Crop</div>
          <div className="text-lg font-black text-gray-900">{crop}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Sown Date</div>
          <div className="text-sm font-bold text-gray-700">12 Aug 2023</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Est. Harvest</div>
          <div className="text-sm font-bold text-gray-700">05 Dec 2023</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Growth</div>
          <div className="text-lg font-black text-green-600">{growth}%</div>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
          <span>Seedling</span>
          <span>Vegetative</span>
          <span>Flowering</span>
          <span>Maturation</span>
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${growth}%` }}
          />
        </div>
      </div>
    </div>
  );
}
