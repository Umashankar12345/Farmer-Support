import React, { useState, useEffect } from 'react';
import './Features.css';

const YieldPrediction = () => {
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogForm, setShowLogForm] = useState(false);
  
  // Form State
  const [logForm, setLogForm] = useState({
    cropName: 'Wheat',
    seasonYear: new Date().getFullYear() - 1,
    yieldAmount: '',
    area: '',
    soilPH: 6.5,
    rainfallMM: 800
  });

  const getLoggedInUserId = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);
      // Use id or _id depending on what the backend returns
      return user._id || user.id;
    } catch (e) {
      return null;
    }
  };

  const fetchPrediction = async () => {
    const userId = getLoggedInUserId();
    if (!userId) {
      setError("You must be logged in to view your yield predictions.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/yield/prediction?userId=${userId}&cropName=Wheat&area=2.5`);
      const data = await res.json();
      if (data.success && data.data) {
        setPredictionData(data.data);
      } else {
        setError(data.message || "Failed to fetch prediction.");
      }
    } catch (err) {
      console.error('Error fetching prediction:', err);
      setError("Network error. Could not fetch prediction.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    const userId = getLoggedInUserId();
    if (!userId) {
      setError("You must be logged in to log a harvest.");
      return;
    }

    try {
      const payload = { ...logForm, userId };
      
      const res = await fetch('/api/yield/harvest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setShowLogForm(false);
        fetchPrediction(); // Refresh data
      } else {
        setError(data.message || "Failed to log harvest.");
      }
    } catch (err) {
      console.error('Error logging harvest:', err);
      setError("Network error. Could not log harvest.");
    }
  };

  const renderChart = () => {
    if (!predictionData) return null;

    const historicalLogs = predictionData.historicalLogs || [];
    const predictedTotalYield = predictionData.predictedTotalYield || 0;
    
    // Default to some static coordinates if no history
    let actPoints = [];
    let years = [2022, 2023, 2024, 2025];
    let yields = [0, 0, 0, 0];
    
    // We will map based on last 3 years + current year prediction
    const startX = 100;
    const xStep = 80;
    const baseY = 130; // 0 Tons
    
    const getY = (val) => baseY - (val * 5); // 1 Ton = 5px height for demo
    
    // Fill history (safely handle empty array)
    historicalLogs.slice(-3).forEach((log, index) => {
      // align right if less than 3 logs
      const targetIndex = 3 - historicalLogs.length + index; 
      years[targetIndex] = log.seasonYear;
      yields[targetIndex] = log.yieldAmount;
    });
    
    // Fill Prediction
    years[3] = new Date().getFullYear();
    yields[3] = parseFloat(predictedTotalYield);

    // Filter points that have values > 0 for actual points
    const actualData = yields.slice(0, 3).map((y, i) => ({ y, i })).filter(d => d.y > 0);
    actPoints = actualData.map(d => `${startX + d.i * xStep},${getY(d.y)}`).join(' ');
    
    const predPoint = `${startX + 3 * xStep},${getY(yields[3])}`;
    
    return (
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
        
        <text x="32" y="133" className="chart-label" textAnchor="end">0T</text>
        <text x="32" y="83" className="chart-label" textAnchor="end">10T</text>
        <text x="32" y="33" className="chart-label" textAnchor="end">20T</text>

        {years.map((year, i) => (
          <text key={year} x={startX + i * xStep} y="148" className="chart-label" textAnchor="middle">{year}</text>
        ))}

        {actPoints && (
          <>
            <polyline className="chart-line-act" points={actPoints}/>
            {actualData.map((d) => (
              <circle key={d.i} cx={startX + d.i * xStep} cy={getY(d.y)} r="4" className="chart-dot" stroke="#16a34a" />
            ))}
            {actualData.map((d) => (
              <text key={`t${d.i}`} x={startX + d.i * xStep} y={getY(d.y) - 8} className="chart-label" textAnchor="middle" fill="#16a34a" fontWeight="700">{d.y.toFixed(1)}T</text>
            ))}
          </>
        )}
        
        {/* Connection from last actual to predicted */}
        {actualData.length > 0 && (
           <polyline className="chart-line-pred" points={`${startX + actualData[actualData.length-1].i * xStep},${getY(actualData[actualData.length-1].y)} ${predPoint}`}/>
        )}
        
        <circle cx={startX + 3 * xStep} cy={getY(yields[3])} r="5" className="chart-dot" stroke="#f59e0b" strokeWidth="2.5" />
        <text x={startX + 3 * xStep} y={getY(yields[3]) - 10} className="chart-label" textAnchor="middle" fill="#f59e0b" fontWeight="700">{yields[3].toFixed(1)}T ✦</text>

      </svg>
    );
  };

  return (
    <div className="features-root f-page">
      <div className="page-hdr" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div className="page-title">📈 Yield Prediction</div>
          <div className="page-sub">Data-driven AI Forecast</div>
        </div>
        <button onClick={() => setShowLogForm(!showLogForm)} style={{background:'#16a34a', color:'#fff', border:'none', padding:'8px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'14px'}}>
          {showLogForm ? 'Cancel' : '+ Log Harvest'}
        </button>
      </div>

      {error && (
        <div style={{background: '#fef2f2', color: '#991b1b', padding: '12px', borderRadius: '6px', marginBottom: '16px'}}>
          {error}
        </div>
      )}

      {showLogForm && (
        <div className="f-card" style={{marginBottom: '16px'}}>
          <h3 style={{marginTop:0, marginBottom:'12px', fontSize:'16px'}}>Log Historical Harvest</h3>
          <form onSubmit={handleLogSubmit} style={{display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'flex-end'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
              <label style={{fontSize:'12px', color:'var(--muted)'}}>Crop</label>
              <input type="text" value={logForm.cropName} onChange={e => setLogForm({...logForm, cropName: e.target.value})} style={{padding:'6px', border:'1px solid #ddd', borderRadius:'4px'}} required/>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
              <label style={{fontSize:'12px', color:'var(--muted)'}}>Year</label>
              <input type="number" value={logForm.seasonYear} onChange={e => setLogForm({...logForm, seasonYear: e.target.value})} style={{padding:'6px', border:'1px solid #ddd', borderRadius:'4px', width:'80px'}} required/>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
              <label style={{fontSize:'12px', color:'var(--muted)'}}>Total Yield (T)</label>
              <input type="number" step="0.1" value={logForm.yieldAmount} onChange={e => setLogForm({...logForm, yieldAmount: e.target.value})} style={{padding:'6px', border:'1px solid #ddd', borderRadius:'4px', width:'100px'}} required/>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
              <label style={{fontSize:'12px', color:'var(--muted)'}}>Area (Ha)</label>
              <input type="number" step="0.1" value={logForm.area} onChange={e => setLogForm({...logForm, area: e.target.value})} style={{padding:'6px', border:'1px solid #ddd', borderRadius:'4px', width:'80px'}} required/>
            </div>
            <button type="submit" style={{background:'#1d4ed8', color:'#fff', border:'none', padding:'8px 16px', borderRadius:'6px', cursor:'pointer'}}>Save Log</button>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{padding:'20px', textAlign:'center', color:'var(--muted)'}}>Calculating AI prediction...</div>
      ) : !predictionData && !error ? (
        <div style={{padding:'40px 20px', textAlign:'center', background:'#f8fafc', borderRadius:'8px', border:'1px dashed #cbd5e1'}}>
          <div style={{fontSize:'24px', marginBottom:'8px'}}>🌱</div>
          <h3 style={{margin:0, color:'#334155'}}>No prediction data yet</h3>
          <p style={{color:'var(--muted)', marginTop:'8px', fontSize:'14px'}}>Log your first harvest to get a personalized AI yield forecast.</p>
          <button onClick={() => setShowLogForm(true)} style={{marginTop:'12px', background:'#16a34a', color:'#fff', border:'none', padding:'8px 16px', borderRadius:'6px', cursor:'pointer'}}>
            Log Harvest Now
          </button>
        </div>
      ) : predictionData ? (
        <>
          <div className="g12">
            <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
              <div className="scard" style={{cursor:'default'}}>
                <div className="scard-top-bar" style={{background:'#22c55e'}}></div>
                <div className="scard-row"><div className="scard-ic" style={{background:'#dcfce7'}}>🌾</div><span className="f-badge bg">AI Forecast</span></div>
                <div className="scard-val">{predictionData.predictedTotalYield} T</div>
                <div className="scard-lbl">{predictionData.cropName} ({predictionData.area}Ha)</div>
                <div className="scard-sub" style={{color:'#16a34a'}}>Based on history + weather</div>
              </div>
              <div className="scard" style={{cursor:'default'}}>
                <div className="scard-top-bar" style={{background:'#1d4ed8'}}></div>
                <div className="scard-row"><div className="scard-ic" style={{background:'#dbeafe'}}>📊</div><span className="f-badge bb">Avg</span></div>
                <div className="scard-val">{predictionData.districtAvgTotal} T</div>
                <div className="scard-lbl">District Average</div>
                <div className="scard-sub" style={{color:'var(--muted)'}}>For {predictionData.area}Ha area</div>
              </div>
            </div>

            <div className="f-card">
              <div className="ct">Yield Trend & Prediction
                <div style={{display:'flex', gap:'10px'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'4px', fontSize:'10px', color:'var(--muted)'}}><div style={{width:'16px', height:'2.5px', background:'#16a34a', borderRadius:'2px'}}></div>Your Farm</div>
                  <div style={{display:'flex', alignItems:'center', gap:'4px', fontSize:'10px', color:'var(--muted)'}}><div style={{width:'16px', height:'2.5px', background:'#f59e0b', borderRadius:'2px', border:'1px dashed #f59e0b'}}></div>AI Forecast</div>
                </div>
              </div>
              <div className="chart-wrap">
                {renderChart()}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default YieldPrediction;
