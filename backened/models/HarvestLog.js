const mongoose = require('mongoose');

const HarvestLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cropName: {
    type: String,
    required: true
  },
  seasonYear: {
    type: Number,
    required: true
  },
  yieldAmount: {
    type: Number, // In Tonnes
    required: true
  },
  area: {
    type: Number, // In Hectares
    required: true
  },
  soilPH: {
    type: Number,
    default: 6.5
  },
  rainfallMM: {
    type: Number,
    default: 800
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HarvestLog', HarvestLogSchema);
