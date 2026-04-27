import React, { useState, useEffect } from 'react';
import DiseaseDetector from '../Query/components/DiseaseDetector';

export default function DiseaseDetectorPage() {
  const [history, setHistory] = useState([]);
  const API_BASE = window.location.origin.includes('localhost') ? 'http://localhost:5000' : '';

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/diagnosis/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setHistory(data.history);
    } catch (err) {
      console.error('Failed to load history');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Detector Section */}
        <div className="lg:col-span-2">
          <header className="mb-8 bg-white p-8 rounded-3xl border border-[#d4e8d0] shadow-sm">
            <h1 className="text-3xl font-black text-[#111] tracking-tight mb-2">Plant Disease Diagnosis</h1>
            <p className="text-[13px] text-gray-500 font-bold leading-relaxed">
              Powered by Advanced Vision AI. Upload a clear photo of the affected plant area to receive instant identification and treatment recommendations.
            </p>
          </header>
          
          <DiseaseDetector onAnalysisComplete={fetchHistory} />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#14301f] p-6 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 opacity-10 -mr-16 -mt-16 rounded-full"></div>
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <span>🛡️</span> Prevention Protocol
              </h4>
              <ul className="text-[11px] opacity-80 space-y-2 font-medium">
                <li>• Rotate crops every season to break pest cycles</li>
                <li>• Maintain 15cm spacing for optimal air circulation</li>
                <li>• Use disease-free certified seeds from Krishi Kendras</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#cde4c6] shadow-sm">
              <h4 className="font-bold text-[#14301f] mb-3 flex items-center gap-2">
                <span>🛰️</span> Regional Health Status
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Nearby Outbreaks</span>
                  <span className="px-2 py-1 bg-red-50 text-red-600 text-[9px] font-black rounded">3 ACTIVE</span>
                </div>
                <p className="text-[11px] text-gray-500 font-bold leading-relaxed">
                  Wheat Rust reported in 2 farms within 15km. Increase monitoring frequency to twice daily.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar History Section */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-[#cde4c6] shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[14px] font-black text-[#14301f] uppercase tracking-wider flex items-center gap-2">
                <span>📋</span> Treatment Log
              </h3>
              <span className="text-[10px] font-black text-gray-400">{history.length} SAVED</span>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-3xl mb-2 opacity-20">📂</div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase">No records found</p>
                </div>
              ) : (
                history.map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 transition-all group">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-[12px] font-black text-gray-900">{item.diseaseName}</h5>
                      <span className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase ${
                        item.severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                      }`}>{item.severity}</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-bold mb-3">{new Date(item.createdAt).toLocaleDateString()}</div>
                    <div className="text-[10px] text-green-700 font-medium leading-relaxed bg-white p-2 rounded-lg border border-green-50 italic">
                      "{item.treatment.substring(0, 60)}..."
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-800 p-8 rounded-3xl text-white shadow-xl">
            <h4 className="font-black mb-3">AI Expert Assist</h4>
            <p className="text-[11px] opacity-80 font-medium mb-6 leading-relaxed">Need more details? Send your diagnosis to a human officer for manual verification.</p>
            <button className="w-full bg-white/20 backdrop-blur-md text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all">Connect to Officer</button>
          </div>
        </div>

      </div>
    </div>
  );
}
