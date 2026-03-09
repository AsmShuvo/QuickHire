const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Job ID is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  resume_link: {
    type: String,
    required: [true, 'Resume link is required'],
    trim: true
  },
  cover_note: {
    type: String,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
