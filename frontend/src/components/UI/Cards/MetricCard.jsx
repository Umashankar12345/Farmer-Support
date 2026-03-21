// src/components/UI/Cards/MetricCard.jsx
import React from 'react';

const MetricCard = ({ title, value, unit, change, color, loading }) => {
  const getColorClass = () => {
    switch(color) {
      case 'green': return 'bg-green-50 border-green-200 text-green-700';
      case 'blue': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'red': return 'bg-red-50 border-red-200 text-red-700';
      case 'orange': return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'cyan': return 'bg-cyan-50 border-cyan-200 text-cyan-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getTrendIcon = () => {
    if (!change) return null;
    const isPositive = change > 0;
    return (
      <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '↗' : '↘'} {Math.abs(change)}%
      </span>
    );
  };

  if (loading) {
    return (
      <div className="metric-card animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <div className={`metric-card ${getColorClass()} rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {getTrendIcon()}
      </div>
      
      <div className="flex items-baseline mb-2">
        <span className="text-3xl font-bold">{value}</span>
        {unit && <span className="text-sm text-gray-500 ml-2">{unit}</span>}
      </div>
      
      <div className="text-sm text-gray-600 mt-2">
        {change !== undefined && (
          <span className={`inline-flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? 'Increased' : 'Decreased'} by {Math.abs(change)}% from last period
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;