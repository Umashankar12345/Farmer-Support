import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function MyFarm() {
  const navigate = useNavigate();

  const [farms, setFarms] = useState([]);
  const [actions, setActions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newFarm, setNewFarm] = useState({
    name: '',
    location: '',
    acres: '',
    soilType: 'Loamy',
    crop: '',
    irrigationType: 'Rainfed',
    sowingDate: ''
  });

  const fetchFarms = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token') || localStorage.getItem('krishi_jwt');
      const response = await axios.get(`${API_URL}/api/fields`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const fetchedFarms = response.data.fields || [];
      setFarms(fetchedFarms);

      // Aggregate action items from all fields into one list
      let allActions = [];
      fetchedFarms.forEach((f) => {
        if (f.actions && Array.isArray(f.actions)) {
          allActions = [...allActions, ...f.actions];
        }
      });
      setActions(allActions.slice(0, 4));
    } catch (err) {
      console.error('Failed to fetch farms:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('krishi_jwt');
      await axios.post(`${API_URL}/api/fields/register`, newFarm, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowModal(false);
      setNewFarm({
        name: '', location: '', acres: '', soilType: 'Loamy',
        crop: '', irrigationType: 'Rainfed', sowingDate: ''
      });

      // Refresh so the newly registered field's real computed growth/health/actions show up
      await fetchFarms();
    } catch (err) {
      console.error('Failed to register farm:', err);
      alert(err.response?.data?.error || 'Registration failed. Please check inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)' }}>My Farming Portfolio</div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Managing {farms.length} active fields
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

      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)', fontWeight: 600 }}>
          Loading your fields...
        </div>
      ) : (
        <div className="grid grid-3" style={{ marginBottom: '24px' }}>
          {farms.map((f) => (
            <div
              key={f.id}
              className="card"
              onClick={() => navigate(`/farms/${f.id}`)}
              style={{ borderTop: '4px solid var(--g3)', animation: 'fadeInUp 0.4s ease-out', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ fontWeight: 800, fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px' }}>
                  FIELD ID: {f.id.slice(-4)}
                </div>
                <div className="badge b-green" style={{ fontSize: '9px' }}>{f.status}</div>
              </div>

              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>
                {f.fieldName || f.cropName}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '16px', fontWeight: 600 }}>
                {f.location
                  ? `${f.location} • ${f.areaHectares ? (f.areaHectares / 0.404686).toFixed(1) + ' Acres' : ''}`
                  : `${f.areaHectares} Ha`}
              </div>

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
                  <div style={{ fontSize: '15px', fontWeight: 900, color: f.health < 60 ? '#b91c1c' : '#166534' }}>{f.health}%</div>
                </div>
                <div style={{ flex: 1, background: 'var(--g5)', padding: '10px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '8px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Yield Est.</div>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: f.health > 80 ? '#166534' : 'var(--muted)' }}>
                    {f.health > 80 ? 'High' : 'Avg'}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {farms.length === 0 && (
            <div style={{ gridColumn: 'span 3', padding: '40px', textAlign: 'center', background: '#f8fafc', borderRadius: '12px', border: '2px dashed #cbd5e1' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>🌱</div>
              <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>No fields registered yet.</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                Click "Register New Farm" to start tracking your fields using real growth and soil-based rules.
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <div className="card-title">Soil Health Trends</div>
          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '0 10px', marginTop: '20px' }}>
            {[60, 45, 80, 55, farms.length > 0 ? farms[0].health : 0].map((h, i) => (
              <div key={i} style={{ flex: 1, background: 'var(--g4)', height: `${h}%`, borderRadius: '6px 6px 0 0', position: 'relative', transition: 'height 1s ease-out' }}>
                <div style={{ position: 'absolute', top: '-22px', width: '100%', textAlign: 'center', fontSize: '9px', fontWeight: 900, color: 'var(--g2)' }}>{h}%</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '10px', fontWeight: 800, color: 'var(--muted)', padding: '0 5px' }}>
            <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>CURRENT</span>
          </div>
          {/* NOTE: Jan-Apr are still placeholder bars. A fully real version needs a
              historical health-score log per field, saved over time - not built yet. */}
        </div>

        <div className="card">
          <div className="card-title">Awaiting Action</div>
          <div>
            {actions.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 0', borderBottom: i < actions.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ fontSize: '18px' }}>{a.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{a.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{a.sub}</div>
                </div>
              </div>
            ))}
            {actions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)', fontSize: '11px', fontWeight: 600 }}>
                ALL TASKS COMPLETED ✅<br />(Or no fields registered to analyze)
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', width: '480px', maxWidth: '90%' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Register New Farm</div>
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Farm Name</label>
                <input required className="input-v2" placeholder="e.g. North Plot" value={newFarm.name} onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })} style={{ width: '100%', height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 16px', fontSize: '13px', outline: 'none' }} />
              </div>

              <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Location / Village</label>
                  <input required className="input-v2" placeholder="e.g. Sikar" value={newFarm.location} onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })} style={{ width: '100%', height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 16px', fontSize: '13px', outline: 'none' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Acres</label>
                  <input required type="number" step="0.1" className="input-v2" placeholder="e.g. 5" value={newFarm.acres} onChange={(e) => setNewFarm({ ...newFarm, acres: e.target.value })} style={{ width: '100%', height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 16px', fontSize: '13px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Crop Name</label>
                  <input required className="input-v2" placeholder="e.g. Wheat" value={newFarm.crop} onChange={(e) => setNewFarm({ ...newFarm, crop: e.target.value })} style={{ width: '100%', height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 16px', fontSize: '13px', outline: 'none' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Sowing Date</label>
                  <input required type="date" className="input-v2" value={newFarm.sowingDate} onChange={(e) => setNewFarm({ ...newFarm, sowingDate: e.target.value })} style={{ width: '100%', height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 16px', fontSize: '13px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Soil Type</label>
                  <select required className="input-v2" value={newFarm.soilType} onChange={(e) => setNewFarm({ ...newFarm, soilType: e.target.value })} style={{ width: '100%', height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 16px', fontSize: '13px', outline: 'none' }}>
                    <option value="Loamy">Loamy</option>
                    <option value="Clay">Clay</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Black">Black Soil</option>
                    <option value="Red">Red Soil</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Irrigation</label>
                  <select required className="input-v2" value={newFarm.irrigationType} onChange={(e) => setNewFarm({ ...newFarm, irrigationType: e.target.value })} style={{ width: '100%', height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 16px', fontSize: '13px', outline: 'none' }}>
                    <option value="Rainfed">Rainfed</option>
                    <option value="Canal">Canal</option>
                    <option value="Tube Well">Tube Well</option>
                    <option value="Drip">Drip</option>
                    <option value="Sprinkler">Sprinkler</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                  style={{ flex: 1, height: '48px', fontWeight: 700, background: '#f1f5f9', border: 'none', borderRadius: '12px' }}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-green"
                  style={{ flex: 1, height: '48px', fontWeight: 900 }}
                >
                  {isSubmitting ? 'SAVING...' : 'REGISTER FARM'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
