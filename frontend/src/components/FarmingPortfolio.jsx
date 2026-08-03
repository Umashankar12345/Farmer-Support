import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { portfolioAPI } from '../../services/api';

export default function FarmingPortfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend endpoint
    portfolioAPI.getPortfolio()
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading portfolio:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading Portfolio Data...</div>;

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Farming Portfolio</h1>
          <p className="text-sm text-emerald-600 font-semibold">
            MANAGING {data.activeFieldsCount} ACTIVE FIELDS
          </p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition">
          + REGISTER NEW FARM
        </button>
      </div>

      {/* 1. Active Fields Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {data.farms.map((farm) => (
          <div key={farm.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{farm.name}</h3>
                <p className="text-xs text-gray-500">{farm.location} • {farm.areaAcres} Acres</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
                Health: {farm.healthScore}%
              </span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center bg-slate-50 p-3 rounded-lg text-xs font-medium">
              <div><span className="block text-gray-400">Crop</span><span className="text-gray-800 font-bold">{farm.currentCrop}</span></div>
              <div><span className="block text-gray-400">N</span><span className="text-emerald-600 font-bold">{farm.soilMetrics.N}</span></div>
              <div><span className="block text-gray-400">P</span><span className="text-emerald-600 font-bold">{farm.soilMetrics.P}</span></div>
              <div><span className="block text-gray-400">K</span><span className="text-emerald-600 font-bold">{farm.soilMetrics.K}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Soil History & Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Soil Health Trends Graph (Takes 2 Columns) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
            Soil Health Trends (NPK & pH Over Time)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.soilTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="N" stroke="#10b981" strokeWidth={2} name="Nitrogen (N)" />
                <Line type="monotone" dataKey="P" stroke="#3b82f6" strokeWidth={2} name="Phosphorus (P)" />
                <Line type="monotone" dataKey="K" stroke="#f59e0b" strokeWidth={2} name="Potassium (K)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Awaiting Actions Widget */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
            Awaiting Action (AI Task Triggers)
          </h2>
          <div className="space-y-3">
            {data.actionableTasks.map((task) => (
              <div key={task.id} className="p-3 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-amber-900">{task.type}</span>
                  <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                    {task.priority}
                  </span>
                </div>
                <p className="text-gray-700">{task.message}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
