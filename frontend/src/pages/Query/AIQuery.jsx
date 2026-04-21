import React, { useState } from 'react';

const QUICK_QUERIES = [
  "When should I irrigate my mustard crop?",
  "Check for recent pest alerts in Rajasthan.",
  "Latest price trends for Wheat at Jaipur Mandi.",
  "What fertilizer is best for crop growth?"
];

export default function AIQuery() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am your AgriVoice AI. How can I help you with your farming today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm currently processing your request using the latest agricultural datasets. One moment..." }]);
    }, 1000);
  };

  return (
    <>
      <header style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '22px', fontWeight: 800 }}>AgriVoice AI</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>AI-Powered Agricultural Advisory · Live Support</div>
      </header>

      <div className="grid" style={{ gridTemplateColumns: '1fr 340px', gap: '24px', height: 'calc(100vh - 180px)' }}>
        {/* Chat Section */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ 
                alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end',
                maxWidth: '80%',
                background: m.role === 'ai' ? 'var(--g5)' : 'var(--g2)',
                color: m.role === 'ai' ? 'var(--text)' : '#fff',
                padding: '12px 16px',
                borderRadius: m.role === 'ai' ? '12px 12px 12px 4px' : '12px 12px 4px 12px',
                fontSize: '13px',
                fontWeight: 500,
                boxShadow: 'var(--shadow)'
              }}>
                {m.text}
              </div>
            ))}
          </div>
          
          <div style={{ padding: '20px', borderTop: '1px solid var(--border)', background: '#fff' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input 
                style={{ flex: 1, height: '44px', padding: '0 16px', border: '1.5px solid var(--border)', borderRadius: '12px', outline: 'none', fontSize: '13px' }}
                placeholder="Ask your query here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="btn btn-green" style={{ width: '44px', height: '44px', padding: 0 }} onClick={handleSend}>
                →
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar/Info Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <div className="card-title">Quick Queries</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {QUICK_QUERIES.map((q, i) => (
                <button key={i} className="side-item" style={{ border: '1px solid var(--border)', fontSize: '11px', textAlign: 'left', background: 'transparent' }} onClick={() => setInput(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: 'var(--g5)', border: '1px solid var(--g4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ fontSize: '24px' }}>🎙</div>
              <div style={{ fontWeight: 800, fontSize: '12px' }}>Voice Command</div>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.5 }}>
              Tap the microphone to speak your query in Hindi or English. Our AI supports local dialects for better accuracy.
            </p>
            <button className="btn btn-green" style={{ width: '100%', marginTop: '12px' }}>START LISTENING</button>
          </div>
        </div>
      </div>
    </>
  );
}
