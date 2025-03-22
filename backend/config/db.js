//Database configuration

const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log(err.message || err);
  }
}
module.exports = connectDB;
