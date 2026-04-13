import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import { sendToGroq } from '../../services/groqService';
import { startVoiceRecording } from '../../services/speechService';
import PerformanceTicker from '../Dashboard/components/PerformanceTicker';
import DiseaseDetector from './components/DiseaseDetector';

const QUICK_QUERIES = [
  'My wheat leaves are turning yellow',
  'Best fertilizer for mustard in sandy soil',
  'When to irrigate rice this week?',
  'PM-KISAN eligibility and how to apply',
  'Armyworm treatment for rice',
];

export default function AIQuery() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Namaste! I am your AI Digital Krishi Officer. How can I help you today with your farm in Rajasthan?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    const reply = await sendToGroq({
      query: text,
      farmContext: { location: 'Rajasthan', crops: ['wheat', 'rice', 'mustard'] },
      language: 'en'
    });

    setMessages(m => [...m, { role: 'ai', text: reply }]);
    setLoading(false);
  };

  const handleVoice = async () => {
    setVoiceActive(true);
    try {
      const transcript = await startVoiceRecording();
      if (transcript) handleSend(transcript);
    } catch (err) {
      console.error('Voice recording failed', err);
    } finally {
      setVoiceActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        
        <main className="flex-1 p-8 flex flex-col max-w-5xl mx-auto w-full">
          <header className="mb-6">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">AgriVoice AI</h1>
            <p className="text-gray-500 font-medium">Multilingual AI Advisory System</p>
          </header>

          <div className="flex-1 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col overflow-hidden mb-8">
            {/* Chat Thread */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-[#0d5c2e] text-white rounded-tr-none' 
                      : 'bg-[#f0fdf4] text-[#0f2d1a] rounded-tl-none border border-[#d1fae5] shadow-sm'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <span className="text-[10px] mt-2 block opacity-50 font-bold uppercase tracking-wider">
                      {msg.role === 'user' ? 'You' : 'Agri AI'} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#f0fdf4] p-4 rounded-2xl rounded-tl-none border border-[#d1fae5] animate-pulse flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-gray-50/50 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 mb-4">
                {QUICK_QUERIES.map((q, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(q)}
                    className="text-[10px] font-bold bg-white border border-[#d1fae5] px-3 py-1.5 rounded-full hover:border-[#22c55e] hover:text-[#0d5c2e] transition-all shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-lg border border-gray-200">
                <button 
                  onClick={handleVoice}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
                    voiceActive ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{voiceActive ? '🛑' : '🎙️'}</span>
                </button>
                <input 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask in Hindi, Tamil, Telugu or English..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="px-6 h-12 bg-[#0d5c2e] text-white rounded-xl font-bold text-sm hover:bg-[#1a8a47] transition-all disabled:opacity-50"
                >
                  Send Advice Request
                </button>
              </div>
            </div>
          </div>
          
          <DiseaseDetector />
        </main>
      </div>
      <PerformanceTicker />
    </div>
  );
}
