import React, { useState } from 'react';
import { PEST_INTENSITY, PEST_CONTROLS } from '../../constants/pestData';

export default function PestAlertPage() {
  const [selectedState, setSelectedState] = useState('RJ');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);

  const stateData = PEST_INTENSITY[selectedState];

  const handleReport = (e) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setShowReportForm(false);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header section */}
      <header className="mb-8 flex flex-wrap items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-[#d4e8d0] shadow-sm">
        <div className="max-w-xl">
          <h1 className="text-3xl font-black text-[#111] tracking-tight mb-2">Pest Alert & Monitoring</h1>
          <p className="text-[13px] text-gray-500 font-bold leading-relaxed">
            Real-time regional outbreak monitoring based on ground reports and satellite imagery. Select your location to view hyper-local threats.
          </p>
        </div>
        <button 
          className="bg-red-600 text-white px-8 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-200"
          onClick={() => setShowReportForm(true)}
        >
          🚨 REPORT OUTBREAK
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Intensity Map & List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-[#cde4c6] shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                   <h3 className="text-[14px] font-black text-[#14301f] uppercase tracking-wider">Regional Outbreak Map</h3>
                   <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                </div>
                <div className="flex gap-2">
                   {['RJ', 'PB', 'MH', 'UP'].map(code => (
                     <button 
                       key={code}
                       className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all
                         ${selectedState === code ? 'bg-[#14301f] text-[#5ee08a]' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}
                       onClick={() => setSelectedState(code)}
                     >{code}</button>
                   ))}
                </div>
             </div>

             {/* Mock Interactive Map */}
             <div className="relative bg-[#f8fafc] h-[300px] rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center mb-8">
                <div className="absolute inset-0 opacity-10 flex items-center justify-center text-[100px] font-black">INDIA</div>
                
                {Object.keys(PEST_INTENSITY).map(code => (
                  <div 
                    key={code}
                    className={`absolute flex flex-col items-center cursor-pointer transition-all ${selectedState === code ? 'scale-125' : 'opacity-40'}`}
                    style={{ 
                      top: code === 'PB' ? '20%' : code === 'RJ' ? '35%' : code === 'UP' ? '40%' : '65%',
                      left: code === 'PB' ? '30%' : code === 'RJ' ? '20%' : code === 'UP' ? '45%' : '35%'
                    }}
                    onClick={() => setSelectedState(code)}
                  >
                     <div 
                       className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-lg"
                       style={{ background: PEST_INTENSITY[code].color }}
                     >
                        {PEST_INTENSITY[code].intensity[0]}
                     </div>
                     <span className="mt-1 text-[9px] font-black text-gray-600 uppercase">{PEST_INTENSITY[code].name}</span>
                  </div>
                ))}

                <div className="absolute bottom-4 left-4 flex gap-4 text-[9px] font-black uppercase text-gray-400">
                   <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600"></span> Critical</div>
                   <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Medium</div>
                   <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-600"></span> Low</div>
                </div>
             </div>

             <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-4">Active Threats in {stateData.name}</h4>
             <div className="space-y-4">
                {stateData.alerts.map(alert => (
                  <div key={alert.id} className="bg-[#fbfcfa] p-6 rounded-2xl border border-[#eef5ef] hover:border-red-200 transition-all group">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <div className="text-[10px] font-black text-red-600 uppercase tracking-[1px] mb-1">{alert.level} RISK FOUND</div>
                           <h5 className="text-[16px] font-black text-[#111]">{alert.name}</h5>
                           <p className="text-[11px] font-bold text-gray-500 mt-1">Primarily Affecting: <span className="text-[#14301f]">{alert.crop}</span></p>
                        </div>
                        <div className="bg-white px-3 py-1 rounded-md border border-[#eee] text-[10px] font-black text-gray-400">📍 {alert.area}</div>
                     </div>
                     <div className="bg-white p-4 rounded-xl border border-[#f0f0f0]">
                        <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Expert Recommended Action</p>
                        <p className="text-[12px] font-black text-[#1a8a4a] leading-relaxed">🛡️ {alert.action}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Controls & Guidelines */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-3xl border border-[#cde4c6] shadow-sm">
              <h3 className="text-[14px] font-black text-[#14301f] uppercase tracking-wider mb-6 flex items-center gap-2">
                 <span>🧬</span> Control Methods
              </h3>
              <div className="space-y-6">
                 {PEST_CONTROLS.map(c => (
                   <div key={c.id} className="flex gap-4 group">
                      <div className="w-12 h-12 shrink-0 bg-gray-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#f0fdf4] group-hover:scale-110 transition-all border border-gray-100">{c.icon}</div>
                      <div>
                         <h5 className="text-[13px] font-black text-[#111] mb-1">{c.title}</h5>
                         <p className="text-[11px] text-gray-500 font-bold leading-relaxed">{c.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-[#14301f] p-8 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500 opacity-20 -mr-12 -mt-12 rounded-full"></div>
              <h4 className="text-[15px] font-black mb-4">Protect Your Harvest</h4>
              <p className="text-[11.5px] opacity-70 font-semibold mb-6">Localized pest data can improve yield retention by up to 22% when acted upon within 48 hours.</p>
              <button className="w-full bg-[#5ee08a] text-[#14301f] py-4 rounded-xl text-[11px] font-black uppercase tracking-widest hover:opacity-90">View Guidelines</button>
           </div>
        </div>
      </div>

      {/* Report Form Modal */}
      {showReportForm && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#0f2115]/90 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setShowReportForm(false)}
        >
          <div 
            className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-8">
               <h3 className="text-2xl font-black text-[#111] tracking-tight">Report Local Outbreak</h3>
               <p className="text-gray-500 font-bold text-[12px] mt-1 uppercase tracking-wider">Your report sends alerts to nearby Krishi partners</p>
            </div>

            <form onSubmit={handleReport} className="space-y-5">
               <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Pest/Insect Name</label>
                  <input required placeholder="e.g. Whitefly, Stem Borer" className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-[13px] font-bold outline-none focus:border-red-500" />
               </div>
               <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Affected Crop</label>
                  <input required placeholder="e.g. Cotton, Wheat" className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-[13px] font-bold outline-none focus:border-red-500" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">State</label>
                     <select className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-[13px] font-bold outline-none">
                        <option>Rajasthan</option>
                        <option>Punjab</option>
                        <option>Maharashtra</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">District</label>
                     <input required placeholder="Area/District" className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-[13px] font-bold outline-none focus:border-red-500" />
                  </div>
               </div>

               <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowReportForm(false)} className="flex-1 py-4 text-[11px] font-black uppercase text-gray-400">Cancel</button>
                  <button 
                    disabled={reportSubmitted}
                    className={`flex-[2] py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${reportSubmitted ? 'bg-green-500 text-white' : 'bg-red-600 text-white shadow-lg shadow-red-200'}`}
                  >
                     {reportSubmitted ? '✓ ALERT SENT' : 'SEND EMERGENCY ALERT'}
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
