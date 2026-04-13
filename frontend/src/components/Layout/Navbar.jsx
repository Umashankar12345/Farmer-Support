import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [time, setTime] = useState(new Date());
  const [insightIdx, setInsightIdx] = useState(0);

  const insights = [
    "Tip: High moisture detected, skip morning irrigation for Farm A.",
    "Alert: PM-KISAN 16th installment credited to your account.",
    "Forecast: 80% chance of light rain tomorrow evening.",
    "Market: Wheat prices up by ₹150/quintal in Jaipur Mandi."
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const insightTimer = setInterval(() => {
      setInsightIdx(prev => (prev + 1) % insights.length);
    }, 8000);
    return () => {
      clearInterval(timer);
      clearInterval(insightTimer);
    };
  }, []);

  return (
    <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 fixed top-0 right-0 left-0 z-40">
      <div className="flex items-center gap-4">
        <div className="text-xl font-black bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          DIGITAL KRISHI
        </div>
        <div className="hidden md:flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
          <span className="animate-bounce">💡</span>
          <span className="text-xs font-bold text-green-700 transition-all duration-500">{insights[insightIdx]}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <p className="text-xs font-bold text-gray-900">{time.toLocaleTimeString()}</p>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
        </div>
        
        <div className="flex items-center gap-3 border-l pl-6 border-gray-100">
          <button className="relative w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
            <span>🔔</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-10 h-10 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-xl shadow-lg flex items-center justify-center text-white font-bold ring-2 ring-white ring-offset-1">
            US
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;