var express = require('express');
var router = express.Router();
var app = 'Foxify'

function randomize() {
  var random = '';
  var limit = 6;

  for (var i = 0; i < limit; i++) {
    random += Math.floor(Math.random() * 10);
  }

  return random;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: app });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: app });
});

router.post('/courses', function(req, res, next) {
  // res.send('first name: ' + req.body.firstName +
  //          '; last name: ' + req.body.lastName +
  //          '; email: ' + req.body.email);
  res.render('courses', { title: app, header: 'Add Courses' });
});

router.post('/results', function(req, res, next) {
  res.render('results', { title: app, header: 'Results' });
});

router.post('/save', function(req, res, next) {
  res.render('session_saved', { title: app, header: 'Save Session', sessionNum: randomize() });
});

module.exports = router;