import React, { useState, useRef, useEffect } from 'react';
import AIService from '../../services/aiService';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! I'm your Krishi AI Assistant. How can I help you with farming today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await AIService.processQuery(input, context);
      
      // Update context if needed
      if (aiResponse.action) {
        setContext(prev => ({ ...prev, lastAction: aiResponse.action }));
      }

      // Add AI message
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse.response,
        sender: 'ai',
        timestamp: new Date(),
        confidence: aiResponse.confidence,
        sources: aiResponse.sources,
        action: aiResponse.action
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm having trouble connecting. Please try again or contact support.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "What's the weather forecast?",
    "Rice disease treatment?",
    "Best fertilizer for wheat?",
    "Tractor rental near me",
    "Current crop prices"
  ];

  const handleQuickQuestion = async (question) => {
    setInput(question);
    // Small delay to show the question in input field
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Namaste! I'm your Krishi AI Assistant. How can I help you with farming today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    setContext({});
  };

  const escalateToHuman = async () => {
    const lastUserMessage = messages.filter(m => m.sender === 'user').pop();
    if (lastUserMessage) {
      setIsTyping(true);
      const escalation = await AIService.escalalateToHuman(lastUserMessage.text, 'user123');
      
      const escalationMessage = {
        id: messages.length + 1,
        text: `I've escalated your query to a human expert. Ticket: ${escalation.ticketId}. They will contact you within 24 hours at 1800-180-1551.`,
        sender: 'ai',
        timestamp: new Date(),
        isEscalation: true
      };
      
      setMessages(prev => [...prev, escalationMessage]);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Chat Header */}
      <div className="p-4 border-b bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h3 className="font-bold">Krishi AI Assistant</h3>
              <p className="text-sm opacity-90">24/7 Farming Support</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Clear Chat"
            >
              🗑️
            </button>
            <button
              onClick={escalateToHuman}
              className="px-3 py-1 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100"
            >
              👨‍🌾 Human Help
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === 'user'
                  ? 'bg-green-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'ai' && (
                  <span className="mr-2">🤖</span>
                )}
                <span className="font-medium">
                  {message.sender === 'user' ? 'You' : 'Krishi AI'}
                </span>
                <span className="ml-2 text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.text}</p>
              
              {/* AI Message Details */}
              {message.sender === 'ai' && message.confidence && (
                <div className="mt-2 pt-2 border-t border-white/20">
                  <div className="flex items-center justify-between text-xs">
                    <span>Confidence: {(message.confidence * 100).toFixed(0)}%</span>
                    {message.action && (
                      <button className="text-blue-300 hover:text-white">
                        🔗 Take Action
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Escalation Info */}
              {message.isEscalation && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <span className="font-bold">⚠️ Escalated to Expert</span>
                    <br />
                    Your query is now with a farming specialist.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-none p-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="p-3 border-t bg-gray-50">
        <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about weather, crops, diseases, machinery, prices..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows="2"
            />
            <div className="absolute right-3 bottom-3 text-xs text-gray-500">
              Press Enter to send
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center"
          >
            {isTyping ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              'Send'
            )}
          </button>
        </div>
        
        {/* Features */}
        <div className="flex justify-between mt-3 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <button className="flex items-center hover:text-green-600">
              <span className="mr-1">🎤</span>
              Voice Input
            </button>
            <button className="flex items-center hover:text-green-600">
              <span className="mr-1">📷</span>
              Upload Image
            </button>
            <button className="flex items-center hover:text-green-600">
              <span className="mr-1">💾</span>
              Save Chat
            </button>
          </div>
          <div className="text-xs">
            Powered by AI • ICAR Data • Expert Knowledge
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;