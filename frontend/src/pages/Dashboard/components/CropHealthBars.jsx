import React, { useEffect, useState } from 'react';

// Health values fluctuate every 6s simulating live sensor data
export default function CropHealthBars({ liveData = [] }) {
  const [health, setHealth] = useState(liveData);

  useEffect(() => {
    if (liveData.length === 0) {
      // Initialize with demo data if none provided
      const demoData = [
        { name: 'Wheat (Raj-3077)', score: 88, zone: 'A1' },
        { name: 'Mustard (Pusa)', score: 72, zone: 'B2' },
        { name: 'Millet (Bajra)', score: 91, zone: 'C1' },
        { name: 'Chickpea', score: 64, zone: 'D4' }
      ];
      setHealth(demoData);
    } else {
      setHealth(liveData);
    }
  }, [liveData]);

  useEffect(() => {
    const id = setInterval(() => {
      setHealth(prev => prev.map(crop => ({
        ...crop,
        score: Math.max(55, Math.min(99,
          crop.score + (Math.random() - 0.5) * 2
        ))
      })));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const getColor = s => s >= 80 ? 'bg-green-500' : s >= 65 ? 'bg-yellow-500' : 'bg-red-500';
  const getTextColor = s => s >= 80 ? 'text-green-600' : s >= 65 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span>🌿</span> Crop Health Index
        </h3>
        <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase tracking-tighter">AI Analyzed</span>
      </div>

      <div className="space-y-6">
        {health.map((crop, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">{crop.name}</span>
                <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded uppercase">Zone {crop.zone}</span>
              </div>
              <strong className={`text-sm ${getTextColor(crop.score)}`}>{crop.score.toFixed(1)}%</strong>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-1000 ${getColor(crop.score)}`}
                style={{ width: `${crop.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
