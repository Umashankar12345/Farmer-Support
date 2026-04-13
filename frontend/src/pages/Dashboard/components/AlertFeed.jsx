import React from 'react';

const AlertFeed = ({ alerts = [] }) => {
  const demoAlerts = [
    { type: 'danger', icon: '🚨', message: 'Frost Warning: Temp expected to drop to 2°C tonight. Cover mustard seedlings.', time: '10m ago' },
    { type: 'warning', icon: '🐛', message: 'Pest Notice: Fall Armyworm detected in nearby zone C3. Inspect wheat base.', time: '2h ago' },
    { type: 'info', icon: '💧', message: 'Irrigation scheduled for Farm 01 at 05:00 AM based on soil moisture.', time: '4h ago' }
  ];

  const activeAlerts = alerts.length > 0 ? alerts : demoAlerts;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span>🔔</span> Smart Alerts
        </h3>
        <button className="text-xs text-blue-600 font-semibold hover:underline">Mark all read</button>
      </div>

      <div className="space-y-4">
        {activeAlerts.map((alert, idx) => (
          <div key={idx} className={`flex gap-4 p-4 rounded-xl border ${
            alert.type === 'danger' ? 'bg-red-50 border-red-100' : 
            alert.type === 'warning' ? 'bg-amber-50 border-amber-100' : 'bg-blue-50 border-blue-100'
          } hover:scale-[1.02] transition-transform cursor-pointer`}>
            <div className="text-2xl pt-1">{alert.icon}</div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className={`text-sm font-medium ${
                  alert.type === 'danger' ? 'text-red-900' : 
                  alert.type === 'warning' ? 'text-amber-900' : 'text-blue-900'
                }`}>
                  {alert.message}
                </p>
                <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap ml-2 uppercase tracking-tighter">{alert.time}</span>
              </div>
              <div className="mt-2 flex gap-2">
                <button className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  alert.type === 'danger' ? 'bg-red-200 text-red-700' : 
                  alert.type === 'warning' ? 'bg-amber-200 text-amber-700' : 'bg-blue-200 text-blue-700'
                }`}>Take Action</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertFeed;
