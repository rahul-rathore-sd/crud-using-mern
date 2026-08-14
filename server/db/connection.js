/**
 * ============================================
 * DATABASE CONNECTION MODULE
 * ============================================
 * This file handles the connection to MongoDB database using Mongoose.
 * Mongoose is an ODM (Object Data Modeling) library that makes working with MongoDB easier.
 */

import mongoose from 'mongoose';

/**
 * connectDB - Async function to establish MongoDB connection
 * 
 * FLOW:
 * 1. Attempts to connect to MongoDB using Mongoose
 * 2. Uses MONGODB_URI from .env file, or falls back to local MongoDB
 * 3. If successful, logs the connection and returns the connection object
 * 4. If failed, logs error and stops the server (process.exit(1))
 * 
 * WHY: We need to be connected to the database before handling any requests,
 *      so this runs BEFORE the server starts listening
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    // MONGODB_URI should be in your .env file (e.g., mongodb+srv://user:pass@cluster.mongodb.net/crud)
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/crud'
    );

    console.log('✅ MongoDB connected:', conn.connection.host);
    console.log('📊 Database name:', conn.connection.name);
    return conn;
    
  } catch (error) {
    // If connection fails, log the error and stop the entire server
    console.error('❌ Database connection error:', error.message);
    process.exit(1);  // Exit with error code 1 (process.exit(0) would mean success)
  }
};

export default connectDB;
