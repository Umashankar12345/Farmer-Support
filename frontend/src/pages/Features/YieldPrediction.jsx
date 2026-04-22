import React from 'react';
import './Features.css';

const YieldPrediction = () => {
  return (
    <div className="features-root f-page">
      <div className="page-hdr">
        <div>
          <div className="page-title">📈 Yield Prediction — Historical vs AI Forecast</div>
          <div className="page-sub">Last 3 years actual · This year AI prediction · District average comparison</div>
        </div>
      </div>

      <div className="g12">
        <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
          <div className="scard" style={{cursor:'default'}}>
            <div className="scard-top-bar" style={{background:'#22c55e'}}></div>
            <div className="scard-row"><div className="scard-ic" style={{background:'#dcfce7'}}>🌾</div><span className="f-badge bg">+8.4%</span></div>
            <div className="scard-val">14.2 T</div>
            <div className="scard-lbl">2025 AI Prediction</div>
            <div className="scard-sub" style={{color:'#16a34a'}}>▲ Best year in 4 years</div>
          </div>
          <div className="scard" style={{cursor:'default'}}>
            <div className="scard-top-bar" style={{background:'#1d4ed8'}}></div>
            <div className="scard-row"><div className="scard-ic" style={{background:'#dbeafe'}}>📊</div><span className="f-badge bb">Avg</span></div>
            <div className="scard-val">11.8 T</div>
            <div className="scard-lbl">District Average</div>
            <div className="scard-sub" style={{color:'var(--muted)'}}>+2.4T above avg</div>
          </div>
        </div>

        <div className="f-card">
          <div className="ct">Yield Trend (2022–2025)
            <div style={{display:'flex', gap:'10px'}}>
              <div style={{display:'flex', alignItems:'center', gap:'4px', fontSize:'10px', color:'var(--muted)'}}><div style={{width:'16px', height:'2.5px', background:'#16a34a', borderRadius:'2px'}}></div>Your Farm</div>
              <div style={{display:'flex', alignItems:'center', gap:'4px', fontSize:'10px', color:'var(--muted)'}}><div style={{width:'16px', height:'2.5px', background:'#f59e0b', borderRadius:'2px', border:'1px dashed #f59e0b'}}></div>AI Forecast</div>
              <div style={{display:'flex', alignItems:'center', gap:'4px', fontSize:'10px', color:'var(--muted)'}}><div style={{width:'16px', height:'1.5px', background:'#93c5fd', borderRadius:'2px', border:'1px dashed #93c5fd'}}></div>District Avg</div>
            </div>
          </div>
          <div className="chart-wrap">
            <svg viewBox="0 0 420 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity=".4"/>
                  <stop offset="100%" stopColor="#16a34a" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <line x1="40" y1="10" x2="40" y2="130" stroke="#e2f0e7" strokeWidth="1"/>
              <line x1="40" y1="130" x2="410" y2="130" stroke="#e2f0e7" strokeWidth="1"/>
              <line x1="40" y1="90" x2="410" y2="90" stroke="#e2f0e7" strokeWidth="1" strokeDasharray="3,3"/>
              
              <text x="32" y="133" className="chart-label" textAnchor="end">8T</text>
              <text x="32" y="93" className="chart-label" textAnchor="end">11T</text>
              <text x="32" y="63" className="chart-label" textAnchor="end">13T</text>
              <text x="32" y="33" className="chart-label" textAnchor="end">15T</text>

              <text x="100" y="148" className="chart-label" textAnchor="middle">2022</text>
              <text x="180" y="148" className="chart-label" textAnchor="middle">2023</text>
              <text x="260" y="148" className="chart-label" textAnchor="middle">2024</text>
              <text x="340" y="148" className="chart-label" textAnchor="middle">2025</text>

              <polyline className="chart-line-avg" points="100,95 180,90 260,88 340,85"/>
              <polyline className="chart-line-act" points="100,110 180,95 260,75"/>
              <polygon className="chart-area" points="100,110 180,95 260,75 260,130 100,130"/>
              <polyline className="chart-line-pred" points="260,75 340,42"/>

              <circle cx="100" cy="110" r="4" className="chart-dot" stroke="#16a34a" />
              <circle cx="180" cy="95" r="4" className="chart-dot" stroke="#16a34a" />
              <circle cx="260" cy="75" r="4" className="chart-dot" stroke="#16a34a" />
              <circle cx="340" cy="42" r="5" className="chart-dot" stroke="#f59e0b" strokeWidth="2.5" />
              
              <text x="100" y="106" className="chart-label" textAnchor="middle" fill="#16a34a" fontWeight="700">10.2T</text>
              <text x="180" y="91" className="chart-label" textAnchor="middle" fill="#16a34a" fontWeight="700">11.8T</text>
              <text x="260" y="71" className="chart-label" textAnchor="middle" fill="#16a34a" fontWeight="700">13.1T</text>
              <text x="340" y="38" className="chart-label" textAnchor="middle" fill="#f59e0b" fontWeight="700">14.2T ✦</text>

              <rect x="298" y="15" width="68" height="18" rx="6" fill="#f59e0b" opacity=".15"/>
              <text x="332" y="27" className="chart-label" textAnchor="middle" fill="#b45309" fontWeight="700" fontSize="9">AI FORECAST</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="f-card" style={{marginTop:'12px'}}>
        <div className="ct">Crop-wise Yield Prediction 2025</div>
        <div className="hbar"><div className="hbar-n">Mustard (4.2Ha)<span className="hbar-sub">Rabi · AI: 94% conf.</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'88%', background:'#16a34a'}}></div></div><div className="hbar-v" style={{color:'#16a34a'}}>6.2T</div></div>
        <div className="hbar"><div className="hbar-n">Wheat (2.8Ha)<span className="hbar-sub">Rabi · AI: 89% conf.</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'72%', background:'#16a34a'}}></div></div><div className="hbar-v" style={{color:'#16a34a'}}>4.8T</div></div>
        <div className="hbar"><div className="hbar-n">Millet (1.5Ha)<span className="hbar-sub">Kharif · AI: 91% conf.</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'48%', background:'#ca8a04'}}></div></div><div className="hbar-v" style={{color:'#ca8a04'}}>3.2T</div></div>
        <div className="hbar"><div className="hbar-n">District Average<span className="hbar-sub">All crops combined</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'62%', background:'#93c5fd'}}></div></div><div className="hbar-v" style={{color:'#1d4ed8'}}>11.8T</div></div>
      </div>
    </div>
  );
};

export default YieldPrediction;
