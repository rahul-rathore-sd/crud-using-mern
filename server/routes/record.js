import express from 'express';
import Record from '../models/Record.js';

const router = express.Router();

// GET /record — Get all records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 }); //find all records and sort by createdAt in descending order new entries will be on top
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /record/:id — Get a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if(!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.status(200).json({ success: true, data: record });
  }catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /record — Create a new record
router.post('/', async (req, res) => {
  try {
    const { name, position, level } = req.body;
    const record = await Record.create({name, position, level});
    res.status(201).json({ success: true, data: record });
  }catch (error) {
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