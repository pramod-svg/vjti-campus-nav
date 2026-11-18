const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nodeId: { type: String },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
}, { _id: false });

const campusPathSchema = new mongoose.Schema({
  startingPoint: {
    type: pointSchema,
    required: true,
  },
  endingPoint: {
    type: pointSchema,
    required: true,
  },
  distance: {
    type: Number,
    required: true, // in meters
  },
  pathCoordinates: [{
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  }],
  accessibility: {
    wheelchairAccessible: { type: Boolean, default: true },
    hasStairs: { type: Boolean, default: false },
    surfaceType: {
      type: String,
      enum: ['paved', 'asphalt', 'tiles', 'gravel', 'steps'],
      default: 'paved',
    },
  },
  pathType: {
    type: String,
    enum: ['main_walkway', 'corridor', 'paved_road', 'garden_path', 'ramp', 'stairs'],
    default: 'main_walkway',
  },
  isBidirectional: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('CampusPath', campusPathSchema);
