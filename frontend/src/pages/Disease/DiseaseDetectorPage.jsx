import React from 'react';
import DiseaseDetector from '../Query/components/DiseaseDetector';

export default function DiseaseDetectorPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8 bg-white p-8 rounded-3xl border border-[#d4e8d0] shadow-sm">
        <h1 className="text-3xl font-black text-[#111] tracking-tight mb-2">Plant Disease Diagnosis</h1>
        <p className="text-[13px] text-gray-500 font-bold leading-relaxed">
          Powered by Advanced Vision AI. Upload a clear photo of the affected plant area to receive instant identification and treatment recommendations.
        </p>
      </header>
      
      <DiseaseDetector />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#14301f] p-6 rounded-3xl text-white">
          <h4 className="font-bold mb-2">How to get better results?</h4>
          <ul className="text-[11px] opacity-80 space-y-2 font-medium">
            <li>• Ensure proper lighting (natural daylight is best)</li>
            <li>• Keep the camera focus on the affected leaves/stem</li>
            <li>• Capture both the front and back of the leaf if possible</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#cde4c6] shadow-sm">
          <h4 className="font-bold text-[#14301f] mb-2">Verified Treatments</h4>
          <p className="text-[11px] text-gray-500 font-bold leading-relaxed">
            All recommendations are cross-referenced with the latest agricultural standards for Rajasthan and Punjab regions.
          </p>
        </div>
      </div>
    </div>
  );
}
