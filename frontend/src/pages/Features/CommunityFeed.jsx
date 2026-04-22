import React, { useState } from 'react';
import './Features.css';

const CommunityFeed = () => {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: 'Ramesh Kumar, Alwar',
      meta: 'Rajasthan · Wheat farmer · 45 min ago',
      tag: '🌾 Fertilizer',
      body: '"Best month for Mustard sowing in Bikaner? My soil pH is 7.1 and I have drip irrigation. Should I go for Pusa Mustard or RH-749?"',
      av: 'RK',
      avColor: '#1d4ed8',
      likes: 47,
      liked: true,
      reply: {
        text: 'For Bikaner with pH 7.1, sow in October 10–25. Pusa Mustard is better for your conditions — higher yield in low-rainfall areas. Apply DAP 25kg/acre at sowing + urea in two splits. Expect 10–13 Qtl/acre.',
        by: '👨💼 Officer Ravi Kumar, Jaipur Block',
        verified: true
      }
    },
    {
      id: 2,
      name: 'Priya Meena, Jodhpur',
      meta: 'Rajasthan · Millet farmer · 2 hrs ago',
      tag: '📋 Scheme',
      body: '"Subsidy on solar pumps in 2026? My 5 acre farm needs irrigation. Is PM-KUSUM scheme still accepting applications?"',
      av: 'PM',
      avColor: '#7c3aed',
      likes: 23,
      liked: false,
      reply: {
        text: 'PM-KUSUM Component B is active — 60% subsidy on solar pump installation (up to 7.5 HP). Apply through your state agriculture portal. Rajasthan deadline is June 30, 2026. Required docs: Aadhaar, land records, bank passbook.',
        by: '🌐 Digital Krishi AI',
        verified: true,
        isAI: true
      }
    },
    {
      id: 3,
      name: 'Suresh Kumar, Kota',
      meta: 'Rajasthan · Rice farmer · 4 hrs ago',
      tag: '🆔 Soil Card',
      body: '"How to get Soil Health Card? My last card expired in 2023. Which office should I visit or can I apply online?"',
      av: 'SK',
      avColor: '#0891b2',
      likes: 12,
      liked: false
    }
  ]);

  const [newQ, setNewQ] = useState('');

  const submitPost = () => {
    if (!newQ.trim()) return;
    const newPost = {
      id: Date.now(),
      name: 'Umashankar Kumar',
      meta: 'Rajasthan · Just now',
      tag: '💬 Question',
      body: newQ,
      av: 'UK',
      avColor: 'var(--g2)',
      likes: 0,
      liked: false
    };
    setPosts([newPost, ...posts]);
    setNewQ('');
    setShowForm(false);
  };

  const toggleLike = (id) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  return (
    <div className="features-root f-page">
      <div className="page-hdr">
        <div>
          <div className="page-title">🤝 Farmer Community Feed</div>
          <div className="page-sub">Questions, answers and verified expert advice from across India</div>
        </div>
        <button className="f-btn f-btn-g f-btn-sm" onClick={() => setShowForm(!showForm)}>+ Ask Community</button>
      </div>

      {showForm && (
        <div style={{marginBottom:'14px'}}>
          <div className="f-card">
            <div className="ct">Post a Question</div>
            <div className="fg">
              <label>Your Question</label>
              <textarea className="f-inp" rows="3" value={newQ} onChange={e => setNewQ(e.target.value)} placeholder="Ask about crop disease, fertilizer, government schemes..."></textarea>
            </div>
            <div className="fg">
              <label>Tag</label>
              <select className="f-inp">
                <option>Crop Disease</option><option>Fertilizer</option><option>Irrigation</option><option>Government Scheme</option><option>Market Price</option><option>Pest Control</option>
              </select>
            </div>
            <div style={{display:'flex', gap:'8px'}}>
              <button className="f-btn f-btn-g f-btn-sm" onClick={submitPost}>Post Question</button>
              <button className="f-btn f-btn-out f-btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div id="community-feed">
        {posts.map(post => (
          <div key={post.id} className="feed-post">
            <div className="fp-hdr">
              <div className="fp-av" style={{background: post.avColor}}>{post.av}</div>
              <div><div className="fp-name">{post.name}</div><div className="fp-meta">{post.meta}</div></div>
              <div className="fp-tag">{post.tag}</div>
            </div>
            <div className="fp-body">{post.body}</div>
            {post.reply && (
              <div className="fp-reply">
                <div className="fp-reply-text">{post.reply.text}</div>
                <div className="fp-reply-by">
                  {post.reply.by} {post.reply.verified && <span className="verified-badge">{post.reply.isAI ? '✓ AI VERIFIED' : '✓ VERIFIED'}</span>}
                </div>
              </div>
            )}
            <div className="fp-actions">
              <button className={`fp-act ${post.liked ? 'liked' : ''}`} onClick={() => toggleLike(post.id)}>👍 <span className="lc">{post.likes}</span></button>
              <button className="fp-act">💬 Reply</button>
              <button className="fp-act">🔗 Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
