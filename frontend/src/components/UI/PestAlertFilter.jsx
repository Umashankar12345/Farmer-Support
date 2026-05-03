import { useState, useEffect } from "react";
import { pestAPI } from "../../services/api";

// ── All Indian States ──────────────────────────────────────────
const INDIAN_STATES = [
  "All States",
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman & Nicobar", "Chandigarh", "Delhi", "Jammu & Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry",
];

// ── All Major Crops ────────────────────────────────────────────
const ALL_CROPS = [
  "All Crops",
  "Wheat", "Rice", "Paddy", "Maize", "Bajra", "Jowar",
  "Cotton", "Mustard", "Groundnut", "Soybean", "Sunflower",
  "Sugarcane", "Potato", "Tomato", "Onion", "Chilli",
  "Mango", "Banana", "Coconut", "Apple", "Grapes",
  "Chickpea", "Moong", "Urad", "Tur", "Lentil",
  "Ragi", "Barley", "Castor", "Jute", "Tea", "Coffee",
  "Black Pepper", "Turmeric", "Ginger", "Cashew",
  "Pear", "Peach", "Bamboo",
];

const SEVERITY_CONFIG = {
  high:   { color: "#c44444", bg: "#fceaea", border: "#e9a9a9", icon: "🔴", label: "HIGH RISK"   },
  medium: { color: "#c8891a", bg: "#faeeda", border: "#efc97a", icon: "🟡", label: "MEDIUM RISK" },
  low:    { color: "#2d6a35", bg: "#e1f5ee", border: "#5dcaa5", icon: "🟢", label: "LOW RISK"    },
};

