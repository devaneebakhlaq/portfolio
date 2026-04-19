const router  = require('express').Router();
const ctrl    = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Rate limit: max 5 messages per 15 min per IP
const contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many messages sent. Please wait 15 minutes.' },
});

router.post('/',                    contactLimit, ctrl.sendMessage);      // public
router.get('/messages',             protect, ctrl.getMessages);           // admin
router.patch('/messages/:id/read',  protect, ctrl.markRead);              // admin
router.delete('/messages/:id',      protect, ctrl.deleteMessage);         // admin

module.exports = router;
