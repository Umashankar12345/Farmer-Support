import React, { useState, useEffect } from 'react';

const INITIAL_FARMS = [
  { id: '1', crop: 'Mustard', area: '4.2 Hectares', health: 92, status: 'Vegetative', growth: 65 },
  { id: '2', crop: 'Wheat', area: '2.8 Hectares', health: 88, status: 'Flowering', growth: 40 },
  { id: '3', crop: 'Millet', area: '1.5 Hectares', health: 95, status: 'Harvesting', growth: 98 }
];

export default function MyFarm() {
  const [farms, setFarms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFarm, setNewFarm] = useState({ crop: '', area: '', status: 'Vegetative' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedFarms = localStorage.getItem('krishi_farms');
    if (savedFarms) {
      setFarms(JSON.parse(savedFarms));
    } else {
      setFarms(INITIAL_FARMS);
    }
  }, []);

  const saveFarms = (updated) => {
    setFarms(updated);
    localStorage.setItem('krishi_farms', JSON.stringify(updated));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const added = [
        ...farms,
        { 
          id: Date.now().toString(), 
          ...newFarm, 
          health: Math.floor(Math.random() * 15) + 80, // Random health for new farm
          growth: 10 
        }
      ];
      saveFarms(added);
      setShowModal(false);
      setNewFarm({ crop: '', area: '', status: 'Vegetative' });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="relative">
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)' }}>My Farming Portfolio</div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Managing {farms.length} active fields across Rajasthan
          </div>
        </div>
        <button 
          className="btn btn-green" 
          onClick={() => setShowModal(true)}
          style={{ transition: 'all 0.2s', transform: showModal ? 'scale(0.95)' : 'scale(1)' }}
        >
          + REGISTER NEW FARM
        </button>
      </header>

      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        {farms.map(f => (
          <div key={f.id} className="card" style={{ borderTop: `4px solid var(--g3)`, animation: 'fadeInUp 0.4s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontWeight: 800, fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px' }}>FIELD ID: {f.id.slice(-4)}</div>
              <div className="badge b-green" style={{ fontSize: '9px' }}>{f.status}</div>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>{f.crop}</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '16px', fontWeight: 600 }}>{f.area}</div>
            
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 800, marginBottom: '5px', color: 'var(--muted)' }}>
                <span>GROWTH PROGRESS</span>
                <span style={{ color: 'var(--g2)' }}>{f.growth}%</span>
              </div>
              <div style={{ height: '7px', background: '#f0fdf4', borderRadius: '4px', overflow: 'hidden', border: '1px solid #dcfce7' }}>
                <div style={{ width: `${f.growth}%`, height: '100%', background: 'linear-gradient(90deg, var(--g3), #22c55e)', borderRadius: '4px', transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1, background: 'var(--g5)', padding: '10px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '8px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Health</div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#166534' }}>{f.health}%</div>
              </div>
              <div style={{ flex: 1, background: 'var(--g5)', padding: '10px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '8px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Yield Est.</div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#166534' }}>High</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-title">Soil Health Trends</div>
          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '0 10px', marginTop: '20px' }}>
             {[60, 45, 80, 55, 90].map((h, i) => (
                <div key={i} style={{ flex: 1, background: 'var(--g4)', height: `${h}%`, borderRadius: '6px 6px 0 0', position: 'relative', transition: 'height 1s ease-out' }}>
                  <div style={{ position: 'absolute', top: '-22px', width: '100%', textAlign: 'center', fontSize: '9px', fontWeight: 900, color: 'var(--g2)' }}>{h}%</div>
                </div>
             ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '10px', fontWeight: 800, color: 'var(--muted)', padding: '0 5px' }}>
             <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span>
          </div>
        </div>
        
        <div className="card" style={{ background: '#f8fafc', border: '2px dashed #cbd5e1' }}>
           <div className="card-title">Awaiting Action</div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🧪', title: 'Collect Soil Samples', sub: 'Farm B requires nutrient re-testing.' },
                { icon: '💧', title: 'Irrigation Alert', sub: 'High moisture expected per forecast.' }
              ].map((act, i) => (
                <div key={i} className="action-item" style={{ background: '#fff', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', gap: '14px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                   <div style={{ fontSize: '24px', background: '#f1f5f9', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{act.icon}</div>
                   <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>{act.title}</div>
                      <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>{act.sub}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div 
          style={{ 
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'rgba(15, 33, 21, 0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            className="card" 
            style={{ width: '420px', padding: '32px', border: 'none', position: 'relative' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.5px' }}>Register New Farm</h2>
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px', fontWeight: 600 }}>Enter your field details to start AI monitoring.</p>
            </div>

            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Crop Name</label>
                <input 
                  autoFocus
                  required
                  className="input-v2"
                  placeholder="e.g. Cotton, Soybean, Wheat"
                  value={newFarm.crop}
                  onChange={e => setNewFarm({...newFarm, crop: e.target.value})}
                  style={{ width: '100%', height: '44px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 16px', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Area (Hectares)</label>
                <input 
                  required
                  className="input-v2"
                  placeholder="e.g. 5.5 Hectares"
                  value={newFarm.area}
                  onChange={e => setNewFarm({...newFarm, area: e.target.value})}
                  style={{ width: '100%', height: '44px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 16px', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  type="button"
                  className="btn" 
                  onClick={() => setShowModal(false)}
                  style={{ flex: 1, height: '48px', fontWeight: 800 }}
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-green" 
                  style={{ flex: 1, height: '48px', fontWeight: 900 }}
                >
                  {isSubmitting ? 'SECURELY SAVING...' : 'REGISTER FARM'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
