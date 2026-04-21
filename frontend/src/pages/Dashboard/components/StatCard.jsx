import React from 'react';

const StatCard = ({ icon, value, label, subValue, trend, colorClass }) => {
  const isUp = trend === 'up';
  
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#cde4c6] shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start">
        <div className="text-2xl mb-3 bg-gray-50 w-11 h-11 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {trend && (
          <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${isUp ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
            {isUp ? '↑ GAIN' : '↓ WATCH'}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-[#777] text-[10px] font-bold uppercase tracking-wider mb-2">{label}</h3>
        <p className="text-2xl font-black text-[#111] leading-none mb-2">{value}</p>
        <p className={`text-[11px] font-bold ${colorClass || 'text-[#1a8a4a]'}`}>{subValue}</p>
      </div>
    </div>
  );
};

export default StatCard;
