import React, { useState } from 'react';

export default function DiseaseDetector() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAnalyzing(true);
    setResult(null);

    // Simulate AI Analysis
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        disease: 'Wheat Yellow Rust',
        confidence: 94.2,
        severity: 'Moderate',
        treatment: 'Apply Propiconazole 25% EC at 200ml/acre with 200L water.'
      });
    }, 3000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mt-8 group transition-all hover:border-blue-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>📸</span> Disease Detector
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-1">Upload a photo of your crop to identify diseases instantly.</p>
        </div>
        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded tracking-tighter ring-1 ring-blue-100">Vision AI</span>
      </div>

      {!result && !analyzing && (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl py-12 cursor-pointer hover:bg-gray-50 transition-all group/label">
          <span className="text-4xl mb-4 group-hover/label:scale-110 transition-transform">📤</span>
          <span className="text-sm font-bold text-gray-500">Click to Upload Image</span>
          <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Supports JPG, PNG</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
        </label>
      )}

      {analyzing && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-blue-600 mt-4 animate-pulse">Running CNN Analysis...</p>
        </div>
      )}

      {result && (
        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-4">
             <h4 className="font-bold text-blue-900">{result.disease}</h4>
             <span className="text-xs bg-white px-2 py-1 rounded-full text-blue-600 font-black shadow-sm ring-1 ring-blue-100">{result.confidence}% Match</span>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-blue-400">Severity</span>
                <span className="text-amber-600">{result.severity}</span>
             </div>
             <div className="p-3 bg-white rounded-xl text-xs text-gray-700 leading-relaxed border border-blue-50 font-medium italic">
                "{result.treatment}"
             </div>
             <button onClick={() => setResult(null)} className="w-full py-2 text-[10px] font-black uppercase text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors mt-2">Scale New Analysis</button>
          </div>
        </div>
      )}
    </div>
  );
}
