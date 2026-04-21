import React from 'react';

const FARMS = [
  { id: 'A', crop: 'Mustard', area: '4.2 Hectares', health: 92, status: 'Vegetative', growth: 65 },
  { id: 'B', crop: 'Wheat', area: '2.8 Hectares', health: 88, status: 'Flowering', growth: 40 },
  { id: 'C', crop: 'Millet', area: '1.5 Hectares', health: 95, status: 'Harvesting', growth: 98 }
];

export default function MyFarm() {
  return (
    <>
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: 800 }}>My Farming Portfolio</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Managing 3 active fields across Rajasthan</div>
        </div>
        <button className="btn btn-green">+ REGISTER NEW FARM</button>
      </header>

      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        {FARMS.map(f => (
          <div key={f.id} className="card" style={{ borderTop: `4px solid var(--g3)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontWeight: 800, fontSize: '11px', color: 'var(--muted)' }}>FARM {f.id}</div>
              <div className="badge b-green">{f.status}</div>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>{f.crop}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>{f.area}</div>
            
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700, marginBottom: '4px' }}>
                <span>GROWTH PROGRESS</span>
                <span>{f.growth}%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--g5)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${f.growth}%`, height: '100%', background: 'var(--g3)' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, background: 'var(--g5)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--muted)' }}>HEALTH</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--g2)' }}>{f.health}%</div>
              </div>
              <div style={{ flex: 1, background: 'var(--g5)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--muted)' }}>YIELD EST.</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--g2)' }}>High</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-title">Soil Health Trends</div>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '0 20px' }}>
             {[60, 45, 80, 55, 90].map((h, i) => (
               <div key={i} style={{ flex: 1, background: 'var(--g4)', height: `${h}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '-20px', width: '100%', textAlign: 'center', fontSize: '10px', fontWeight: 800 }}>{h}%</div>
               </div>
             ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '10px', fontWeight: 700, color: 'var(--muted)' }}>
             <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span>
          </div>
        </div>
        
        <div className="card" style={{ background: 'var(--g5)', border: '1px dashed var(--g3)' }}>
           <div className="card-title">Awaiting Action</div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                 <div style={{ fontSize: '20px' }}>🧪</div>
                 <div>
                    <div style={{ fontSize: '12px', fontWeight: 800 }}>Collect Soil Samples</div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Farm B requires nutrient re-testing.</div>
                 </div>
              </div>
              <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                 <div style={{ fontSize: '20px' }}>💧</div>
                 <div>
                    <div style={{ fontSize: '12px', fontWeight: 800 }}>Irrigation Alert</div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)' }}>High moisture expected per forecast.</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </>
  );
}
