import React, { useEffect, useState } from 'react';

const SchemeMiniWidget = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(66), 400);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-2xl shadow-lg text-white">
      <div className="flex justify-between items-start mb-1">
        <h4 className="text-[10px] font-bold opacity-80 uppercase tracking-widest">PM-KISAN Samman Nidhi</h4>
        <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse"></div>
      </div>
      <p className="text-xl font-black">₹6,000 / year</p>
      <p className="text-[9px] opacity-70 mt-1">Next installment: ₹2,000 in 18 days</p>

      <div className="mt-4">
        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[8px] opacity-60 mt-1 uppercase font-bold tracking-tighter">2 of 3 installments received</p>
      </div>
    </div>
  );
};

export default SchemeMiniWidget;
