import React from 'react';

const StatCard = ({ icon, value, label, change, trend, progress }) => {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group overflow-hidden relative">
      <div className={`absolute top-0 left-0 w-full h-1 ${trend === 'up' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
      <div className="flex justify-between items-start mb-4">
        <div className="text-3xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {change && (
          <span className={`text-sm font-medium ${trendColor}`}>
            {change} {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{label}</h3>
        <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
      </div>
      {progress !== undefined && (
        <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-green-500 h-1.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
