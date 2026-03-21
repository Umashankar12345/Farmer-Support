// src/pages/CommunityForum/CommunityForum.jsx
import React, { useState } from 'react';
import ForumHeader from './components/ForumHeader';
import QuestionList from './components/QuestionList';
import AskQuestionModal from './components/AskQuestionModal';
import { MessageSquare, ThumbsUp, CheckCircle, Award, Mic } from 'lucide-react';

const CommunityForum = () => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    crop: 'All Crops',
    topic: 'All Topics',
    status: 'All',
    expertVerified: false,
    language: 'All'
  });

  const [questions, setQuestions] = useState([
    {
      id: 1, title: 'How to control stem borer in rice?', content: 'Seeing yellowing leaves in my rice field. Suspect stem borer. What organic solutions work best?',
      author: 'Rajesh Kumar', authorType: 'Farmer', crop: 'Rice', topic: 'Pest Control', replies: 12, upvotes: 24, solved: true, expertVerified: true,
      timestamp: '2 hours ago', bestAnswer: 'Use neem oil spray mixed with garlic extract. Apply weekly for 3 weeks.'
    },
    {
      id: 2, title: 'PM-KISAN scheme application help', content: 'Having trouble uploading land documents. Error shows "invalid file format"',
      author: 'Priya Sharma', authorType: 'Farmer', crop: 'All', topic: 'Govt Scheme', replies: 5, upvotes: 8, solved: false, expertVerified: false,
      timestamp: '5 hours ago'
    },
    {
      id: 3, title: 'Best fertilizer for tomato in summer', content: 'Growing tomatoes in polyhouse. Which fertilizer ratio works best for summer crop?',
      author: 'Dr. Verma', authorType: 'Krishi Officer', crop: 'Tomato', topic: 'Fertilizer', replies: 18, upvotes: 42, solved: true, expertVerified: true,
      timestamp: '1 day ago', bestAnswer: 'Use 19:19:19 NPK with micronutrients. Reduce nitrogen in high temperature.'
    }
  ]);

  const [showAskModal, setShowAskModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleAskQuestion = (questionData) => {
    const newQuestion = {
      id: questions.length + 1,
      ...questionData,
      replies: 0, upvotes: 0, solved: false, expertVerified: false, timestamp: 'Just now'
    };
    setQuestions([newQuestion, ...questions]);
    setShowAskModal(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <ForumHeader filters={filters} onFilterChange={handleFilterChange} onAskQuestion={() => setShowAskModal(true)} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
        <div className="space-y-4">
          <QuestionList questions={questions} filters={filters} onQuestionClick={handleQuestionClick} selectedQuestion={selectedQuestion} />
        </div>

        {selectedQuestion && (
          <div className="lg:sticky lg:top-5 h-fit">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedQuestion.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-medium">{selectedQuestion.crop}</span>
                    <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium">{selectedQuestion.topic}</span>
                    {selectedQuestion.expertVerified && (
                      <span className="bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle size={12} /> Expert Verified
                      </span>
                    )}
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">Follow</button>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedQuestion.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedQuestion.author}</div>
                    <div className="text-sm text-gray-500">{selectedQuestion.authorType} • {selectedQuestion.timestamp}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{selectedQuestion.content}</p>
              </div>

              <div className="flex gap-6 mb-6 text-gray-600 border-t border-b border-gray-100 py-3">
                <div className="flex items-center gap-1.5 text-sm font-medium"><MessageSquare size={16} /><span>{selectedQuestion.replies} replies</span></div>
                <div className="flex items-center gap-1.5 text-sm font-medium"><ThumbsUp size={16} /><span>{selectedQuestion.upvotes} upvotes</span></div>
                {selectedQuestion.solved && <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium"><CheckCircle size={16} /><span>Solved</span></div>}
              </div>

              {selectedQuestion.bestAnswer && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="text-yellow-500" size={20} />
                    <span className="font-bold text-green-800">Best Answer</span>
                  </div>
                  <p className="text-green-900 leading-relaxed">{selectedQuestion.bestAnswer}</p>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="font-bold text-gray-800">Your Answer</h4>
                <textarea
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none bg-gray-50"
                  rows="4"
                  placeholder="Share your knowledge or experience..."
                />
                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm shadow-green-200">Post Answer</button>
                  <button className="px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">Attach Image</button>
                  <button className="px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                    <Mic size={16} className="text-red-500" /> Voice Answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showAskModal && <AskQuestionModal onClose={() => setShowAskModal(false)} onSubmit={handleAskQuestion} />}
    </div>
  );
};

export default CommunityForum;