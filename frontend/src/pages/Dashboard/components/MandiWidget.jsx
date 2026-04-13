import React from 'react';

const MandiWidget = ({ prices = [] }) => {
  const demoPrices = [
    { crop: 'Wheat', mandi: 'Jaipur', price: '₹2,080', trend: '▲ +1.2%' },
    { crop: 'Mustard', mandi: 'Alwar', price: '₹5,280', trend: '▲ +2.4%' },
    { crop: 'Rice', mandi: 'Kota', price: '₹2,050', trend: '▼ -0.8%' }
  ];

  const activePrices = prices.length > 0 ? prices : demoPrices;

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Mandi Prices</h3>
        <span className="bg-green-50 text-green-600 text-[10px] font-bold px-1.5 py-0.5 rounded">eNAM</span>
      </div>
      <div className="divide-y divide-gray-50">
        {activePrices.map((p, i) => (
          <div key={i} className="flex justify-between items-center py-2.5 group">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-green-50 transition-colors">🌾</div>
               <div>
                  <p className="text-xs font-bold text-gray-900">{p.crop}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">{p.mandi}</p>
               </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-gray-900">{p.price}</p>
              <p className={`text-[9px] font-bold ${p.trend.includes('▲') ? 'text-green-500' : 'text-red-500'}`}>{p.trend}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MandiWidget;
