import React, { useState, useEffect } from "react";

export default function ROICalculator({ farmId = 'defaultUser123' }) {
  const [loading, setLoading] = useState(true);
  const [financialData, setFinancialData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch real financial metrics calculated on the backend
  useEffect(() => {
    const fetchFinancials = async () => {
      try {
        setLoading(true);
        // Calls Node.js backend which calculates live ROI using Agmarknet API prices & soil heuristics
        const response = await fetch(`http://localhost:5000/api/financials/roi/${farmId}`);
        if (!response.ok) throw new Error("Failed to load real-time financial metrics");
        
        const data = await response.json();
        setFinancialData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancials();
  }, [farmId]);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-medium">
        ⏳ Calculating real-time financial breakdown from live Mandi prices...
      </div>
    );
  }

  if (error || !financialData) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200 m-6">
        ⚠️ Unable to fetch live financial data. Please check backend connection or API proxy.
      </div>
    );
  }

  const { kpis, cropBreakdown, operationalCosts, breakEven, yoyComparison } = financialData;

  return (
    <div className="p-6 bg-[#f1f5f3] min-h-screen font-sans text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span>📊</span> Income & ROI Calculator
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real financial breakdown computed dynamically from active farm logs and market APIs.
          </p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-[#064e3b] hover:bg-[#04382a] text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
        >
          🔄 Refresh Market Rates
        </button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-xl text-center shadow-sm">
          <span className="text-2xl font-extrabold text-emerald-800">
            ₹{kpis.totalRevenue.toLocaleString('en-IN')}
          </span>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">TOTAL REVENUE</p>
          <span className="inline-block text-[11px] font-medium text-emerald-600 mt-1">
            {kpis.revenueChangePercent >= 0 ? '▲ +' : '▼ '}{kpis.revenueChangePercent}% vs last yr
          </span>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-xl text-center shadow-sm">
          <span className="text-2xl font-extrabold text-red-600">
            ₹{kpis.totalInputCost.toLocaleString('en-IN')}
          </span>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">TOTAL INPUT COST</p>
          <span className="inline-block text-[11px] font-medium text-red-500 mt-1">
            ▲ +{kpis.inflationRate}% inflation rate
          </span>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-xl text-center shadow-sm">
          <span className="text-2xl font-extrabold text-emerald-800">
            ₹{kpis.netProfit.toLocaleString('en-IN')}
          </span>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">NET PROFIT</p>
          <span className="inline-block text-[11px] font-bold text-emerald-700 mt-1">
            ROI: {kpis.roiPercentage}%
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Real Crop & Expense Items */}
        <div className="lg:col-span-2 bg-white/70 border border-gray-200/80 p-5 rounded-2xl shadow-sm">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            PROFIT & LOSS BREAKDOWN
          </h2>

          {/* Revenue Dynamic Items */}
          <div className="space-y-2 mb-4">
            {cropBreakdown.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-emerald-100/60 text-emerald-950 px-4 py-2.5 rounded-xl text-xs">
                <span>🌾 <strong>{item.cropName}</strong> ({item.areaHectares} Ha @ ₹{item.mandiPrice}/Qtl)</span>
                <span className="font-bold text-emerald-800">+₹{item.totalRevenue.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          {/* Operational Costs Dynamic Items */}
          <div className="space-y-2 mb-6">
            {operationalCosts.map((cost, idx) => (
              <div key={idx} className="flex justify-between items-center bg-red-100/50 text-red-950 px-4 py-2.5 rounded-xl text-xs">
                <span>{cost.category}</span>
                <span className="font-bold text-red-700">-₹{cost.amount.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#0b1320] text-white p-4 rounded-xl flex justify-between items-center">
            <span className="text-xs font-extrabold tracking-wider uppercase">NET PROFIT (After all costs)</span>
            <span className="text-lg font-bold">₹{kpis.netProfit.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Right Column: Analytics */}
        <div className="space-y-6">
          <div className="bg-white/70 border border-gray-200/80 p-5 rounded-2xl shadow-sm">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">BREAK-EVEN ANALYSIS</h2>
            <div className="text-center py-2">
              <span className="text-3xl font-extrabold text-slate-800">
                ₹{breakEven.monthlyPoint.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] text-gray-500 mt-1">Monthly break-even target</p>
            </div>
            <div className="mt-4 bg-blue-50/70 border border-blue-100 p-3 rounded-xl text-left">
              <p className="text-[11px] text-blue-900 font-semibold">
                📅 Months to break-even: {breakEven.monthsToBreakEven}
              </p>
              <p className="text-[10px] text-gray-500 mt-1">
                {breakEven.notes}
              </p>
            </div>
          </div>

          <div className="bg-white/70 border border-gray-200/80 p-5 rounded-2xl shadow-sm">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">YEAR-ON-YEAR COMPARISON</h2>
            <div className="space-y-2.5">
              {yoyComparison.map((y, idx) => (
                <div key={idx} className={`flex justify-between items-center p-3 rounded-xl text-xs ${
                  y.isCurrent ? "bg-emerald-100/80 border border-emerald-300 font-bold" : "bg-emerald-50/40"
                }`}>
                  <div>
                    <span>{y.yearLabel}</span>
                    {y.subtext && <span className="block text-[10px] text-emerald-700 font-semibold">{y.subtext}</span>}
                  </div>
                  <span>₹{y.netProfit.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
