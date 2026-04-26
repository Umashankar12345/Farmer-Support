const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { userId, firstName, lastName } = req.user; // Assumes verifyJWT adds user to req

    const newComment = new Comment({
      userId,
      userName: `${firstName} ${lastName}`,
      content
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
