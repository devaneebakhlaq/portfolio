const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true, maxlength: 100 },
  email:   { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true, maxlength: 2000 },
  isRead:  { type: Boolean, default: false },
  ip:      String,
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
