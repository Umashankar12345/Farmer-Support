const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const userId = req.user.id; 

    const User = require('../models/User');
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newComment = new Comment({
      userId,
      userName: `${user.firstName} ${user.lastName}`,
      content,
      rating: rating || 5
    });

    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment', details: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments', details: error.message });
  }
};
