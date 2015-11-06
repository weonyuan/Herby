var express = require('express');
var router = express.Router();

// POST page after receiving the form with basic information
router.post('/', function(req, res, next) {
  res.send('first name: ' + req.body.firstName +
           '; last name: ' + req.body.lastName +
           '; email: ' + req.body.email);
});

// POST page after receiving courses submission
router.post('/courses', function(req, res, next) {
  res.send('got your courses!');
});

module.exports = router;