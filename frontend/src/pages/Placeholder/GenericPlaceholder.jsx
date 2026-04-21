import React from 'react';

export default function GenericPlaceholder({ title, description, icon }) {
  return (
    <>
      <header style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '22px', fontWeight: 800 }}>{title}</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{description} • Rajasthan Portal</div>
      </header>

      <div className="card" style={{ textAlign: 'center', padding: '100px 20px' }}>
         <div style={{ fontSize: '60px', marginBottom: '24px' }}>{icon || '🚧'}</div>
         <div style={{ fontSize: '20px', fontWeight: 800 }}>{title} Module</div>
         <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px', maxWidth: '400px', margin: '12px auto' }}>
            This specialized module is currently being calibrated with live agricultural data. Please check back shortly or return to your Executive Dashboard.
         </div>
         <button className="btn btn-green" style={{ marginTop: '24px' }} onClick={() => window.location.href = '/'}>
            RETURN TO DASHBOARD
         </button>
      </div>
    </>
  );
}
