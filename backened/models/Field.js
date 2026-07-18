const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fieldName: {
    type: String,
    required: true,
  },
  cropName: {
    type: String,
    required: true,
  },
  areaHectares: {
    type: Number,
    required: true,
  },
  soilType: {
    type: String,
    required: true,
  },
  irrigationType: {
    type: String,
    required: true,
    enum: ['Rainfed', 'Canal', 'Tube Well', 'Drip', 'Sprinkler'],
    default: 'Rainfed'
  },
  sowingDate: {
    type: Date,
    required: true,
  },
  lastSoilTestDate: {
    type: Date,
    default: null, // User might not have tested yet
  },
  lastSoilTestResults: {
    pH: { type: Number, default: null },
    nitrogen: { type: String, enum: ['Low', 'Medium', 'High', null], default: null },
    phosphorus: { type: String, enum: ['Low', 'Medium', 'High', null], default: null },
    potassium: { type: String, enum: ['Low', 'Medium', 'High', null], default: null }
  },
  location: {
    type: String,
    default: ''
  },
  healthHistory: [{
    date: { type: Date, required: true },
    score: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Field', fieldSchema);
