import React from 'react';

const SCHEMES = [
  { name: 'PM-KISAN Samman Nidhi', entitlement: '₹6,000 / year', status: 'Active', next: '18 Days' },
  { name: 'Kisan Credit Card (KCC)', entitlement: 'Credit up to ₹3L', status: 'Verified', next: 'N/A' },
  { name: 'Soil Health Card Scheme', entitlement: 'Free Testing', status: 'Pending', next: '7 Days' }
];

export default function SchemesPage() {
  return (
    <>
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: 800 }}>Government Schemes & Subsidies</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Track your active enrollments and check eligibility for new programs</div>
        </div>
        <button className="btn btn-green">BROWSE ALL SCHEMES</button>
      </header>

      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        {SCHEMES.map((s, i) => (
          <div key={i} className="card">
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div className="badge b-amber">PROGRAM ENROLLED</div>
                <div style={{ fontSize: '14px' }}>{s.status === 'Active' ? '✅' : '⏳'}</div>
             </div>
             <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>{s.name}</div>
             <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--g2)', marginBottom: '16px' }}>{s.entitlement}</div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700, paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>NEXT INSTALLMENT</span>
                <span>{s.next}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="card">
         <div className="card-title">Available for Application</div>
         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
            <thead>
               <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '12px', fontSize: '11px', color: 'var(--muted)' }}>SCHEME NAME</th>
                  <th style={{ padding: '12px', fontSize: '11px', color: 'var(--muted)' }}>BENEFIT TYPE</th>
                  <th style={{ padding: '12px', fontSize: '11px', color: 'var(--muted)' }}>ELIGIBILITY</th>
                  <th style={{ padding: '12px', fontSize: '11px', color: 'var(--muted)' }}>ACTION</th>
               </tr>
            </thead>
            <tbody>
               {[
                 { name: 'PM Krishi Sinchai Yojana', type: 'Drip Irrigation Subsidy', eli: 'Land owner (all farmers)' },
                 { name: 'Paramparagat Krishi Vikas', type: 'Organic Farming Grant', eli: 'Group of 20+ farmers' },
                 { name: 'Rashtriya Krishi Vikas', type: 'Infra Development', eli: 'FPOs / Cooperatives' }
               ].map((item, i) => (
                 <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px', fontWeight: 800, fontSize: '12px' }}>{item.name}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{item.type}</td>
                    <td style={{ padding: '12px', fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>{item.eli}</td>
                    <td style={{ padding: '12px' }}>
                       <button className="btn btn-green" style={{ fontSize: '9px', padding: '4px 12px' }}>APPLY</button>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </>
  );
}
