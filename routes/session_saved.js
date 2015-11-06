var express = require('express');
var router = express.Router();

// GET courses page
router.get('/', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;