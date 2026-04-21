import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import PerformanceTicker from '../Dashboard/components/PerformanceTicker';

export default function SchemesPage() {
   const [data, setData] = useState({ enrolled: [], available: [] });

   useEffect(() => {
      fetch('/api/schemes')
         .then(r => r.json())
         .then(setData)
         .catch(console.error);
   }, []);

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
         <Navbar />
         <div className="flex flex-1 pt-16">
            <Sidebar />

            <main className="flex-1 p-8 flex flex-col max-w-6xl mx-auto w-full">
               <header className="mb-8">
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight">Government Schemes</h1>
                  <p className="text-gray-500 font-medium">Automatic eligibility check & application tracker</p>
               </header>

               <section className="mb-12">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Active Enrollments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {data.enrolled.map(s => (
                        <div key={s.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
                           <div className="flex justify-between items-start mb-6">
                              <div>
                                 <h4 className="text-lg font-bold text-gray-900">{s.name}</h4>
                                 <p className="text-xs text-green-600 font-bold uppercase tracking-wider mt-1">{s.status}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-xs text-gray-400 font-bold uppercase">Next Payout</p>
                                 <p className="text-sm font-black text-gray-900">{s.nextInstallment}</p>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-bold uppercase">
                                 <span className="text-gray-400">Benefit Received</span>
                                 <span className="text-gray-900">{s.benefit}</span>
                              </div>
                              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                 <div className="bg-green-500 h-full transition-all duration-1000" style={{ width: `${s.progress}%` }}></div>
                              </div>
                              <p className="text-[10px] text-gray-400 text-right font-medium italic">Verification 100% complete via Aadhaar</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>

               <section>
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Eligible for You</h3>
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                     <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                           <tr>
                              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Scheme Name</th>
                              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Benefit Category</th>
                              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Eligibility</th>
                              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                           {data.available.map(s => (
                              <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                                 <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-gray-900">{s.name}</p>
                                    <p className="text-[10px] text-gray-400 font-medium">Deadline: {s.deadline}</p>
                                 </td>
                                 <td className="px-6 py-4 text-center">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded tracking-tighter">Infrastructure</span>
                                 </td>
                                 <td className="px-6 py-4 text-center">
                                    <span className={`px-2 py-1 text-[10px] font-black uppercase rounded shadow-sm ${s.eligibility === 'High' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
                                       }`}>{s.eligibility}</span>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <button className="px-4 py-1.5 bg-gray-900 text-white text-[10px] font-black uppercase rounded-lg hover:bg-black transition-all">Apply Now</button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </section>
            </main>
         </div>
         <PerformanceTicker />
      </div>
   );
}
