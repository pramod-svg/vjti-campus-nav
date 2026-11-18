/**
 * In-Memory Fallback & Resilience Store for CampusVigation
 * Guarantees zero downtime even if MongoDB is not installed or temporarily offline.
 */
const mongoose = require('mongoose');
const { locationsData, campusPathsData } = require('../scripts/seedData');

class MemoryStore {
  constructor() {
    this.locations = locationsData.map((loc, i) => ({
      _id: `loc_mem_${i + 1}`,
      ...loc,
    }));

    this.paths = campusPathsData.map((p, i) => ({
      _id: `path_mem_${i + 1}`,
      ...p,
    }));

    this.users = [
      {
        _id: 'usr_student',
        name: 'Aarav Sharma (Student)',
        email: 'student@vjti.ac.in',
        role: 'student',
        department: 'Computer Engineering',
        favorites: ['loc_mem_2', 'loc_mem_7', 'loc_mem_8'],
      },
      {
        _id: 'usr_faculty',
        name: 'Dr. Radhika Kulkarni (Faculty)',
        email: 'faculty@vjti.ac.in',
        role: 'faculty',
        department: 'Electrical Engineering',
        favorites: ['loc_mem_1', 'loc_mem_3'],
      },
      {
        _id: 'usr_admin',
        name: 'Prof. S. Deshmukh (Campus Admin)',
        email: 'admin@vjti.ac.in',
        role: 'admin',
        department: 'Institute Administration',
        favorites: [],
      },
    ];

    this.searchHistory = [];
  }

  isMongoConnected() {
    return mongoose.connection && mongoose.connection.readyState === 1;
  }

  getLocations() {
    return this.locations;
  }

  getLocationById(id) {
    return this.locations.find((l) => l._id.toString() === id.toString());
  }

  getLocationByQR(qrKey) {
    return this.locations.find((l) => l.qrCodeKey === qrKey);
  }

  getPaths() {
    return this.paths;
  }

  getUsers() {
    return this.users;
  }

  getUserByEmail(email) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    return this.users.find((u) => u._id.toString() === id.toString());
  }
}

module.exports = new MemoryStore();
