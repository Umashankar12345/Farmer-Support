import React from 'react';
import { MSP_DATA } from '../../../constants/stateData';

const MandiWidget = ({ crops = [] }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-[#cde4c6] shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[12px] font-extrabold text-[#14301f] uppercase tracking-tight">
          📋 MSP Rates 2024–25
        </h3>
        <span className="text-[10px] text-gray-400 font-bold">CACP • GOI</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead className="border-b border-gray-100">
            <tr>
              <th className="pb-2 text-[10px] text-gray-400 font-bold uppercase">Crop</th>
              <th className="pb-2 text-[10px] text-gray-400 font-bold uppercase">Season</th>
              <th className="pb-2 text-[10px] text-gray-400 font-bold uppercase text-right">₹ / Quintal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {crops.map((cropName, idx) => {
              // Try to find the crop in MSP_DATA
              const baseName = Object.keys(MSP_DATA).find(k => cropName.toLowerCase().includes(k.toLowerCase()));
              const msp = MSP_DATA[baseName] || { s: 'Annual', v: null };
              
              return (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 font-bold text-gray-800">{cropName}</td>
                  <td className="py-2.5 text-gray-500 font-medium">{msp.s}</td>
                  <td className="py-2.5 font-black text-[#1a7a3a] text-right">
                    {msp.v ? `₹${msp.v.toLocaleString('en-IN')}` : 'Market-led'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-50 text-[9px] text-gray-400 italic">
        Source: CACP, Ministry of Agriculture & Farmers Welfare · agricoop.gov.in
      </div>
    </div>
  );
};

export default MandiWidget;