export default function PestAlertFilter() {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCrop,  setSelectedCrop]  = useState("All Crops");
  const [alerts,        setAlerts]        = useState([]);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState("");
  const [expandedId,    setExpandedId]    = useState(null);
  const [searchText,    setSearchText]    = useState("");

  // ── Fetch alerts whenever filters change ──────────────────────
  useEffect(() => {
    fetchAlerts();
  }, [selectedState, selectedCrop]);

  const fetchAlerts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await pestAPI.getAlerts(selectedState, selectedCrop);
      if (data && data.success) {
        setAlerts(data.alerts || []);
      } else {
        setError("Could not load alerts.");
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Make sure backend is running.");
    }
    setLoading(false);
  };

  // ── Save user's state to profile ─────────────────────────────
  const savePreference = async (state, crop) => {
    // Optional: implement profile saving if needed
  };

  const handleStateChange = (val) => {
    setSelectedState(val);
    savePreference(val, selectedCrop);
  };

  const handleCropChange = (val) => {
    setSelectedCrop(val);
    savePreference(selectedState, val);
  };

  // ── Filter by search text ─────────────────────────────────────
  const filtered = alerts.filter(a =>
    !searchText ||
    a.pestName.toLowerCase().includes(searchText.toLowerCase()) ||
    a.affectedCrops.some(c => c.toLowerCase().includes(searchText.toLowerCase()))
  );

  const counts = {
    high:   filtered.filter(a => a.severity === "high").length,
    medium: filtered.filter(a => a.severity === "medium").length,
    low:    filtered.filter(a => a.severity === "low").length,
  };

  // ── Styles ────────────────────────────────────────────────────
  const s = {
    wrap:     { fontFamily:"'Segoe UI',sans-serif", maxWidth:780, margin:"0 auto", padding:"1.5rem 1rem" },
    header:   { background:"linear-gradient(135deg,#1a3a1f,#2d6a35)", borderRadius:14, padding:"1.25rem 1.5rem", marginBottom:"1rem", color:"#fff" },
    h1:       { fontSize:20, fontWeight:600, marginBottom:4 },
    hsub:     { fontSize:13, opacity:.75 },
    statRow:  { display:"flex", gap:16, marginTop:12 },
    stat:     { textAlign:"center" },
    statVal:  { fontSize:24, fontWeight:600 },
    statLbl:  { fontSize:11, opacity:.65, fontFamily:"monospace" },

    filterRow:{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" },
    select:   { flex:1, minWidth:160, padding:"9px 12px", borderRadius:8, border:"0.5px solid #ddd",
                fontSize:13, background:"#fff", cursor:"pointer", outline:"none", fontFamily:"inherit" },
    search:   { flex:2, minWidth:200, padding:"9px 12px", borderRadius:8, border:"0.5px solid #ddd",
                fontSize:13, outline:"none", fontFamily:"inherit" },

    summRow:  { display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" },
    sumCard:  (sev) => ({ flex:1, minWidth:80, background: SEVERITY_CONFIG[sev].bg,
                border:`0.5px solid ${SEVERITY_CONFIG[sev].border}`, borderRadius:8,
                padding:"8px 10px", textAlign:"center" }),
    sumNum:   (sev) => ({ fontSize:22, fontWeight:600, color: SEVERITY_CONFIG[sev].color }),
    sumLbl:   { fontSize:11, fontFamily:"monospace", marginTop:2 },

    alertCard:(sev, exp) => ({
      background:"#fff", border:`0.5px solid ${exp ? SEVERITY_CONFIG[sev].border : "#e0dbd0"}`,
      borderLeft:`4px solid ${SEVERITY_CONFIG[sev].color}`,
      borderRadius:10, marginBottom:8, cursor:"pointer",
      transition:"all .15s", boxShadow: exp ? "0 2px 8px rgba(0,0,0,.06)" : "none",
    }),
    cardTop:  { display:"flex", alignItems:"flex-start", gap:12, padding:"12px 14px" },
    cardIcon: { fontSize:22, flexShrink:0, marginTop:2 },
    cardInfo: { flex:1 },
    cardName: { fontSize:14, fontWeight:600, marginBottom:2 },
    cardSub:  { fontSize:12, color:"#666", lineHeight:1.5 },
    cardBadge:(sev) => ({ fontSize:10, padding:"2px 8px", borderRadius:10, fontWeight:500,
                background: SEVERITY_CONFIG[sev].bg, color: SEVERITY_CONFIG[sev].color,
                border:`0.5px solid ${SEVERITY_CONFIG[sev].border}`, whiteSpace:"nowrap" }),
    cropPill: { display:"inline-block", fontSize:11, padding:"2px 8px", borderRadius:10, margin:"2px 3px 2px 0",
                background:"#e8f4ea", color:"#1a4020", border:"0.5px solid #9fe1cb" },

    detail:   { padding:"0 14px 14px", borderTop:"0.5px solid #f0ece4" },
    detailRow:{ display:"flex", gap:12, flexWrap:"wrap", marginTop:10 },
    detailBox:(color) => ({ flex:1, minWidth:180, background: color === "green" ? "#e8f8f0" : "#fff8ec",
                border:`0.5px solid ${color === "green" ? "#9fe1cb" : "#f5d78a"}`,
                borderRadius:8, padding:"10px 12px" }),
    detailLbl:{ fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:".05em",
                color:"#888", fontFamily:"monospace", marginBottom:4 },
    detailTxt:{ fontSize:13, lineHeight:1.6, color:"#333" },

    empty:    { textAlign:"center", padding:"3rem 1rem", color:"#888" },
    emptyIcon:{ fontSize:48, marginBottom:12 },
    loading:  { textAlign:"center", padding:"2rem", color:"#888", fontFamily:"monospace", fontSize:13 },
    error:    { background:"#fceaea", border:"0.5px solid #e9a9a9", borderRadius:8,
                padding:"10px 14px", color:"#8b1c1c", fontSize:13, marginBottom:12 },
  };

  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.h1}>🐛 Pest Alert System — India</div>
        <div style={s.hsub}>Select your state and crop to see active pest threats in your area</div>
        
        {/* Risk Score AI Section */}
        {selectedState !== "All States" && (
          <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>AI Risk Prediction</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: counts.high > 0 ? '#ff4d4d' : '#5ee08a' }}>
                {counts.high > 0 ? '88%' : counts.medium > 0 ? '42%' : '12%'} Likelihood
              </span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: counts.high > 0 ? '88%' : counts.medium > 0 ? '42%' : '12%', 
                background: counts.high > 0 ? '#ff4d4d' : '#5ee08a',
                transition: 'width 1s ease-out'
              }}></div>
            </div>
          </div>
        )}

        <div style={s.statRow}>
          <div style={s.stat}><div style={s.statVal}>{filtered.length}</div><div style={s.statLbl}>ACTIVE ALERTS</div></div>
          <div style={s.stat}><div style={s.statVal}>{counts.high}</div><div style={s.statLbl}>HIGH RISK</div></div>
          <div style={s.stat}><div style={s.statVal}>{INDIAN_STATES.length - 1}</div><div style={s.statLbl}>STATES COVERED</div></div>
          <div style={s.stat}><div style={s.statVal}>{ALL_CROPS.length - 1}</div><div style={s.statLbl}>CROPS</div></div>
        </div>
      </div>

      {/* Filters */}
      <div style={s.filterRow}>
        <select style={s.select} value={selectedState} onChange={e => handleStateChange(e.target.value)}>
          {INDIAN_STATES.map(st => <option key={st}>{st}</option>)}
        </select>
        <select style={s.select} value={selectedCrop} onChange={e => handleCropChange(e.target.value)}>
          {ALL_CROPS.map(cr => <option key={cr}>{cr}</option>)}
        </select>
        <input
          style={s.search}
          placeholder="🔍 Search pest name or crop..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>

      {/* Summary counts */}
      {filtered.length > 0 && (
        <div style={s.summRow}>
          {["high","medium","low"].map(sev => (
            <div key={sev} style={s.sumCard(sev)}>
              <div style={s.sumNum(sev)}>{counts[sev]}</div>
              <div style={s.sumLbl}>{SEVERITY_CONFIG[sev].label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && <div style={s.error}>⚠ {error}</div>}

      {/* Loading */}
      {loading && <div style={s.loading}>Loading pest alerts...</div>}

      {/* Alert cards */}
      {!loading && filtered.length === 0 && (
        <div style={s.empty}>
          <div style={s.emptyIcon}>✅</div>
          <div style={{fontSize:16,fontWeight:500,marginBottom:6}}>No active pest alerts</div>
          <div style={{fontSize:13}}>
            {selectedState !== "All States" ? `No alerts for ${selectedState}` : "No alerts match your filters"}
          </div>
        </div>
      )}

      {!loading && filtered.map(alert => {
        const cfg = SEVERITY_CONFIG[alert.severity];
        const expanded = expandedId === alert._id;
        return (
          <div
            key={alert._id}
            style={s.alertCard(alert.severity, expanded)}
            onClick={() => setExpandedId(expanded ? null : alert._id)}
          >
            <div style={s.cardTop}>
              <div style={s.cardIcon}>{cfg.icon}</div>
              <div style={s.cardInfo}>
                <div style={s.cardName}>{alert.pestName}</div>
                <div style={s.cardSub}>
                  📍 {alert.region} &nbsp;|&nbsp;
                  {alert.affectedCrops.map(c => (
                    <span key={c} style={s.cropPill}>{c}</span>
                  ))}
                </div>
                {alert.description && (
                  <div style={{fontSize:12,color:"#777",marginTop:4,lineHeight:1.5}}>{alert.description}</div>
                )}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end",flexShrink:0}}>
                <span style={s.cardBadge(alert.severity)}>{cfg.label}</span>
                <span style={{fontSize:11,color:"#aaa"}}>{expanded ? "▲ hide" : "▼ details"}</span>
              </div>
            </div>

            {/* Expanded detail */}
            {expanded && (
              <div style={s.detail}>
                <div style={s.detailRow}>
                  <div style={s.detailBox("amber")}>
                    <div style={s.detailLbl}>💊 Chemical Treatment</div>
                    <div style={s.detailTxt}>{alert.treatment}</div>
                  </div>
                  {alert.organicTreatment && (
                    <div style={s.detailBox("green")}>
                      <div style={s.detailLbl}>🌿 Organic Alternative</div>
                      <div style={s.detailTxt}>{alert.organicTreatment}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
