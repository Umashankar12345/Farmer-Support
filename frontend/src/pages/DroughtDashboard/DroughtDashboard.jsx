// src/pages/DroughtDashboard/DroughtDashboard.jsx
import React, { useState, useEffect } from 'react';
import { CloudRain, AlertTriangle, Droplets, ArrowRight } from 'lucide-react';
import SearchFilters from './components/SearchFilters';
import DroughtMap from './components/DroughtMap';
import AlertCards from './components/AlertCards';
import ActionSuggestions from './components/ActionSuggestions';

const DroughtDashboard = () => {
  const [filters, setFilters] = useState({
    location: 'All India',
    crop: 'All Crops',
    timePeriod: 'Last 30 days',
    rainfallLevel: 'All',
    soilMoisture: 'All',
    reservoirStatus: 'All'
  });

  const [droughtData, setDroughtData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDroughtData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockData = {
      riskLevel: 'Medium',
      rainfallDeficit: '-35%',
      soilMoisture: '42%',
      reservoirLevel: '58%',
      affectedAreas: [
        { name: 'Rajasthan', risk: 'High', color: '#e74c3c' },
        { name: 'Maharashtra', risk: 'Medium', color: '#f39c12' },
        { name: 'Karnataka', risk: 'Low', color: '#27ae60' },
        { name: 'Punjab', risk: 'Low', color: '#27ae60' }
      ],
      predictions: [
        { week: 'Week 1', risk: 'Medium' },
        { week: 'Week 2', risk: 'High' },
        { week: 'Week 3', risk: 'High' }
      ]
    };

    const mockAlerts = [
      {
        id: 1,
        type: 'high',
        title: '⚠️ Severe Rainfall Deficit',
        message: 'Rainfall 45% below average in Rajasthan',
        time: '2 hours ago',
        action: 'Consider alternative crops'
      },
      {
        id: 2,
        type: 'medium',
        title: '🌡️ Soil Moisture Alert',
        message: 'Soil moisture below 40% in 3 districts',
        time: '5 hours ago',
        action: 'Initiate water conservation measures'
      },
      {
        id: 3,
        type: 'low',
        title: '💧 Reservoir Status',
        message: 'Major reservoirs at 58% capacity',
        time: '1 day ago',
        action: 'Schedule irrigation efficiently'
      }
    ];

    setDroughtData(mockData);
    setAlerts(mockAlerts);
    setLoading(false);
  };

  useEffect(() => {
    fetchDroughtData();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchDroughtData();
  };

  return (
    <div className="min-h-screen p-6 bg-amber-50/50">
      <header className="mb-8 text-center bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
        <h1 className="text-3xl font-bold text-orange-700 mb-2 flex items-center justify-center gap-3">
          <AlertTriangle className="text-orange-600" size={32} /> Drought Dashboard
        </h1>
        <p className="text-orange-800/70 text-lg">Early risk alerts & planning for drought conditions</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] gap-6">
        <div className="flex flex-col gap-6">
          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            loading={loading}
          />
          <AlertCards alerts={alerts} loading={loading} />
        </div>

        <div className="flex flex-col gap-6">
          <DroughtMap data={droughtData} filters={filters} loading={loading} />
        </div>

        <div className="flex flex-col gap-6">
          <ActionSuggestions droughtData={droughtData} filters={filters} loading={loading} />

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Alert Notifications
            </h3>
            <div className="space-y-4">
              {[
                { label: 'SMS Alerts', defaultChecked: false },
                { label: 'App Notifications', defaultChecked: true },
                { label: 'Email Reports', defaultChecked: false }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultChecked} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroughtDashboard;