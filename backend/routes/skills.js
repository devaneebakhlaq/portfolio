const router  = require('express').Router();
const ctrl    = require('../controllers/skillsController');
const { protect } = require('../middleware/auth');

router.get('/',       ctrl.getSkills);
router.post('/',      protect, ctrl.createCategory);
router.put('/:id',    protect, ctrl.updateCategory);
router.delete('/:id', protect, ctrl.deleteCategory);

module.exports = router;
