import React, { useState, useEffect } from 'react';
import { visitorAPI, commentAPI } from '../../services/api';

export default function AdminDashboard() {
  const [visitors, setVisitors] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vData, cData] = await Promise.all([
          visitorAPI.getVisitors(),
          commentAPI.getComments()
        ]);
        setVisitors(vData);
        setComments(cData);
      } catch (err) {
        console.error('Failed to fetch admin data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f4f8f5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a8a47]"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-[#14301f] tracking-tight">Admin Command Center 🛡️</h1>
        <p className="text-gray-500 font-bold uppercase text-[11px] tracking-widest mt-1">Manage Visitors & Community Feedback</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visitors Section */}
        <section className="bg-white p-6 rounded-3xl border border-[#d4e8d0] shadow-sm">
          <h2 className="text-xl font-black text-[#14301f] mb-6 flex items-center gap-2">
            👥 Recent Visitors ({visitors.length})
          </h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {visitors.map((v) => (
              <div key={v._id} className="p-4 rounded-2xl bg-[#f9fdf9] border border-[#e8f5e9] flex justify-between items-center">
                <div>
                  <p className="font-black text-[#14301f] text-sm">{v.userName}</p>
                  <p className="text-[11px] text-gray-500 font-bold">{v.email}</p>
                </div>
                <p className="text-[10px] font-black text-gray-400">
                  {new Date(v.visitTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Comments Section */}
        <section className="bg-white p-6 rounded-3xl border border-[#d4e8d0] shadow-sm">
          <h2 className="text-xl font-black text-[#14301f] mb-6 flex items-center gap-2">
            💬 Project Comments ({comments.length})
          </h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {comments.map((c) => (
              <div key={c._id} className="p-4 rounded-2xl bg-[#f9fdf9] border border-[#e8f5e9] hover:border-[#c8e6c9] transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[13px] font-black text-[#14301f] block">{c.userName}</span>
                    <div className="flex text-amber-400 text-[10px] mt-0.5">
                      {'★'.repeat(c.rating || 5)}{'☆'.repeat(5 - (c.rating || 5))}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">
                    {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <p className="text-[12px] text-[#444] font-medium leading-relaxed italic">"{c.content}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c8e6c9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #1a8a47; }
      `}</style>
    </div>
  );
}
