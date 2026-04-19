const router  = require('express').Router();
const ctrl    = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

router.get('/',   ctrl.getProfile);
router.put('/',   protect, ctrl.updateProfile);

module.exports = router;
