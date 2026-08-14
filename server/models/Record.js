import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
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
}, { timestamps: true });

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