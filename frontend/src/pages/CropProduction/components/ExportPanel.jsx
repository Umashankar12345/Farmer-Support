// src/pages/CropProduction/components/ExportPanel.jsx
import React from 'react';
import { Download, FileSpreadsheet, Printer, Share2 } from 'lucide-react';

const ExportPanel = ({ filters, productionData }) => {
  const handleExport = (format) => {
    console.log(`Exporting ${format} data for:`, filters);
    // Implement export logic here
    alert(`Exporting data in ${format} format...`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Share2 className="text-blue-500" /> Export & Reporting
      </h3>

      <div className="space-y-3">
        <button
          onClick={() => handleExport('PDF')}
          className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all border border-gray-200 flex items-center justify-center gap-2 hover:shadow-sm"
        >
          <Download size={18} className="text-red-500" /> Returns PDF Report
        </button>

        <button
          onClick={() => handleExport('Excel')}
          className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all border border-gray-200 flex items-center justify-center gap-2 hover:shadow-sm"
        >
          <FileSpreadsheet size={18} className="text-green-600" /> Export to Excel
        </button>

        <button
          onClick={() => handleExport('Print')}
          className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all border border-gray-200 flex items-center justify-center gap-2 hover:shadow-sm"
        >
          <Printer size={18} className="text-gray-600" /> Print Summary
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Include in Report</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition-colors" defaultChecked />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Summary Report</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition-colors" />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Detailed Analysis</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition-colors" />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Comparison Report</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;