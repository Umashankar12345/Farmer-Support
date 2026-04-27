import React from 'react';
import PestAlertFilter from '../../components/UI/PestAlertFilter';

export default function PestAlertPage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <PestAlertFilter />
      
      {/* AI Diagnosis Quick Link */}
      <div className="mt-12 p-8 bg-gradient-to-br from-[#14301f] to-[#1a4d2e] rounded-3xl text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h2 className="text-2xl font-black mb-3">AI Pest Diagnosis (Coming Soon)</h2>
            <p className="text-[13px] opacity-80 font-medium leading-relaxed">
              Facing an unidentified pest? Simply describe the symptoms or upload a photo to get instant diagnosis and treatment advice from our AI Krishi Officer.
            </p>
          </div>
          <button 
            className="bg-[#5ee08a] text-[#14301f] px-10 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-green-500/20"
            onClick={() => window.location.href = '/query'}
          >
            Try AI Query →
          </button>
        </div>
      </div>
    </div>
  );
}
