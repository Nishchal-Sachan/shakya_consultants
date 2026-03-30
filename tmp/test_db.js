require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  console.log('Testing connection to MongoDB...');
  console.log('URI:', process.env.MONGODB_URI ? 'FOUND (blurred)' : 'MISSING');
  
  if (!process.env.MONGODB_URI) {
    console.error('ERROR: MONGODB_URI is not defined in .env');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('SUCCESS: Connected to MongoDB!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('FAILURE: Could not connect to MongoDB.');
    console.error('Error details:', err.message);
  }
}

testConnection();
