const mongoose = require('mongoose');

const SkillItemSchema = new mongoose.Schema({ name: String, level: Number });

const SkillCatSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  gradient: { type: String, default: 'from-blue-500 to-cyan-500' },
  skills:   [SkillItemSchema],
  order:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillCatSchema);
