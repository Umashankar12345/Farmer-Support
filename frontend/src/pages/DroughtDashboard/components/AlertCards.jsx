// src/pages/DroughtDashboard/components/AlertCards.jsx
import React from 'react';
import { AlertTriangle, Clock, Activity } from 'lucide-react';

const AlertCards = ({ alerts, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const getAlertStyles = (type) => {
    switch (type) {
      case 'high': return 'bg-red-50 border-red-200 text-red-900 border-l-4 border-l-red-500';
      case 'medium': return 'bg-orange-50 border-orange-200 text-orange-900 border-l-4 border-l-orange-500';
      case 'low': return 'bg-green-50 border-green-200 text-green-900 border-l-4 border-l-green-500';
      default: return 'bg-gray-50 border-gray-200 text-gray-900 border-l-4 border-l-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <AlertTriangle className="text-red-500" /> Active Alerts
      </h3>
      <div className="space-y-3">
        {alerts.map(alert => (
          <div key={alert.id} className={`p-4 rounded-lg border shadow-sm transition-transform hover:-translate-y-0.5 ${getAlertStyles(alert.type)}`}>
            <div className="flex justify-between items-start mb-1">
              <div className="font-bold text-base">{alert.title}</div>
              {alert.type === 'high' && <span className="animate-pulse w-2 h-2 rounded-full bg-red-600"></span>}
            </div>
            <div className="text-sm mb-3 opacity-90">{alert.message}</div>
            <div className="flex justify-between items-center text-xs opacity-80 pt-2 border-t border-black/5">
              <span className="flex items-center gap-1 font-medium"><Clock size={12} /> {alert.time}</span>
              <span className="font-bold flex items-center gap-1"><Activity size={12} /> {alert.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertCards;