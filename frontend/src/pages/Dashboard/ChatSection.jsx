import React, { useState } from 'react';
import { Send, User, Bot } from 'lucide-react';

const ChatSection = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
      <div className="p-4 border-b border-gray-100 bg-green-50 rounded-t-xl flex items-center gap-2">
        <Bot className="text-green-600" />
        <h3 className="font-bold text-gray-800">Ask Your Digital Krishi Officer</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <Bot size={18} className="text-green-600" />
          </div>
          <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[80%]">
            <p className="text-sm text-gray-700 leading-relaxed">
              Hello! I'm your Digital Krishi Officer. How can I assist you with your farming today?
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 bg-white rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your question here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2 font-medium text-sm shadow-sm"
          >
            <Send size={16} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;