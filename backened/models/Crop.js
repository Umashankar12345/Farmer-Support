// import mongoose from "mongoose";

// const cropSchema = new mongoose.Schema({
//   name: String,
//   soilType: String,
//   soilPH: Number,
//   fertilizer: String,
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// });

// export default mongoose.model("Crop", cropSchema);
const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cropName: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  sowingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Growing', 'Harvested', 'Failed'],
    default: 'Growing'
  }
});

module.exports = mongoose.model('Crop', CropSchema);