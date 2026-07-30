import React, { useState, useEffect } from "react";
export default function MarketExplorer() {
  const [prices, setPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, [searchTerm, selectedState]);

  const fetchPrices = () => {
    setLoading(true);
    const query = new URLSearchParams({ search: searchTerm, state: selectedState }).toString();
    fetch(`http://localhost:5000/api/market-prices?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setPrices(data.records || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading market data:", err);
        setLoading(false);
      });
  };

  return (
    <main className="flex-1 p-0 flex flex-col max-w-6xl mx-auto w-full">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Live Mandi Prices (eNAM / Agmarknet)</h1>
              <p className="text-sm text-gray-500">Real-time agricultural commodity prices across Indian markets</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold">
              LIVE GOVT DATA
            </span>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search crop, state, or market..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All States</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Fetching live market data...</div>
            ) : (
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-slate-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
                  <tr>
                    <th className="p-4">Commodity / Crop</th>
                    <th className="p-4">Market / Mandi</th>
                    <th className="p-4">State</th>
                    <th className="p-4">Min Price (₹/Q)</th>
                    <th className="p-4">Modal Price (₹/Q)</th>
                    <th className="p-4">Max Price (₹/Q)</th>
                    <th className="p-4">Daily Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {prices.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-bold text-gray-800">
                        {item.commodity} <span className="text-xs font-normal text-gray-400">({item.variety})</span>
                      </td>
                      <td className="p-4">{item.market}</td>
                      <td className="p-4 text-gray-500">{item.state}</td>
                      <td className="p-4 text-gray-600">₹{item.minPrice.toLocaleString()}</td>
                      <td className="p-4 font-bold text-emerald-700">₹{item.modalPrice.toLocaleString()}</td>
                      <td className="p-4 text-gray-600">₹{item.maxPrice.toLocaleString()}</td>
                      <td className={`p-4 font-bold ${item.trend === "up" ? "text-emerald-600" : "text-rose-500"}`}>
                        {item.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
    </main>
  );
}
