import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Fertilizer() {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState('Paddy');
  
  const fertilizerData = [
    { id: 1, crop: "Paddy", fertilizer: "Urea", quantity: "100 kg/ha", time: "Before sowing", method: "Broadcast evenly" },
    { id: 2, crop: "Wheat", fertilizer: "DAP", quantity: "80 kg/ha", time: "During sowing", method: "Drill with seeds" },
    { id: 3, crop: "Cotton", fertilizer: "NPK", quantity: "120 kg/ha", time: "After 30 days", method: "Side dressing" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <i className="fas fa-tractor" style={{fontSize: '32px', color: '#2a6e3f'}}></i>
          <h1>Digital <span>Krishi</span> Officer</h1>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/dashboard" style={{background: '#f0f0f0', color: '#333', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none'}}>
            Back to Dashboard
          </Link>
          <button onClick={handleLogout} style={{background: '#f0f0f0', color: '#333'}}>
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px' }}>
        <aside className="card" style={{ height: 'fit-content' }}>
          <h3 style={{ marginBottom: '20px' }}>Navigation</h3>
          <nav>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '15px' }}>
                <Link to="/dashboard" style={{ display: 'block', textAlign: 'center', background: '#f0f0f0', color: '#333', padding: '10px', borderRadius: '8px', textDecoration: 'none' }}>
                  Dashboard
                </Link>
              </li>
              <li style={{ marginBottom: '15px' }}>
                <Link to="/fertilizer" style={{ display: 'block', textAlign: 'center', background: '#2a6e3f', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none' }}>
                  Fertilizer Recommendations
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main>
          <div className="card">
            <h2>Fertilizer Recommendations</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                Select Crop:
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
              >
                <option value="Paddy">Paddy</option>
                <option value="Wheat">Wheat</option>
                <option value="Cotton">Cotton</option>
              </select>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#2a6e3f', color: 'white' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Crop</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Fertilizer</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Quantity</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Application Time</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Method</th>
                  </tr>
                </thead>
                <tbody>
                  {fertilizerData
                    .filter(item => item.crop === selectedCrop)
                    .map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px' }}>{item.crop}</td>
                        <td style={{ padding: '12px' }}>{item.fertilizer}</td>
                        <td style={{ padding: '12px' }}>{item.quantity}</td>
                        <td style={{ padding: '12px' }}>{item.time}</td>
                        <td style={{ padding: '12px' }}>{item.method}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Fertilizer;