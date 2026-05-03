import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ActiveCropTracker from './components/ActiveCropTracker';
import ExpenseTracker from './components/ExpenseTracker';
import CropRotationPlanner from './components/CropRotationPlanner';
import FarmReminders from './components/FarmReminders';

export default function FarmDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farm, setFarm] = useState(null);

  useEffect(() => {
    const savedFarms = localStorage.getItem('krishi_farms');
    if (savedFarms) {
      const farms = JSON.parse(savedFarms);
      const found = farms.find(f => f.id === id);
      if (found) setFarm(found);
      else {
        // Fallback to mock data if not found in localstorage but in initial mock
        const mockFarms = [
          { id: '1', crop: 'Mustard', name: 'North Plot', location: 'Jaipur', acres: '10', soilType: 'Sandy', health: 92, status: 'Vegetative', growth: 65 },
          { id: '2', crop: 'Wheat', name: 'South Field', location: 'Sikar', acres: '5', soilType: 'Loamy', health: 88, status: 'Flowering', growth: 40 },
          { id: '3', crop: 'Millet', name: 'East Plot', location: 'Alwar', acres: '3', soilType: 'Clay', health: 95, status: 'Harvesting', growth: 98 }
        ];
        const m = mockFarms.find(f => f.id === id);
        if (m) setFarm(m);
        else navigate('/farms');
      }
    }
  }, [id, navigate]);

  if (!farm) return <div className="p-8 text-center text-gray-500 font-bold uppercase">Loading Farm Data...</div>;

  return (
    <div className="relative pb-12">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <button onClick={() => navigate('/farms')} className="text-[11px] font-bold text-green-600 mb-2 uppercase tracking-widest hover:underline">
            ← Back to Portfolio
          </button>
          <div className="text-3xl font-black text-gray-900">{farm.name || farm.crop || 'Unnamed Farm'}</div>
          <div className="text-xs text-gray-500 mt-1 font-bold uppercase tracking-widest flex items-center gap-2">
            <span>📍 {farm.location || 'Unknown Location'}</span>
            <span>•</span>
            <span>📐 {farm.acres || farm.area} {farm.acres ? 'Acres' : ''}</span>
            <span>•</span>
            <span>🪨 {farm.soilType || 'Mixed'} Soil</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Health Score</div>
            <div className="text-2xl font-black text-green-600">{farm.health || 85}%</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ActiveCropTracker farm={farm} />
          <ExpenseTracker farm={farm} />
        </div>
        <div className="space-y-6">
          <CropRotationPlanner farm={farm} />
          <FarmReminders farm={farm} />
        </div>
      </div>
    </div>
  );
}
