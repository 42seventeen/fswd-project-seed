var express = require('express'),
router = express.Router();
// Webcast = require('../models').Webcast;

router.get("/", function(req, res) {
  res.redirect('/webcast/dashboard');
});

router.use('/users', require('./routes/users'));
router.use('/webcast', require('./routes/webcasts'));
router.use('/channels', require('./routes/channels'));


module.exports = router;
