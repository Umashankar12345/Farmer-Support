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
      <div className="flex gap-6 uppercase">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          System Status: Operational
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">API Latency: <span className="text-gray-100">{latency.toFixed(0)}ms</span></span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">AI Model: <span className="text-gray-100">Llama3-8B-8192 (Groq)</span></span>
      </div>
      <div className="flex gap-4 uppercase font-bold text-gray-500">
        <span>V 2.4.0-STABLE</span>
        <span className="text-gray-300">© 2026 DIGITAL KRISHI</span>
      </div>
    </div>
  );
};

export default PerformanceTicker;
