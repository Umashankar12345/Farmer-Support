import React, { useContext } from 'react';
import { VoiceContext } from '../../contexts/VoiceContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import { Mic, Play, Copy, Volume2, Zap, Clock } from 'lucide-react';

const VoiceCommands = () => {
  const { speakText } = useContext(VoiceContext);
  const { currentLanguage, translate } = useContext(LanguageContext);

  const commandCategories = [
    {
      title: "Crop Management",
      commands: [
        { 
          text: "What crops should I plant this season?", 
          icon: "🌱",
          action: "crop_season",
          response: "Based on your region and soil type, I recommend..."
        },
        { 
          text: "How to improve crop yield?", 
          icon: "📈",
          action: "improve_yield",
          response: "To improve yield, consider proper irrigation, timely fertilization..."
        },
        { 
          text: "When to harvest my crops?", 
          icon: "🌾",
          action: "harvest_time",
          response: "Harvest timing depends on crop maturity indicators..."
        }
      ]
    },
    {
      title: "Pest Control",
      commands: [
        { 
          text: "How to control pests organically?", 
          icon: "🐛",
          action: "organic_pest",
          response: "For organic pest control, use neem oil, companion planting..."
        },
        { 
          text: "Identify pest from symptoms", 
          icon: "🔍",
          action: "identify_pest",
          response: "Please describe the symptoms or upload an image for identification"
        }
      ]
    },
    {
      title: "Weather & Soil",
      commands: [
        { 
          text: "Weather forecast for farming", 
          icon: "🌦️",
          action: "weather_forecast",
          response: "Checking current weather conditions for your location..."
        },
        { 
          text: "Soil testing methods", 
          icon: "🧪",
          action: "soil_testing",
          response: "Soil testing can be done through chemical kits or laboratory analysis..."
        }
      ]
    }
  ];

  const recentCommands = [
    { command: "Best fertilizer for wheat", time: "2 mins ago" },
    { command: "Tomato disease identification", time: "5 mins ago" },
    { command: "Irrigation schedule for rice", time: "10 mins ago" }
  ];

  const handleCommandClick = (command) => {
    speakText(command.response, currentLanguage);
  };

  return (
    <div className="voice-commands-container">
      <div className="commands-header">
        <div className="header-left">
          <Zap size={24} className="text-yellow-500" />
          <h2>Voice Commands</h2>
        </div>
        <div className="header-info">
          <span className="language-badge">
            Language: {currentLanguage.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="commands-grid">
        {commandCategories.map((category, catIndex) => (
          <div key={catIndex} className="category-card">
            <h3 className="category-title">{category.title}</h3>
            <div className="commands-list">
              {category.commands.map((cmd, cmdIndex) => (
                <div key={cmdIndex} className="command-card">
                  <div className="command-header">
                    <span className="command-icon">{cmd.icon}</span>
                    <button
                      onClick={() => handleCommandClick(cmd)}
                      className="play-btn"
                      title="Speak command"
                    >
                      <Play size={14} />
                    </button>
                  </div>
                  <p className="command-text">{cmd.text}</p>
                  <div className="command-actions">
                    <button
                      onClick={() => navigator.clipboard.writeText(cmd.text)}
                      className="action-btn"
                      title="Copy command"
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      onClick={() => speakText(cmd.response, currentLanguage)}
                      className="action-btn"
                      title="Hear response"
                    >
                      <Volume2 size={12} />
                    </button>
                    <button
                      onClick={() => speakText(cmd.text, currentLanguage)}
                      className="action-btn"
                      title="Speak command"
                    >
                      <Mic size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="recent-commands">
        <h3 className="recent-title">
          <Clock size={18} />
          Recent Commands
        </h3>
        <div className="recent-list">
          {recentCommands.map((item, index) => (
            <div key={index} className="recent-item">
              <div className="recent-text">
                <span className="command-prefix">"</span>
                {item.command}
                <span className="command-prefix">"</span>
              </div>
              <span className="recent-time">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .voice-commands-container {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .commands-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #f3f4f6;
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .header-left h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }
        
        .language-badge {
          background: #dbeafe;
          color: #1e40af;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .commands-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .category-card {
          background: #f9fafb;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #e5e7eb;
        }
        
        .category-title {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 16px 0;
          padding-bottom: 8px;
          border-bottom: 1px dashed #d1d5db;
        }
        
        .commands-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .command-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
        }
        
        .command-card:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.1);
        }
        
        .command-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .command-icon {
          font-size: 20px;
        }
        
        .play-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .play-btn:hover {
          background: #2563eb;
        }
        
        .command-text {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
          margin: 0 0 12px 0;
        }
        
        .command-actions {
          display: flex;
          gap: 8px;
        }
        
        .action-btn {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .action-btn:hover {
          background: #e5e7eb;
          transform: scale(1.05);
        }
        
        .recent-commands {
          background: #f9fafb;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #e5e7eb;
        }
        
        .recent-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 16px 0;
        }
        
        .recent-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .recent-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        
        .recent-text {
          font-size: 14px;
          color: #4b5563;
          font-style: italic;
        }
        
        .command-prefix {
          color: #9ca3af;
        }
        
        .recent-time {
          font-size: 12px;
          color: #9ca3af;
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
        }
        
        @media (max-width: 768px) {
          .commands-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceCommands;