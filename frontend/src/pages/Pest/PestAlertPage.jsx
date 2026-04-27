import React from 'react';
import PestAlertFilter from '../../components/UI/PestAlertFilter';

export default function PestAlertPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <PestAlertFilter />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Spray Schedule Generator */}
        <div className="p-8 bg-white rounded-3xl border border-[#cde4c6] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-black text-[#14301f] uppercase tracking-wider flex items-center gap-2">
              <span>📅</span> Spray Schedule Generator
            </h3>
            <span className="px-2 py-1 bg-green-50 text-green-600 text-[9px] font-black rounded uppercase">Weather Optimized</span>
          </div>
          
          <div className="space-y-4">
            {[
              { date: 'Tomorrow, 6:00 AM', task: 'Apply Neem Oil (Organic)', status: 'High Priority', note: 'Low wind speed detected' },
              { date: 'Friday, 5:30 AM', task: 'NPK 19:19:19 Spray', status: 'Routine', note: 'Clear sky forecast' },
              { date: 'Next Tuesday', task: 'Follow-up Pest Check', status: 'Monitoring', note: 'Check leaf undersides' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100">
                <div className="w-10 h-10 shrink-0 bg-green-50 rounded-xl flex items-center justify-center text-lg">🌱</div>
                <div>
                  <div className="text-[12px] font-black text-gray-900">{item.task}</div>
                  <div className="text-[10px] text-green-600 font-bold mt-0.5">{item.date}</div>
                  <div className="text-[10px] text-gray-400 font-medium mt-1 italic">"{item.note}"</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 bg-[#14301f] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:opacity-90">Export to WhatsApp</button>
        </div>

        {/* AI Diagnosis Quick Link */}
        <div className="p-8 bg-gradient-to-br from-[#14301f] to-[#1a4d2e] rounded-3xl text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <div className="mb-6">
              <h2 className="text-2xl font-black mb-3">AI Vision Diagnosis</h2>
              <p className="text-[13px] opacity-80 font-medium leading-relaxed">
                Identify unidentified pests instantly. Describe the symptoms or upload a photo to get instant diagnosis.
              </p>
            </div>
            <button 
              className="w-full bg-[#5ee08a] text-[#14301f] px-10 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-green-500/20"
              onClick={() => window.location.href = '/disease'}
            >
              Start AI Diagnosis →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
