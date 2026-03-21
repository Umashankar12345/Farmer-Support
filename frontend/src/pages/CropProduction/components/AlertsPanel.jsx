// src/pages/CropProduction/components/AlertsPanel.jsx
import React from 'react';
import { AlertCircle, AlertTriangle, Flame, Info, Megaphone, CheckCircle } from 'lucide-react';

const AlertsPanel = ({ alerts, loading }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="text-yellow-600" size={20} />;
      case 'danger': return <Flame className="text-red-600" size={20} />;
      case 'info': return <Info className="text-blue-600" size={20} />;
      default: return <Megaphone className="text-gray-600" size={20} />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      case 'danger': return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'info': return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      default: return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <AlertCircle className="text-red-500" /> Alerts & Recommendations
      </h3>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {alerts?.length > 0 ? (
          alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-colors cursor-default ${getAlertColor(alert.type)}`}
            >
              <div className="flex gap-3">
                <div className="shrink-0 mt-0.5">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 leading-snug">{alert.message}</p>
                  <div className="text-xs text-gray-500 mt-2 font-medium">{alert.time}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 flex flex-col items-center">
            <CheckCircle className="text-green-500 mb-2" size={32} />
            No new alerts
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;