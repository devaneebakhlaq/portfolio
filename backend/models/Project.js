const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  image:       { type: String, default: '' },
  tags:        [String],
  github:      { type: String, default: '' },
  live:        { type: String, default: '' },
  gradient:    { type: String, default: 'from-blue-500 to-cyan-500' },
  featured:    { type: Boolean, default: true },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
