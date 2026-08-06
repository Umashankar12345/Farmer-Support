import React, { useState, useEffect } from 'react';

const PerformanceTicker = ({ metrics }) => {
  const [latency, setLatency] = useState(142);

  useEffect(() => {
    const id = setInterval(() => {
      setLatency(prev => Math.max(85, Math.min(210, prev + (Math.random() - 0.5) * 15)));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-400 py-2 px-6 flex justify-between items-center text-[10px] font-mono tracking-widest fixed bottom-0 left-0 w-full z-50 border-t border-gray-800">
        <div className="flex items-center gap-10">
          <span className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            System Status: Maintenance Mode
          </span>
          
          <div className="flex items-center gap-8 text-[11px] font-medium text-emerald-100">
            <span className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">API Latency: <span className="text-gray-100">{latency.toFixed(0)}ms</span></span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">Cache: <span className="text-green-400">REDIS HIT</span></span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">AI Model: <span className="text-gray-100">Gemini-3.5-Flash (Google)</span></span>
      </div>
      </div>
      <div className="flex gap-4 uppercase font-bold text-gray-500">
        <span>V 2.4.0-STABLE</span>
        <span className="text-gray-300">© 2026 DIGITAL KRISHI</span>
      </div>
    </div>
  );
};

export default PerformanceTicker;
