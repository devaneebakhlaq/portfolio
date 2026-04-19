const router  = require('express').Router();
const ctrl    = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

router.post('/login',  ctrl.login);
router.get('/stats',   protect, ctrl.getStats);

module.exports = router;
