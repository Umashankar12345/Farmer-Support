import React, { useState } from 'react';

export default function ExpenseTracker({ farm }) {
  const [expenses, setExpenses] = useState([
    { id: 1, type: 'Seeds', amount: 12000, date: '12 Aug 2023' },
    { id: 2, type: 'Fertilizer', amount: 8500, date: '25 Aug 2023' },
    { id: 3, type: 'Labor', amount: 15000, date: '10 Sep 2023' },
    { id: 4, type: 'Irrigation', amount: 4200, date: '15 Sep 2023' },
  ]);

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const estimatedRevenue = (farm.acres || 5) * 45000; // Mock calculation
  const profit = estimatedRevenue - totalExpense;

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[14px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
          <span>💰</span> Cost & Expense Tracker
        </h3>
        <button className="px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase rounded tracking-widest hover:bg-gray-800 transition-colors">
          + Add Expense
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-red-50 rounded-2xl border border-red-100 text-center">
          <div className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">Total Expenses</div>
          <div className="text-xl font-black text-red-600">₹{totalExpense.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center">
          <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Est. Revenue</div>
          <div className="text-xl font-black text-blue-600">₹{estimatedRevenue.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-green-50 rounded-2xl border border-green-100 text-center">
          <div className="text-[9px] font-black text-green-500 uppercase tracking-widest mb-1">Projected Profit</div>
          <div className="text-xl font-black text-green-700">₹{profit.toLocaleString()}</div>
        </div>
      </div>

      <div className="border border-gray-100 rounded-2xl overflow-hidden">
        {expenses.map((e, idx) => (
          <div key={e.id} className={`flex justify-between items-center p-4 ${idx !== expenses.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <div>
              <div className="text-sm font-bold text-gray-900">{e.type}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{e.date}</div>
            </div>
            <div className="text-sm font-black text-red-500">-₹{e.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
