// src/pages/CommunityForum/components/QuestionList.jsx
import React from 'react';

const QuestionList = ({ questions, filters, onQuestionClick, selectedQuestion }) => {
  const filteredQuestions = questions.filter(q => {
    if (filters.crop !== 'All Crops' && q.crop !== filters.crop) return false;
    if (filters.topic !== 'All Topics' && q.topic !== filters.topic) return false;
    if (filters.status === 'Answered' && !q.solved) return false;
    if (filters.status === 'Unanswered' && q.solved) return false;
    if (filters.expertVerified && !q.expertVerified) return false;
    if (filters.searchQuery && !q.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="question-list">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Questions ({filteredQuestions.length})</h2>
        <div className="text-sm text-gray-600">Sorted by: Most Recent</div>
      </div>
      
      <div className="questions-container">
        {filteredQuestions.map(question => (
          <div key={question.id} className={`question-card ${selectedQuestion?.id === question.id ? 'selected' : ''}`} onClick={() => onQuestionClick(question)}>
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg mb-2">{question.title}</h3>
              {question.solved && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">✅ Solved</span>}
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{question.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">👤</span>
                  <span className="text-sm">{question.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">🌾</span>
                  <span className="text-sm">{question.crop}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">🏷️</span>
                  <span className="text-sm">{question.topic}</span>
                </div>
              </div>
              <div className="question-stats">
                <span>💬 {question.replies}</span>
                <span>👍 {question.upvotes}</span>
                <span className="text-gray-500 text-sm">{question.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;