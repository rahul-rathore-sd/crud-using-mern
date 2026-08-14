/**
 * ============================================
 * EMPLOYEE RECORD MODEL
 * ============================================
 * This file defines the structure (schema) of Employee Records in MongoDB.
 * A schema is like a blueprint - it specifies what fields a record must have
 * and what type of data each field should contain.
 */

import mongoose from 'mongoose';

/**
 * recordSchema - Defines the structure of an Employee Record
 * 
 * FIELDS:
 * - name:     (String) Employee's full name. Must be provided and trimmed of whitespace.
 * - position: (String) Job title/position. Must be provided and trimmed.
 * - level:    (String) Seniority level. Must be one of: 'Intern', 'Junior', or 'Senior'.
 *             If user tries to save with another value, Mongoose rejects it.
 * 
 * { timestamps: true } automatically adds:
 * - createdAt: When the record was first created
 * - updatedAt: When the record was last modified
 * 
 * WHY THIS MATTERS:
 * - Validates data BEFORE saving to database (prevents garbage data)
 * - Provides type safety and consistency
 * - Makes queries easier and faster
 */
const recordSchema = new mongoose.Schema(
  {
    // Employee full name (required)
    name: {
      type: String,
      required: [true, 'Name is required'],  // Custom error message if missing
      trim: true,  // Automatically remove whitespace from beginning/end
    },
    
    // Job position/title (required)
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    
    // Seniority level (required, must match one of the allowed values)
    level: {
      type: String,
      required: [true, 'Level is required'],
      enum: {
        values: ['Intern', 'Junior', 'Senior'],  // Only these values are allowed
        message: 'Level must be Intern, Junior, or Senior',  // Error message if invalid
      },
    },
  },
  { timestamps: true }  // Automatically track when records are created/updated
);

/**
 * Create and export the Record model
 * A model is a constructor that allows us to:
 * - Create new records: new Record({ name: 'John', ... })
 * - Query records:      Record.find(), Record.findById(), etc.
 * - Update records:     Record.updateOne(), Record.findByIdAndUpdate(), etc.
 * - Delete records:     Record.deleteOne(), Record.findByIdAndDelete(), etc.
 */
const Record = mongoose.model('Record', recordSchema);

export default Record;


/*
import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    level: {
      type: String,
      required: [true, 'Level is required'],
      enum: {
        values: ['Junior', 'Middle', 'Senior'],
        message: 'Level must be Junior, Middle, or Senior',
      },
    },
  },
  { timestamps: true }
);

const Record = mongoose.model('Record', recordSchema);

export default Record;

*/