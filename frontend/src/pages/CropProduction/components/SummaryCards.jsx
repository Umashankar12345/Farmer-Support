// src/pages/CropProduction/components/SummaryCards.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards = ({ summary, loading }) => {
  const cards = [
    {
      id: 'total-production',
      title: 'Total Production',
      value: summary?.totalProduction || '0',
      unit: 'tons',
      change: summary?.productionChange || 0,
      color: 'green',
      icon: '🌾'
    },
    {
      id: 'avg-yield',
      title: 'Avg Yield',
      value: summary?.avgYield || '0',
      unit: 'quintals/acre',
      change: summary?.yieldChange || 0,
      color: 'blue',
      icon: '📊'
    },
    {
      id: 'yield-growth',
      title: 'Yield Growth',
      value: summary?.yieldGrowth || '0',
      unit: '',
      change: summary?.growthChange || 0,
      color: summary?.yieldGrowth && parseFloat(summary.yieldGrowth) > 0 ? 'green' : 'red',
      icon: '📈'
    },
    {
      id: 'loss-estimation',
      title: 'Loss Estimation',
      value: summary?.lossEstimation || '0',
      unit: 'tons',
      change: summary?.lossChange || 0,
      color: 'orange',
      icon: '⚠️'
    },
    {
      id: 'water-used',
      title: 'Water Used',
      value: summary?.waterUsed || '0',
      unit: 'liters/acre',
      change: summary?.waterChange || 0,
      color: 'cyan',
      icon: '💧'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-white rounded-xl border p-5 animate-pulse shadow-sm h-32">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map(card => (
        <div
          key={card.id}
          className={`bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group ${card.color === 'green' ? 'border-l-4 border-green-500' :
              card.color === 'blue' ? 'border-l-4 border-blue-500' :
                card.color === 'red' ? 'border-l-4 border-red-500' :
                  card.color === 'orange' ? 'border-l-4 border-orange-500' :
                    'border-l-4 border-cyan-500'
            }`}
        >
          <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">
            {card.icon}
          </div>

          <div className="flex justify-between items-start mb-2 relative z-10">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{card.title}</h3>
          </div>

          <div className="flex items-baseline mb-3 relative z-10">
            <span className="text-2xl font-bold text-gray-900">{card.value}</span>
            {card.unit && <span className="text-xs text-gray-500 ml-1 font-medium">{card.unit}</span>}
          </div>

          {card.change !== undefined && card.change !== 0 && (
            <div className="flex items-center gap-1 text-xs font-medium relative z-10">
              <span className={`flex items-center gap-0.5 ${String(card.change).includes('+') || parseFloat(card.change) > 0 ? 'text-green-600' : 'text-red-500'
                }`}>
                {String(card.change).includes('+') || parseFloat(card.change) > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {card.change}
              </span>
              <span className="text-gray-400">vs last year</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;