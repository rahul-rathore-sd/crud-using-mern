/**
 * ============================================
 * RECORD API ROUTES
 * ============================================
 * This file contains all CRUD (Create, Read, Update, Delete) endpoints
 * for managing Employee Records.
 * 
 * ROUTING SUMMARY:
 * GET    /record          → Get all records
 * GET    /record/:id      → Get single record by ID
 * POST   /record          → Create new record
 * PATCH  /record/:id      → Update record by ID
 * DELETE /record/:id      → Delete record by ID
 */

import express from 'express';
import Record from '../models/Record.js';  // Import the Record model for database operations

const router = express.Router();  // Create a new router instance for this file's routes

// ============================================
// 1️⃣ GET ALL RECORDS
// ============================================
// Route: GET /record
// Purpose: Fetch all employee records from database
// Response: Array of records sorted by newest first
router.get('/', async (req, res) => {
  try {
    // Find all records and sort by createdAt in DESCENDING order (newest first)
    // { createdAt: -1 } means sort by date, -1 = descending, 1 = ascending
    const records = await Record.find().sort({ createdAt: -1 });
    
    // Return success response with all records
    res.status(200).json({ 
      success: true, 
      data: records,
      count: records.length  // Also return how many records we found
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// ============================================
// 2️⃣ GET SINGLE RECORD BY ID
// ============================================
// Route: GET /record/:id
// Purpose: Fetch one specific record using its MongoDB ID
// Example: GET /record/507f1f77bcf86cd799439011
router.get('/:id', async (req, res) => {
  try {
    // req.params.id comes from the URL (e.g., /record/123 → id='123')
    const record = await Record.findById(req.params.id);
    
    // If record doesn't exist, return 404 error
    if(!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Record not found' 
      });
    }
    
    // Return the found record
    res.status(200).json({ 
      success: true, 
      data: record 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// ============================================
// 3️⃣ CREATE NEW RECORD
// ============================================
// Route: POST /record
// Purpose: Create a new employee record
// Expected body: { name: "John", position: "Engineer", level: "Senior" }
router.post('/', async (req, res) => {
  try {
    // Extract the fields from request body (req.body comes from JSON payload)
    const { name, position, level } = req.body;
    
    // Create new record in database
    // Mongoose automatically validates against the schema we defined
    const record = await Record.create({name, position, level});
    
    // Return 201 (Created) status with the new record
    res.status(201).json({ 
      success: true, 
      data: record,
      message: 'Record created successfully'
    });
    
  } catch (error) {
    // 400 = Bad Request (user sent invalid data)
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// ============================================
// 4️⃣ UPDATE RECORD BY ID
// ============================================
// Route: PATCH /record/:id
// Purpose: Update an existing record
// Example body: { name: "Jane", position: "Manager" }
router.patch('/:id', async (req, res) => {
  try {
    // Extract fields from request body
    const { name, position, level } = req.body;
    
    // Find record by ID and update it
    // { new: true } returns the UPDATED record (not the old one)
    // { runValidators: true } ensures new data meets schema requirements
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      { name, position, level },
      { new: true, runValidators: true }
    );
    
    // If record doesn't exist, return 404 error
    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Record not found' 
      });
    } 
    
    // Return the updated record
    res.status(200).json({ 
      success: true, 
      data: record,
      message: 'Record updated successfully'
    });
    
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// ============================================
// 5️⃣ DELETE RECORD BY ID
// ============================================
// Route: DELETE /record/:id
// Purpose: Delete an employee record permanently
// Example: DELETE /record/507f1f77bcf86cd799439011
router.delete('/:id', async (req, res) => {
  try {
    // Find record by ID and delete it
    const record = await Record.findByIdAndDelete(req.params.id);
    
    // If record doesn't exist, return 404 error
    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Record not found' 
      });
    }
    
    // Return success message
    res.status(200).json({ 
      success: true, 
      message: 'Record deleted successfully',
      deletedId: record._id
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router;























/*
import express from 'express';
import Record from '../models/Record.js';

const router = express.Router();

// GET /record — Get all records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /record/:id — Get a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /record — Create a new record
router.post('/', async (req, res) => {
  try {
    const { name, position, level } = req.body;
    const record = await Record.create({ name, position, level });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PATCH /record/:id — Update a record by ID
router.patch('/:id', async (req, res) => {
  try {
    const { name, position, level } = req.body;
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      { name, position, level },
      { new: true, runValidators: true }
    );
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /record/:id — Delete a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.status(200).json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

*/