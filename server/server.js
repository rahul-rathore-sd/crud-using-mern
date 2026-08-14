/**
 * ============================================
 * MERN CRUD APPLICATION - SERVER ENTRY POINT
 * ============================================
 * This is the main Express server file that handles all HTTP requests
 * and coordinates between the client (React) and database (MongoDB)
 */

import express from 'express';
import 'dotenv/config';  // Loads environment variables from .env file
import connectDB from './db/connection.js';  // Function to connect to MongoDB
import cors from 'cors';  // Middleware to allow cross-origin requests from React frontend
import recordRoutes from './routes/record.js';  // Routes for CRUD operations on records

// ===== SERVER INITIALIZATION =====
const app = express();  // Create Express application instance
app.use(cors());  // Enable CORS - allows frontend to make requests to backend
const PORT = process.env.PORT || 5050;  // Use PORT from .env or default to 5050

// ===== MIDDLEWARE SETUP =====
// Middleware functions that process every incoming request
app.use(express.json());  // Parse incoming JSON request bodies (for POST/PATCH requests)
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data (form submissions)

// ===== HEALTH CHECK ROUTE =====
// Simple endpoint to verify the server is running
app.get('/', (req, res) => {
  res.json({ message: 'MERN CRUD Server is running' });
});

// ===== API ROUTES =====
// All /record routes are handled by recordRoutes
// Examples:
//   GET    /record          → Get all records
//   POST   /record          → Create new record
//   GET    /record/:id      → Get specific record
//   PATCH  /record/:id      → Update record
//   DELETE /record/:id      → Delete record
app.use('/record', recordRoutes);

// ===== ERROR HANDLING MIDDLEWARE =====
// Catches any errors thrown by routes and returns a proper error response
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log error to server console for debugging
  res.status(500).json({ error: 'Something went wrong!' });  // Send error response to client
});

// ===== SERVER STARTUP =====
// Connects to database and starts listening for HTTP requests
const startServer = async () => {
  await connectDB();  // Connect to MongoDB first (must happen before server starts)
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📝 Visit http://localhost:${PORT} to test the API`);
  });
};

startServer();  // Start the server
