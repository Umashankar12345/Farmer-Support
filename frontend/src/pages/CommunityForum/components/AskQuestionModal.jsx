// src/pages/CommunityForum/components/AskQuestionModal.jsx
import React, { useState } from 'react';
import { X, Mic, Image, StopCircle } from 'lucide-react';

const AskQuestionModal = ({ onClose, onSubmit }) => {
  const [question, setQuestion] = useState({
    title: '',
    content: '',
    crop: 'All Crops',
    topic: 'Pest Control',
    language: 'English',
    includeImage: false,
    includeVoice: false
  });

  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    if (!question.title.trim() || !question.content.trim()) {
      alert('Please fill in both title and question');
      return;
    }
    onSubmit(question);
    setQuestion({ title: '', content: '', crop: 'All Crops', topic: 'Pest Control', language: 'English', includeImage: false, includeVoice: false });
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        setIsRecording(false);
        setQuestion({ ...question, content: question.content + ' [Voice recorded: Looking for advice on crop rotation]' });
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">Ask a Question</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Question Title*</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-800 placeholder-gray-400"
                placeholder="What's your question about?"
                value={question.title}
                onChange={(e) => setQuestion({ ...question, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Question Content*</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-800 placeholder-gray-400 resize-none min-h-[120px]"
                rows="4"
                placeholder="Describe your issue in detail..."
                value={question.content}
                onChange={(e) => setQuestion({ ...question, content: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Related Crop</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all appearance-none bg-white"
                    value={question.crop}
                    onChange={(e) => setQuestion({ ...question, crop: e.target.value })}
                  >
                    <option>All Crops</option><option>Rice</option><option>Wheat</option><option>Cotton</option><option>Tomato</option><option>Sugarcane</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all appearance-none bg-white"
                    value={question.topic}
                    onChange={(e) => setQuestion({ ...question, topic: e.target.value })}
                  >
                    <option>Pest Control</option><option>Fertilizer</option><option>Govt Scheme</option><option>Irrigation</option><option>Weather</option><option>Machinery</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold text-blue-900 mb-1 flex items-center gap-2">
                  <Mic size={16} /> Ask via Voice
                </label>
                <p className="text-xs text-blue-700">Record your question (for illiterate farmers)</p>
              </div>
              <button
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${isRecording
                    ? 'bg-red-500 text-white animate-pulse shadow-red-200'
                    : 'bg-white text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100'
                  }`}
                onClick={handleVoiceRecord}
              >
                {isRecording ? <StopCircle size={24} /> : <Mic size={24} />}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                  checked={question.includeImage}
                  onChange={(e) => setQuestion({ ...question, includeImage: e.target.checked })}
                />
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Image size={16} /> Upload Image
                </span>
              </label>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                Choose File
              </button>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium shadow-lg shadow-green-200 transition-colors flex items-center gap-2"
              >
                Post Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionModal;