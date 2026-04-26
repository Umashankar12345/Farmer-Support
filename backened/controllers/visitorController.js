const Visitor = require('../models/Visitor');

exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ visitTime: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
};
