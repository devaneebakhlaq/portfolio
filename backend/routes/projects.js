const router  = require('express').Router();
const ctrl    = require('../controllers/projectsController');
const { protect } = require('../middleware/auth');

router.get('/',         ctrl.getProjects);           // public — featured only
router.get('/all',      protect, ctrl.getAllProjects);// admin — all
router.get('/:id',      ctrl.getProject);            // public
router.post('/',        protect, ctrl.createProject);
router.put('/:id',      protect, ctrl.updateProject);
router.delete('/:id',   protect, ctrl.deleteProject);

module.exports = router;
