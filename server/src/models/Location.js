const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['classroom', 'lab', 'office', 'restroom', 'seminar_hall', 'utility'],
    default: 'classroom',
  },
  capacity: { type: Number },
});

const floorSchema = new mongoose.Schema({
  floorNumber: { type: Number, required: true },
  floorName: { type: String, required: true },
  rooms: [roomSchema],
});

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide location name'],
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'academic',
      'food',
      'accommodation',
      'administration',
      'recreation',
      'library',
      'laboratory',
      'parking',
      'medical',
      'facility',
    ],
    default: 'academic',
  },
  department: {
    type: String,
    default: 'Campus Wide',
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  buildingImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  },
  facilities: [{
    type: String,
  }],
  openingHours: {
    type: String,
    default: '08:00 AM - 06:00 PM',
  },
  accessibilityInformation: {
    wheelchairAccessible: { type: Boolean, default: true },
    hasElevator: { type: Boolean, default: false },
    hasRamp: { type: Boolean, default: true },
    notes: { type: String, default: 'Step-free entrance available at main portal.' },
  },
  contactInfo: {
    phone: { type: String, default: '+91 22 2419 8100' },
    email: { type: String, default: 'info@vjti.ac.in' },
    office: { type: String, default: 'Main Office' },
  },
  floors: [floorSchema],
  qrCodeKey: {
    type: String,
    unique: true,
    sparse: true,
  },
  isEmergencyPoint: {
    type: Boolean,
    default: false,
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Text index for smart search across name, department, facilities, and description
locationSchema.index({
  name: 'text',
  department: 'text',
  description: 'text',
  facilities: 'text',
});

module.exports = mongoose.model('Location', locationSchema);
