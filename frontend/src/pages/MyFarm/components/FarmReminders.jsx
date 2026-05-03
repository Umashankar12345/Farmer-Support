import React, { useState } from 'react';

export default function FarmReminders({ farm }) {
  const [reminders, setReminders] = useState([
    { id: 1, task: 'Spray Pesticide (Urea)', date: '20 Oct 2023', type: 'urgent' },
    { id: 2, task: 'Irrigation Cycle 3', date: '22 Oct 2023', type: 'normal' },
    { id: 3, task: 'Expected Harvest Start', date: '15 Nov 2023', type: 'milestone' }
  ]);

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[14px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
          <span>🔔</span> Farm Reminders
        </h3>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
          +
        </button>
      </div>

      <div className="space-y-3">
        {reminders.map(r => (
          <div key={r.id} className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-sm hover:border-green-100 transition-all group">
            <div className={`w-2 rounded-full ${r.type === 'urgent' ? 'bg-red-400' : r.type === 'milestone' ? 'bg-purple-400' : 'bg-blue-400'}`}></div>
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-900 mb-1">{r.task}</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{r.date}</div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-green-600 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
