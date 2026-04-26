import React, { useState, useEffect } from 'react';
import { commentAPI } from '../../../services/api';

export default function ProjectComments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await commentAPI.getComments();
      setComments(data);
    } catch (err) {
      console.error('Failed to fetch comments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await commentAPI.postComment({ content: newComment, rating });
      setNewComment('');
      setRating(5);
      fetchComments();
    } catch (err) {
      alert('Failed to post comment. Please make sure you are logged in.');
      console.error('Failed to post comment', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#d4e8d0] shadow-sm mt-8">
      <h3 className="text-xl font-black text-[#14301f] mb-6 flex items-center gap-2">
        💬 Project Feedback & Comments
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          className="w-full p-4 rounded-2xl border-2 border-[#e8f5e9] focus:border-[#1a8a47] outline-none transition-all text-sm font-medium min-h-[100px] resize-none"
          placeholder="What do you think about the Farmer Support project? Share your feedback..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black text-[#14301f] uppercase tracking-wider">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-xl transition-all ${star <= rating ? 'text-amber-400 scale-110' : 'text-gray-200 hover:text-amber-200'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
              submitting || !newComment.trim()
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#1a8a47] text-white hover:bg-[#14301f] hover:scale-105 active:scale-95'
            }`}
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a8a47] mx-auto mb-2"></div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Loading conversations...</p>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 rounded-2xl bg-[#f9fdf9] border border-[#e8f5e9] hover:border-[#c8e6c9] transition-all group"
            >
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="text-[13px] font-black text-[#14301f] block">{comment.userName}</span>
                  <div className="flex text-amber-400 text-[10px] mt-0.5">
                    {'★'.repeat(comment.rating || 5)}{'☆'.repeat(5 - (comment.rating || 5))}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="text-[13px] text-[#444] font-medium leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-[#f9fdf9] rounded-2xl border-2 border-dashed border-[#e8f5e9]">
            <p className="text-sm font-bold text-gray-400">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c8e6c9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1a8a47;
        }
      `}</style>
    </div>
  );
}
