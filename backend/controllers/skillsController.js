const Skill = require('../models/Skill');

// GET /api/skills — public
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort('order title');
    res.json({ success: true, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/skills — admin (create category)
exports.createCategory = async (req, res) => {
  try {
    const cat = await Skill.create(req.body);
    res.status(201).json({ success: true, data: cat });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/skills/:id — admin (update category + its skills)
exports.updateCategory = async (req, res) => {
  try {
    const cat = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cat) return res.status(404).json({ success: false, message: 'Skill category not found' });
    res.json({ success: true, data: cat });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/skills/:id — admin
exports.deleteCategory = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Skill category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
