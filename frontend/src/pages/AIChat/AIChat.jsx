import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Mic,
  MicOff,
  Camera,
  Image as ImageIcon,
  Zap,
  Brain,
  Leaf,
  TrendingUp
} from 'lucide-react';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Agricultural AI Assistant. I can help you with crop management, pest control, weather insights, and farming best practices. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    { icon: <Leaf size={16} />, text: "Best crops for my soil" },
    { icon: <Zap size={16} />, text: "Pest control methods" },
    { icon: <Brain size={16} />, text: "Fertilizer recommendations" },
    { icon: <TrendingUp size={16} />, text: "Yield optimization" },
  ];

  const agriculturalTips = [
    "Monitor soil moisture regularly for optimal irrigation",
    "Rotate crops to prevent soil nutrient depletion",
    "Use organic mulch to conserve water and suppress weeds",
    "Test soil pH before planting season",
    "Implement integrated pest management strategies",
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        `Based on your query about "${inputMessage}", I recommend checking soil conditions first and considering crop rotation if applicable.`,
        `For "${inputMessage}", integrated pest management would be effective. Start with biological controls before chemical options.`,
        `Regarding "${inputMessage}", proper irrigation scheduling and soil testing are crucial steps for optimal results.`,
        `For "${inputMessage}", consider companion planting and organic amendments to improve soil health naturally.`,
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setInputMessage("I'd like to know about organic farming practices for tomatoes");
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">AI Agricultural Assistant</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Get instant advice on farming, crops, pests, and agricultural best practices</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Interface */}
        <div className="lg:col-span-2 h-[600px]">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md h-full flex flex-col overflow-hidden transition-colors duration-300">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-green-600 text-white">
                  <Bot size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 m-0">AgriAI Assistant</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Online • Agricultural Expert</span>
                </div>
                <span className="ml-auto bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">AI Powered</span>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex w-full mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${message.sender === 'bot' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                      }`}>
                      {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className="flex flex-col">
                      <div className={`px-4 py-3 rounded-2xl break-words ${message.sender === 'bot'
                          ? 'bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-green-900 dark:text-green-100 rounded-bl-sm'
                          : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-900 dark:text-blue-100 rounded-br-sm'
                        }`}>
                        <p className="m-0 text-sm md:text-base">{message.text}</p>
                      </div>
                      <span className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex w-full justify-start mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-green-600 text-white">
                      <Bot size={16} />
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-600 animate-bounce"></span>
                        <span className="w-2 h-2 rounded-full bg-green-600 animate-bounce delay-100"></span>
                        <span className="w-2 h-2 rounded-full bg-green-600 animate-bounce delay-200"></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              {/* Quick Questions */}
              <div className="flex flex-wrap gap-2 mb-4">
                {quickQuestions.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                    onClick={() => handleQuickQuestion(item.text)}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </button>
                ))}
              </div>

              {/* Input and Controls */}
              <div className="flex gap-2 items-end">
                <button
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${isRecording
                      ? 'bg-red-100 border-red-200 text-red-600 animate-pulse'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  onClick={handleVoiceInput}
                  title="Voice input"
                >
                  {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors" title="Upload image">
                  <Camera size={20} />
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors" title="Attach file">
                  <ImageIcon size={20} />
                </button>

                <div className="flex-1">
                  <textarea
                    placeholder="Ask about crops, pests, weather, or farming practices..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    rows="1"
                    className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl resize-none min-h-[50px] max-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                <button
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-none text-white transition-colors duration-200 ${!inputMessage.trim() ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 cursor-pointer'
                    }`}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  title="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Tips Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Daily Farming Tips</h3>
            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4 mx-[-1.5rem]"></div>
            <ul className="space-y-3 m-0 p-0 list-none">
              {agriculturalTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                  <span className="text-green-600 font-bold">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">AI Capabilities</h3>
            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4 mx-[-1.5rem]"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  <Leaf size={24} />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Crop Advice</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  <Zap size={24} />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Pest Control</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                  <Brain size={24} />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Soil Analysis</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                  <TrendingUp size={24} />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Yield Predict</span>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Today's Stats</h3>
            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4 mx-[-1.5rem]"></div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Questions Answered</span>
                <span className="text-2xl font-semibold text-gray-800 dark:text-gray-100">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</span>
                <span className="text-2xl font-semibold text-gray-800 dark:text-gray-100">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                <span className="text-2xl font-semibold text-gray-800 dark:text-gray-100">1.2s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;