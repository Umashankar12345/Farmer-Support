import React, { useState, useMemo } from 'react';
import { ALL_SCHEMES } from '../../constants/schemesData';

const ENROLLED_SCHEMES = [
  { name: 'PM-KISAN Samman Nidhi', entitlement: '₹6,000 / year', status: 'Active', next: '18 Days', color: '#16a34a' },
  { name: 'Kisan Credit Card (KCC)', entitlement: 'Credit up to ₹3L', status: 'Verified', next: 'N/A', color: '#0284c7' },
  { name: 'Soil Health Card Scheme', entitlement: 'Free Testing', status: 'Pending', next: '7 Days', color: '#d97706' }
];

export default function SchemesPage() {
  const [showCatalog, setShowCatalog] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [applied, setApplied] = useState({});

  const filteredSchemes = useMemo(() => {
    return ALL_SCHEMES.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.benefit.toLowerCase().includes(search.toLowerCase());
      const matchTab = activeTab === 'All' || s.category === activeTab;
      return matchSearch && matchTab;
    });
  }, [search, activeTab]);

  const handleApply = (id) => {
    setApplied(prev => ({ ...prev, [id]: 'processing' }));
    setTimeout(() => {
      setApplied(prev => ({ ...prev, [id]: 'success' }));
    }, 1500);
  };

  return (
    <div className="relative">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#d4e8d0] shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#111] tracking-tight">Government Schemes & Subsidies</h1>
          <p className="text-[12px] text-[#555] font-bold mt-1 uppercase tracking-wider">
            Managing {ENROLLED_SCHEMES.length} active programs · Check eligibility for 12+ new subsidies
          </p>
        </div>
        <button 
          className="bg-[#14301f] text-[#5ee08a] px-6 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
          onClick={() => setShowCatalog(true)}
        >
          🔍 BROWSE ALL SCHEMES
        </button>
      </header>

      {/* Enrolled View */}
      <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        Currently Enrolled Programs
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {ENROLLED_SCHEMES.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#cde4c6] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 -mr-12 -mt-12 rounded-full opacity-20 group-hover:scale-110 transition-transform"></div>
             <div className="flex justify-between items-start mb-4">
                <div className="text-[10px] font-black px-2 py-1 bg-green-50 text-green-700 rounded-md uppercase">PROGRAM ACTIVE</div>
                <div className="text-xl">{s.status === 'Active' ? '✅' : '⏳'}</div>
             </div>
             <div className="text-[14px] font-black text-[#111] mb-1">{s.name}</div>
             <div className="text-[22px] font-black mb-6" style={{ color: s.color }}>{s.entitlement}</div>
             <div className="flex justify-between items-center text-[10px] font-black border-t border-gray-50 pt-4 text-gray-400 uppercase tracking-tighter">
                <span>NEXT INSTALLMENT</span>
                <span className="text-gray-900">{s.next}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#cde4c6] shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-50 bg-[#fbfcfa]">
            <h2 className="text-[14px] font-black text-[#14301f] uppercase tracking-tight">Available For Application</h2>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-gray-50/50">
                    <th className="p-6 text-[11px] text-gray-400 font-bold uppercase">Scheme Name</th>
                    <th className="p-6 text-[11px] text-gray-400 font-bold uppercase">Benefit Type</th>
                    <th className="p-6 text-[11px] text-gray-400 font-bold uppercase">Eligibility</th>
                    <th className="p-6 text-[11px] text-gray-400 font-bold uppercase text-right">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {ALL_SCHEMES.slice(4, 8).map((item, i) => (
                   <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6 font-black text-[#111] text-[13px]">{item.name}</td>
                      <td className="p-6 text-[12px] font-bold text-gray-600">{item.benefit.slice(0, 40)}...</td>
                      <td className="p-6 text-[11px] text-[#1a8a4a] font-bold">{item.eligibility}</td>
                      <td className="p-6 text-right">
                         <button 
                          className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all
                            ${applied[item.id] === 'success' ? 'bg-green-600 text-white' : 'bg-[#e0f5e7] text-[#1a7a3a] hover:bg-[#1a8a4a] hover:text-white'}`}
                          onClick={() => handleApply(item.id)}
                         >
                            {applied[item.id] === 'success' ? '✓ SUBMITTED' : applied[item.id] === 'processing' ? 'CHECKING...' : 'APPLY NOW'}
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
         </div>
      </div>

      {/* Catalog Modal */}
      {showCatalog && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#0f2115]/90 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setShowCatalog(false)}
        >
          <div 
            className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
               <div>
                  <h2 className="text-3xl font-black text-[#111] tracking-tight">Kisan Scheme Catalog</h2>
                  <p className="text-gray-500 font-bold text-[13px] mt-1 uppercase tracking-wider">Browse official government programs & subsidies 2024-25</p>
               </div>
               <button 
                className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-2xl font-light hover:bg-red-50 hover:text-red-500 transition-colors"
                onClick={() => setShowCatalog(false)}
               >✕</button>
            </div>

            {/* Search & Filter Bar */}
            <div className="px-8 py-6 bg-gray-50/50 flex flex-wrap items-center gap-6">
               <div className="flex-1 min-w-[300px] relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  <input 
                    autoFocus
                    placeholder="Search by name, benefit or crop..."
                    className="w-full h-14 bg-white border border-gray-100 rounded-2xl pl-12 pr-4 text-[14px] font-bold outline-none focus:border-[#1a8a4a] shadow-sm transition-all"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
               </div>
               <div className="flex gap-2">
                  {['All', 'Insurance', 'Finance', 'Technology', 'Irrigation'].map(tab => (
                    <button 
                      key={tab}
                      className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all
                        ${activeTab === tab ? 'bg-[#14301f] text-[#5ee08a]' : 'bg-white text-gray-500 border border-gray-100 shadow-sm'}`}
                      onClick={() => setActiveTab(tab)}
                    >{tab}</button>
                  ))}
               </div>
            </div>

            {/* Schemes List */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                  {filteredSchemes.map(s => (
                    <div key={s.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1a8a4a]/20 transition-all group">
                       <div className="flex justify-between items-start mb-4">
                          <div className="text-[9px] font-black px-2 py-1 bg-gray-50 text-gray-400 rounded-md uppercase">{s.category}</div>
                          {applied[s.id] === 'success' && <span className="text-green-600 font-black text-[10px]">✓ ENROLLED</span>}
                       </div>
                       <h4 className="text-[15px] font-black text-[#111] leading-tight mb-3 group-hover:text-[#1a8a4a] transition-colors">{s.name}</h4>
                       <p className="text-[12px] text-gray-600 font-semibold mb-4 leading-relaxed">{s.benefit}</p>
                       <div className="bg-[#fbfcfa] p-4 rounded-xl border border-[#eef5ef] mb-6">
                          <div className="text-[9px] font-black text-gray-400 uppercase mb-2">Eligibility & Details</div>
                          <p className="text-[11px] font-bold text-[#1a8a4a]">{s.eligibility}</p>
                          <p className="text-[10.5px] text-gray-500 font-medium mt-2">{s.details}</p>
                       </div>
                       <button 
                        disabled={applied[s.id]}
                        className={`w-full py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all
                          ${applied[s.id] === 'success' ? 'bg-green-50 text-green-600' : 'bg-[#14301f] text-white hover:opacity-90 shadow-lg shadow-[#14301f]/20'}`}
                        onClick={() => handleApply(s.id)}
                       >
                          {applied[s.id] === 'success' ? 'Application Approved' : applied[s.id] === 'processing' ? 'Processing...' : 'Apply Now'}
                       </button>
                    </div>
                  ))}
                  {filteredSchemes.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                       <div className="text-4xl mb-4">🔦 No schemes found</div>
                       <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Try adjusting your search or filters</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
