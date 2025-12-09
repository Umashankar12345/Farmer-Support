import React, { useState } from 'react';

const ChatSection = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>Ask Your Digital Krishi Officer</h3>
      </div>
      <div className="chat-content">
        <div className="chat-message bot-message">
          <div className="message-content">
            Hello! I'm your Digital Krishi Officer. How can I assist you with your farming today?
          </div>
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type your question here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="send-btn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;