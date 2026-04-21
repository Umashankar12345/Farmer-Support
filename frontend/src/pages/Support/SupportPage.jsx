import React, { useState } from 'react';
import { SUPPORT_STATES, LIAISON_SERVICES } from '../../constants/supportData';

export default function SupportPage() {
  const [selectedState, setSelectedState] = useState('RJ');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const stateData = SUPPORT_STATES[selectedState];
  const activeOfficer = stateData.districts.find(d => d.name === selectedDistrict);

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => setRequestSubmitted(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header section */}
      <header className="mb-8 flex flex-wrap items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-[#d4e8d0] shadow-sm">
        <div className="max-w-xl">
          <h1 className="text-3xl font-black text-[#111] tracking-tight mb-2">Human Advisory & Govt Relations</h1>
          <p className="text-[13px] text-gray-500 font-bold leading-relaxed">
            Connect with verified District Agriculture Officers (DAO) and access formal liaison services for scheme applications, grievances, and field inspections.
          </p>
        </div>
        <div className="flex gap-4">
           <div className="bg-[#14301f] text-[#5ee08a] px-6 py-4 rounded-2xl text-center shadow-lg">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">State Helpline</p>
              <p className="text-[15px] font-black">{stateData.helpline.split(' ')[0]}</p>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Directory */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-[#cde4c6] shadow-sm">
             <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🏛️</span>
                <h3 className="text-[14px] font-black text-[#14301f] uppercase tracking-wider">Official Officer Directory</h3>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                   <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 ml-1">Select State</label>
                   <select 
                     className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-[13px] font-bold outline-none focus:border-[#1a8a4a] transition-all"
                     value={selectedState}
                     onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }}
                   >
                      {Object.keys(SUPPORT_STATES).map(code => (
                        <option key={code} value={code}>{SUPPORT_STATES[code].name}</option>
                      ))}
                   </select>
                </div>
                <div>
                   <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 ml-1">Select District</label>
                   <select 
                     className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-[13px] font-bold outline-none focus:border-[#1a8a4a] transition-all"
                     value={selectedDistrict}
                     onChange={(e) => setSelectedDistrict(e.target.value)}
                   >
                      <option value="">-- Click to select --</option>
                      {stateData.districts.map(d => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                      ))}
                   </select>
                </div>
             </div>

             {activeOfficer ? (
                <div className="bg-[#f0fdf4] p-8 rounded-2xl border-2 border-[#1a884a] animate-in slide-in-from-bottom duration-300">
                   <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">👨‍💼</div>
                         <div>
                            <div className="text-[10px] font-black text-[#1a8a4a] uppercase tracking-[1px] mb-1">VERIFIED OFFICER</div>
                            <h4 className="text-[20px] font-black text-[#111]">{activeOfficer.officer}</h4>
                            <p className="text-[12px] text-gray-500 font-bold">{activeOfficer.role} · {selectedDistrict}, {stateData.name}</p>
                         </div>
                      </div>
                      <div className="bg-green-600 text-white px-3 py-1 rounded-md text-[10px] font-black">● ON DUTY</div>
                   </div>

                   <div className="grid grid-cols-2 gap-6 mt-8 py-6 border-t border-[#d4e8d0]">
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Contact Number</p>
                         <p className="text-[15px] font-black text-[#14301f]">{activeOfficer.contact}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Email Address</p>
                         <p className="text-[13px] font-bold text-[#14301f]">{activeOfficer.email}</p>
                      </div>
                   </div>

                   <div className="flex gap-3">
                      <button className="flex-1 bg-[#14301f] text-white py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-all">Direct Call</button>
                      <button className="flex-1 bg-white border border-[#1a8a4a] text-[#1a8a4a] py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Official Email</button>
                   </div>
                </div>
             ) : (
                <div className="py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                   <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Select a district to view officer details</p>
                </div>
             )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {LIAISON_SERVICES.map(s => (
               <div key={s.id} className="bg-white p-6 rounded-2xl border border-[#cde4c6] shadow-sm hover:border-[#1a8a4a] transition-all cursor-pointer group">
                  <div className="text-3xl mb-4 bg-gray-50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">{s.icon}</div>
                  <h4 className="text-[14px] font-black text-[#111] mb-1">{s.title}</h4>
                  <p className="text-[11.5px] text-gray-500 font-bold leading-relaxed">{s.desc}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Right Column: Interaction */}
        <div className="space-y-8">
           <div className="bg-[#14301f] p-8 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 -mr-16 -mt-16 rounded-full"></div>
              <h3 className="text-[18px] font-black mb-4 leading-tight">Need a Human Consult?</h3>
              <p className="text-[12px] opacity-70 font-semibold mb-6">Schedule a 10-minute callback from our verified agricultural expert team.</p>
              
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                 <input 
                   placeholder="Your Name" 
                   className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 text-[13px] font-bold text-white placeholder:text-white/40 outline-none focus:border-white/40"
                 />
                 <input 
                   placeholder="Mobile Number" 
                   className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 text-[13px] font-bold text-white placeholder:text-white/40 outline-none focus:border-white/40"
                 />
                 <select className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 text-[13px] font-bold text-white/60 outline-none">
                    <option>Topic: Scheme Help</option>
                    <option>Topic: Pest Issue</option>
                    <option>Topic: Yield Query</option>
                 </select>
                 <button 
                   className={`w-full py-4 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all ${requestSubmitted ? 'bg-green-500 text-white' : 'bg-[#5ee08a] text-[#14301f]'}`}
                 >
                    {requestSubmitted ? '✓ REQUEST SENT' : 'REQUEST CALLBACK'}
                 </button>
              </form>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-[#cde4c6] shadow-sm">
              <h4 className="text-[12px] font-black text-[#14301f] uppercase mb-4 flex items-center gap-2">💡 Liaison Tips</h4>
              <ul className="space-y-4">
                 {[
                   "Always carry your Aadhar & Jamabandi copy to the office.",
                   "DAOs are generally available from 10 AM to 1 PM.",
                   "State-level schemes require district-level verification first."
                 ].map((t, i) => (
                   <li key={i} className="flex gap-3 text-[11px] font-bold text-gray-500 leading-relaxed">
                      <span className="text-[#1a8a4a]">✔</span> {t}
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
