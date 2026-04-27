const mongoose = require("mongoose");

const pestAlertSchema = new mongoose.Schema({
  pestName:      { type: String, required: true },   // "Army Worm"
  region:        { type: String, required: true },   // "Punjab"
  severity:      { type: String, enum: ["low", "medium", "high"], required: true },
  affectedCrops: [String],                           // ["Wheat", "Maize"]
  treatment:     { type: String, required: true },
  organicTreatment: String,
  description:   String,
  isActive:      { type: Boolean, default: true },
  createdAt:     { type: Date, default: Date.now },
});

module.exports = mongoose.model("PestAlert", pestAlertSchema);
