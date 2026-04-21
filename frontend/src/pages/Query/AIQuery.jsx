import React, { useState, useEffect, useRef } from 'react';
import { queryAPI } from '../../services/api';

const QUICK_QUERIES = [
  "When should I irrigate my mustard crop?",
  "Check for recent pest alerts in Rajasthan.",
  "Latest price trends for Wheat at Jaipur Mandi.",
  "What fertilizer is best for mustard growth?",
  "Armyworm treatment for rice"
];

export default function AIQuery() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am your AI Digital Krishi Officer. How can I help you today with your farm in Rajasthan?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (textOverride) => {
    const queryText = textOverride || input;
    if (!queryText.trim() || loading) return;

    // 1. Add user message
    const newMessages = [...messages, { role: 'user', text: queryText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // 2. Fetch context (Normally from a global state/store, but using localStorage for demo)
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const farmContext = {
        location: user.location || 'Rajasthan',
        crops: user.crop ? [user.crop] : ['Mustard', 'Wheat']
      };

      // 3. API Call
      const result = await queryAPI.askAI({
        query: queryText,
        farmContext,
        language: 'en'
      });

      // 4. Add AI response
      setMessages([...newMessages, { role: 'ai', text: result.response }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'ai', text: "I'm sorry, I encountered a connection error. Please ensure the backend is running and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)' }}>AgriVoice AI</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px', fontWeight: 600 }}>Multilingual AI Advisory System</div>
        </div>
        <div className="badge b-green">● AI ONLINE</div>
      </header>

      <div className="grid" style={{ gridTemplateColumns: '1fr 340px', gap: '24px', height: 'calc(100vh - 200px)' }}>
        {/* Chat Section */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <div 
            ref={scrollRef}
            style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg)' }}
          >
            {messages.map((m, i) => (
              <div key={i} style={{ 
                alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end',
                maxWidth: '75%',
                background: m.role === 'ai' ? '#fff' : 'var(--g2)',
                color: m.role === 'ai' ? 'var(--text)' : '#fff',
                padding: '14px 18px',
                borderRadius: m.role === 'ai' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                fontSize: '13px',
                fontWeight: 500,
                boxShadow: 'var(--shadow)',
                lineHeight: 1.6,
                border: m.role === 'ai' ? '1px solid var(--border)' : 'none',
                whiteSpace: 'pre-line'
              }}>
                {m.text}
                {m.role === 'ai' && (
                  <div style={{ fontSize: '9px', marginTop: '6px', opacity: 0.6, fontWeight: 700 }}>
                    AGRI AI • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div style={{ alignSelf: 'flex-start', background: '#fff', padding: '12px 20px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
                <div className="ticker-dot" style={{ background: 'var(--g3)' }}></div>
                <div className="ticker-dot" style={{ background: 'var(--g3)', animationDelay: '0.2s' }}></div>
                <div className="ticker-dot" style={{ background: 'var(--g3)', animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>
          
          <div style={{ padding: '24px', borderTop: '1px solid var(--border)', background: '#fff' }}>
             {/* Quick Queries inside chat for mobile feel */}
             <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px', paddingBottom: '8px' }}>
                {QUICK_QUERIES.map((q, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(q)}
                    style={{ whiteSpace: 'nowrap', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--g4)', background: 'var(--g5)', color: 'var(--g1)', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {q}
                  </button>
                ))}
             </div>

            <div style={{ display: 'flex', gap: '12px', background: 'var(--bg)', padding: '6px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🎙️</div>
              <input 
                style={{ flex: 1, height: '40px', padding: '0 12px', background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', fontWeight: 500 }}
                placeholder="Ask in Hindi, Tamil, Telugu or English..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
              />
              <button 
                className="btn btn-green" 
                style={{ height: '40px', padding: '0 24px', borderRadius: '12px', opacity: loading ? 0.7 : 1 }} 
                onClick={() => handleSend()}
                disabled={loading}
              >
                {loading ? 'Thinking...' : 'Send Advice Request'}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar/Info Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ background: 'var(--g5)', border: '1px solid var(--g4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ fontSize: '24px' }}>🛡️</div>
              <div style={{ fontWeight: 800, fontSize: '12px', color: 'var(--g1)' }}>Krishi Shield Verified</div>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 500 }}>
              Your advice is generated using localized data from **ICAR** and **Rajasthan Agriculture University**. For critical on-field decisions, please cross-verify with your local agent.
            </p>
          </div>

          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', fontWeight: 800, fontSize: '12px' }}>COMMUNITY QUERIES</div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
               <div style={{ fontSize: '11px', fontWeight: 600 }}>"Best month for Mustard sowing in Bikaner?"</div>
               <div style={{ fontSize: '11px', fontWeight: 600 }}>"Subsidy on Solar Pumps in 2026?"</div>
               <div style={{ fontSize: '11px', fontWeight: 600 }}>"How to get Soil Health Card?"</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
