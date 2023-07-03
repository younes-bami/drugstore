// db.js
const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB connected successfully'); // Log success with Winston
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`); // Log error with Winston
    process.exit(1);
  }
};

module.exports = connectDB;
