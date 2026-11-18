require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Location = require('../models/Location');
const CampusPath = require('../models/CampusPath');
const SearchHistory = require('../models/SearchHistory');
const { locationsData, campusPathsData } = require('./seedData');

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campusvigation';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany({});
    await Location.deleteMany({});
    await CampusPath.deleteMany({});
    await SearchHistory.deleteMany({});
    console.log('Cleared existing data.');

    // Seed Locations
    const createdLocations = await Location.insertMany(locationsData);
    console.log(`Successfully seeded ${createdLocations.length} campus locations.`);

    // Seed Campus Paths
    const createdPaths = await CampusPath.insertMany(campusPathsData);
    console.log(`Successfully seeded ${createdPaths.length} campus walkable paths.`);

    // Seed Users for all 3 roles
    const users = [
      {
        name: 'Aarav Sharma (Student)',
        email: 'student@vjti.ac.in',
        password: 'password123',
        role: 'student',
        department: 'Computer Engineering',
        favorites: [createdLocations[1]._id, createdLocations[6]._id, createdLocations[7]._id], // Comp Dept, Library, Canteen
      },
      {
        name: 'Dr. Radhika Kulkarni (Faculty)',
        email: 'faculty@vjti.ac.in',
        password: 'password123',
        role: 'faculty',
        department: 'Electrical Engineering',
        favorites: [createdLocations[0]._id, createdLocations[2]._id], // Main Bldg, Electrical Dept
      },
      {
        name: 'Prof. S. Deshmukh (Campus Admin)',
        email: 'admin@vjti.ac.in',
        password: 'password123',
        role: 'admin',
        department: 'Directorate',
        favorites: [createdLocations[0]._id, createdLocations[13]._id], // Main Bldg, Medical Centre
      },
    ];

    for (const u of users) {
      const user = new User(u);
      await user.save();
    }
    console.log('Successfully seeded 3 user accounts (Student, Faculty, Admin). Password: password123');

    // Seed Sample Search History
    const searches = [
      { searchedLocation: 'Computer Engineering Lab', locationId: createdLocations[1]._id },
      { searchedLocation: 'Central Library', locationId: createdLocations[6]._id },
      { searchedLocation: 'Canteen & Mess', locationId: createdLocations[7]._id },
      { searchedLocation: 'Dean Office Quadrangle', locationId: createdLocations[0]._id },
      { searchedLocation: 'Gymkhana Sports Ground', locationId: createdLocations[11]._id },
    ];
    await SearchHistory.insertMany(searches);
    console.log('Successfully seeded search history.');

    console.log('=== Database Seeding Complete! ===');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
