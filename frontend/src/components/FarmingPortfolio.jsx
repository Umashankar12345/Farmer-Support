import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine } from "recharts";
import { portfolioAPI } from '../services/api';

export default function FarmingPortfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);
  const [activeFarmForLog, setActiveFarmForLog] = useState(null);
  const [logForm, setLogForm] = useState({ type: 'Irrigation', description: '' });

  const loadData = () => {
    portfolioAPI.getPortfolio()
      .then((resData) => {
        // Inject dummy data if soilTrends is missing so chart renders
        if (!resData.soilTrends || resData.soilTrends.length === 0) {
          resData.soilTrends = [
            { month: 'Jan', N: 40, targetN: 60, P: 20, K: 30 },
            { month: 'Feb', N: 45, targetN: 60, P: 22, K: 35 },
            { month: 'Mar', N: 55, targetN: 60, P: 25, K: 38 },
            { month: 'Apr', N: 58, targetN: 60, P: 28, K: 40 },
          ];
        }
        setData(resData);
        setLoading(false);
        // Dispatch active farm to localStorage for AI context
        if (resData.farms && resData.farms.length > 0) {
          const firstFarm = resData.farms[0];
          localStorage.setItem('activeFarmContext', JSON.stringify({
            farmName: firstFarm.name,
            crop: firstFarm.currentCrop,
            location: firstFarm.location,
            cropStage: firstFarm.cropStage,
            soilNPK: firstFarm.soilMetrics,
            lastAction: firstFarm.actionLogs?.length > 0 ? firstFarm.actionLogs[firstFarm.actionLogs.length - 1].description : "No recent actions"
          }));
        }
      })
      .catch((err) => {
        console.error("Error loading portfolio:", err);
        // Set dummy data to prevent empty white box in demo
        setData({
          farms: [],
          soilTrends: [
            { month: 'Jan', N: 40, targetN: 60, P: 20, K: 30 },
            { month: 'Feb', N: 45, targetN: 60, P: 22, K: 35 },
            { month: 'Mar', N: 55, targetN: 60, P: 25, K: 38 },
            { month: 'Apr', N: 58, targetN: 60, P: 28, K: 40 },
          ],
          aiTasks: []
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogAction = async (e) => {
    e.preventDefault();
    if (!activeFarmForLog) return;
    try {
      await portfolioAPI.logAction(activeFarmForLog, logForm);
      setShowLogModal(false);
      setLogForm({ type: 'Irrigation', description: '' });
      loadData(); // reload data to show new logs
    } catch (err) {
      console.error("Error logging action:", err);
    }
  };

  const handleTaskStatus = async (fieldId, taskId, status) => {
    try {
      await portfolioAPI.updateTask(fieldId, taskId, { status });
      loadData();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading Portfolio Data...</div>;

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Farming Portfolio</h1>
          <p className="text-sm text-emerald-600 font-semibold">
            MANAGING {data?.activeFieldsCount} ACTIVE FIELDS
          </p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition">
          + REGISTER NEW FARM
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {data?.farms.map((farm) => (
          <div key={farm.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition relative">
            <button 
              onClick={() => { setActiveFarmForLog(farm.id); setShowLogModal(true); }}
              className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1 text-xs font-bold rounded shadow-sm border border-emerald-200"
            >
              + Log Action
            </button>
            <div className="flex justify-between items-start mb-2 mt-2">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{farm.name}</h3>
                <p className="text-xs text-gray-500">{farm.location} • {farm.areaAcres} Acres</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
                {farm.cropStage}
              </span>
            </div>
            
            <div className="mt-4 grid grid-cols-4 gap-2 text-center bg-slate-50 p-3 rounded-lg text-xs font-medium">
              <div><span className="block text-gray-400">Crop</span><span className="text-gray-800 font-bold">{farm.currentCrop}</span></div>
              <div><span className="block text-gray-400">N</span><span className="text-emerald-600 font-bold">{farm.soilMetrics.N}</span></div>
              <div><span className="block text-gray-400">P</span><span className="text-emerald-600 font-bold">{farm.soilMetrics.P}</span></div>
              <div><span className="block text-gray-400">K</span><span className="text-emerald-600 font-bold">{farm.soilMetrics.K}</span></div>
            </div>
            
            {farm.actionLogs && farm.actionLogs.length > 0 && (
               <div className="mt-3 text-[10px] text-gray-500 italic border-t pt-2 mt-2">
                 Last Action: {farm.actionLogs[farm.actionLogs.length - 1].description}
               </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
            Soil Health Trends (Recommended vs Actual)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.soilTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <ReferenceLine y={60} label="Target N" stroke="#10b981" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="N" stroke="#10b981" strokeWidth={2} name="Actual N" />
                <Line type="monotone" dataKey="targetN" stroke="#10b981" strokeWidth={1} strokeDasharray="3 3" name="Target N (Optimum)" />
                <Line type="monotone" dataKey="P" stroke="#3b82f6" strokeWidth={2} name="Actual P" />
                <Line type="monotone" dataKey="K" stroke="#f59e0b" strokeWidth={2} name="Actual K" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm overflow-y-auto max-h-80">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
            Awaiting Action (AI Task Triggers)
          </h2>
          <div className="space-y-3">
            {data?.actionableTasks.length === 0 && (
              <p className="text-sm text-gray-500">All caught up! No pending tasks.</p>
            )}
            {data?.actionableTasks.map((task) => (
              <div key={task.id} className="task-card flex items-center justify-between p-3 border border-amber-200 bg-amber-50 rounded text-xs">
                <div className="pr-2">
                  <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-bold mb-1 inline-block">
                    {task.type} • {task.priority}
                  </span>
                  <p className="text-amber-900 font-medium">{task.message}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => handleTaskStatus(task.fieldId, task.id, 'done')} className="px-3 py-1 text-[10px] bg-green-600 text-white font-bold rounded shadow-sm hover:bg-green-700">Mark Done</button>
                  <button onClick={() => handleTaskStatus(task.fieldId, task.id, 'snoozed')} className="px-3 py-1 text-[10px] border border-gray-300 text-gray-600 bg-white font-bold rounded hover:bg-gray-50">Snooze</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showLogModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Log Field Action</h2>
            <form onSubmit={handleLogAction}>
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 mb-1">Action Type</label>
                <select className="w-full border rounded p-2 text-sm" value={logForm.type} onChange={e => setLogForm({...logForm, type: e.target.value})}>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Pest Control">Pest Control</option>
                  <option value="Harvest">Harvest</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <input type="text" required className="w-full border rounded p-2 text-sm" placeholder="e.g. Watered 2 hours via drip" value={logForm.description} onChange={e => setLogForm({...logForm, description: e.target.value})} />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowLogModal(false)} className="px-4 py-2 text-gray-600 border rounded text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded text-sm">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
