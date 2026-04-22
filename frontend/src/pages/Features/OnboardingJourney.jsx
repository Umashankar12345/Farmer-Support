import React, { useState } from 'react';
import './Features.css';

const OnboardingJourney = () => {
  const [step, setStep] = useState(2); // Starting at step 2 as per snippet logic
  const [loading, setLoading] = useState(false);
  const [showRec, setShowRec] = useState(false);

  const nextStep = () => {
    if (step === 2) {
      setStep(3);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowRec(true);
      }, 1800);
    }
  };

  const prevStep = () => {
    if (step === 3) {
      setStep(2);
      setShowRec(false);
    }
  };

  return (
    <div className="features-root f-page">
      <div className="page-hdr">
        <div>
          <div className="page-title">🚀 Farmer Journey — Onboarding Flow</div>
          <div className="page-sub">3-step smart setup: State → First Field → AI Recommendation</div>
        </div>
      </div>

      <div className="onboard-wrap">
        <div className="ob-steps">
          <div className="ob-step">
            <div className={`ob-step-num ${step > 1 ? 'done' : 'current'}`}>{step > 1 ? '✓' : '1'}</div>
            <div className="ob-step-lbl">Select State</div>
          </div>
          <div className={`ob-connector ${step > 1 ? 'done' : ''}`}></div>
          <div className="ob-step">
            <div className={`ob-step-num ${step > 2 ? 'done' : step === 2 ? 'current' : ''}`}>{step > 2 ? '✓' : '2'}</div>
            <div className="ob-step-lbl">Add First Field</div>
          </div>
          <div className={`ob-connector ${step > 2 ? 'done' : ''}`}></div>
          <div className="ob-step">
            <div className={`ob-step-num ${step === 3 ? (showRec ? 'done' : 'current') : ''}`}>{showRec ? '✓' : '3'}</div>
            <div className="ob-step-lbl">AI Recommendation</div>
          </div>
        </div>

        <div className="ob-content">
          {step === 1 && (
            <div>
              <div className="ob-step-title">Select your state & district</div>
              <div className="ob-step-sub">We'll customize crop calendar, schemes and weather for your exact location</div>
              <div className="fr2">
                <div className="fg ob-field"><label>State</label><select className="ob-inp"><option>Rajasthan</option><option>Punjab</option><option>Haryana</option><option>UP</option><option>MP</option></select></div>
                <div className="fg ob-field"><label>District</label><input className="ob-inp" placeholder="e.g. Jaipur" /></div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="ob-step-title">Add your first field</div>
              <div className="ob-step-sub">Tell us about your land — we'll auto-schedule your first soil test reminder</div>
              <div className="fr2">
                <div className="fg ob-field"><label>Field Name</label><input className="ob-inp" placeholder="e.g. Main Plot A" /></div>
                <div className="fg ob-field"><label>Area (acres)</label><input className="ob-inp" type="number" defaultValue="5" /></div>
                <div className="fg ob-field"><label>Soil Type</label><select className="ob-inp"><option>Sandy Loam</option><option>Alluvial</option><option>Black</option><option>Red Laterite</option></select></div>
                <div className="fg ob-field"><label>Irrigation</label><select className="ob-inp"><option>Drip</option><option>Canal</option><option>Rainfed</option><option>Borewell</option></select></div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="ob-step-title">Your personalized AI recommendation is ready!</div>
              <div className="ob-step-sub">Based on your state, soil and field data — here's what AI recommends</div>
              
              {loading && (
                <div style={{textAlign:'center', padding:'20px 0'}}>
                  <div className="spin" style={{borderTopColor:'#22c55e', borderColor:'rgba(255,255,255,.2)', width:'24px', height:'24px', borderWidth:'3px', margin:'0 auto 10px'}}></div>
                  <div style={{fontSize:'12px', opacity:'.7'}}>AI analyzing your farm profile...</div>
                </div>
              )}

              {showRec && (
                <div className="ob-rec-box show">
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px'}}>
                    <span style={{fontSize:'20px'}}>🌱</span>
                    <div>
                      <div style={{fontSize:'10px', color:'rgba(255,255,255,.55)', textTransform:'uppercase', letterSpacing:'.5px'}}>Top Recommendation</div>
                      <div className="ob-rec-crop">Mustard (Pusa)</div>
                    </div>
                    <div style={{marginLeft:'auto', textAlign:'right'}}>
                      <div style={{fontSize:'10px', color:'rgba(255,255,255,.55)'}}>Confidence</div>
                      <div style={{fontSize:'18px', fontWeight:'800', color:'#86efac'}}>94%</div>
                    </div>
                  </div>
                  <div className="ob-rec-why">Based on Rajasthan location, sandy loam soil, and current mandi prices (₹5,280/Qtl — up 2.4%). Best sowing window: October 10–25. Estimated yield: 12–15 Qtl/acre. ROI potential: ₹4.2L for 5 acres.</div>
                  <div style={{display:'flex', gap:'8px', marginTop:'12px'}}>
                    <button className="ob-next" style={{flex:1}} onClick={() => alert('✅ Onboarding Complete!')}>Set Up My Dashboard →</button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="ob-nav">
            <button className="ob-back" onClick={prevStep} style={{visibility: step > 2 ? 'visible' : 'hidden'}}>← Back</button>
            {step < 3 && <button className="ob-next" onClick={nextStep}>Continue →</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingJourney;
