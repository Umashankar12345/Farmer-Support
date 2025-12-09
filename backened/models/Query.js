// import mongoose from "mongoose";

// const querySchema = new mongoose.Schema({
//   farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   question: String,
//   answer: String,
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Query", querySchema);
const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Query', QuerySchema);