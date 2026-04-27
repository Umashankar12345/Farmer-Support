import React, { useState, useRef, useEffect } from 'react';

export default function DiseaseDetector() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [stream, setStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const API_BASE = window.location.origin.includes('localhost') ? 'http://localhost:5000' : '';

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      alert('Camera access denied or not supported.');
    }
  };

  const stopCamera = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    setStream(null);
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      handleAnalysis(blob);
    }, 'image/jpeg');
    
    stopCamera();
  };

  const handleAnalysis = async (imageBlob) => {
    setAnalyzing(true);
    setResult(null);

    const formData = new FormData();
    formData.append('image', imageBlob, 'capture.jpg');
    formData.append('cropType', 'General');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/diagnosis/analyze`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) setResult(data.diagnosis);
    } catch (error) {
      console.error('Analysis failed', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mt-8 group transition-all hover:border-green-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>🔍</span> Precision Disease Analysis
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-1">Scan your crop to detect invisible fungal or bacterial threats.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded tracking-tighter ring-1 ring-green-100">Live Camera</span>
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded tracking-tighter ring-1 ring-blue-100">Vision AI</span>
        </div>
      </div>

      {!result && !analyzing && !showCamera && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={startCamera}
            className="flex flex-col items-center justify-center border-2 border-dashed border-green-200 rounded-2xl py-12 cursor-pointer hover:bg-green-50 transition-all group/cam"
          >
            <span className="text-4xl mb-4 group-hover/cam:scale-110 transition-transform">📸</span>
            <span className="text-sm font-bold text-green-700">Open Camera</span>
            <span className="text-[10px] text-green-400 mt-1 uppercase font-bold tracking-widest">Capture Leaf Photo</span>
          </button>

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl py-12 cursor-pointer hover:bg-gray-50 transition-all group/label">
            <span className="text-4xl mb-4 group-hover/label:scale-110 transition-transform">📤</span>
            <span className="text-sm font-bold text-gray-500">Upload from Gallery</span>
            <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Supports JPG, PNG</span>
            <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files[0] && handleAnalysis(e.target.files[0])} />
          </label>
        </div>
      )}

      {showCamera && (
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
            <button onClick={stopCamera} className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-xl text-xs font-bold">Cancel</button>
            <button onClick={capturePhoto} className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl shadow-green-500/40">📸</button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {analyzing && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-green-600 mt-6 animate-pulse uppercase tracking-widest">Running Deep-Link CNN Analysis...</p>
          <p className="text-[10px] text-gray-400 mt-2 font-medium">Checking for 14,000+ known pathogens</p>
        </div>
      )}

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100 mb-6">
            <div className="flex justify-between items-center mb-4">
               <div>
                 <div className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Diagnosis Confirmed</div>
                 <h4 className="font-black text-xl text-gray-900">{result.diseaseName}</h4>
               </div>
               <span className="text-xs bg-white px-3 py-1 rounded-full text-green-700 font-black shadow-sm ring-1 ring-green-100">{result.confidence}% Match</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-white rounded-xl border border-green-50">
                <div className="text-[9px] font-black text-gray-400 uppercase mb-1">Severity Level</div>
                <div className={`text-sm font-black ${result.severity === 'Critical' ? 'text-red-600' : 'text-amber-600'}`}>⚠️ {result.severity}</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-green-50">
                <div className="text-[9px] font-black text-gray-400 uppercase mb-1">Potential Yield Loss</div>
                <div className="text-sm font-black text-gray-800">📉 {result.yieldLoss}</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-green-50 mb-6">
               <div className="text-[9px] font-black text-green-600 uppercase mb-2">Recommended Treatment</div>
               <p className="text-[13px] text-gray-700 leading-relaxed font-medium">🛡️ {result.treatment}</p>
            </div>

            {/* Progression Timeline */}
            <div className="mt-8">
              <h5 className="text-[11px] font-black text-gray-400 uppercase mb-4 tracking-widest">Disease Spread Timeline (Untreated)</h5>
              <div className="flex justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2"></div>
                {result.timeline.map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 border-4 border-white shadow-sm mb-2"></div>
                    <div className="text-[9px] font-black text-gray-900">Day {step.day}</div>
                    <div className="text-[8px] font-bold text-gray-400 uppercase mt-1">{step.status}</div>
                    <div className="mt-2 text-[10px] font-black text-red-500">{step.spread}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button onClick={() => setResult(null)} className="w-full py-4 text-[11px] font-black uppercase text-green-700 bg-green-50 rounded-xl hover:bg-green-100 transition-colors border border-green-100">Scan Another Plant</button>
        </div>
      )}
    </div>
  );
}
