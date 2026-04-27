const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  diseaseName: {
    type: String,
    required: true
  },
  confidence: Number,
  severity: {
    type: String,
    enum: ['Low', 'Moderate', 'High', 'Critical'],
    default: 'Moderate'
  },
  treatment: String,
  imageUrl: String,
  location: {
    state: String,
    district: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Diagnosis', diagnosisSchema);
