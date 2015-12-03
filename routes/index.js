var express = require('express');
var document = require('browserify');
var router = express.Router();
var app = 'Foxify';

var userSession = {
  "dupe@dupe.com": { "sessionNum": "111111" }
};

function randomize() {
  var random = '';
  var limit = 6;

  for (var i = 0; i < limit; i++) {
    random += Math.floor(Math.random() * 10);
  }

  return random;
}

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: app, header: 'Welcome to Foxify!' });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: app, header: 'Welcome to Foxify!' });
});

router.get('/form', function(req, res, next) {
  res.render('form', { title: app, header: 'Credit Evaluation' });
});

router.post('/form', function(req, res, next) {
  res.render('form', { title: app, header: 'Credit Evaluation' });
});

router.post('/courses', function(req, res, next) {
  var existingSession = false;
  var restoreSession = false;

  // Alerts the user if they have a saved session
  if (userSession[req.body.email] !== undefined) {
    if (userSession[req.body.email]['sessionNum'] !== undefined ||
        userSession[req.body.email]['sessionNum'] !== null) {
      existingSession = true;
    }
  }

  // Restores the user's session
  if (userSession[req.body.email] !== undefined &&
      req.body.sessionNum === userSession[req.body.email]['sessionNum']) {
    restoreSession = true;
    existingSession = false;
  } else {
    console.log('There is no session associated with this email and session number.');
  }

  console.log(restoreSession);  
  res.render('courses', { title: app, header: 'Add Courses', alertMsg: existingSession, session: restoreSession });
});

router.get('/restore', function(req, res, next) {
  res.render('restore', { title: app, header: 'Restore Session' });
});

router.post('/results', function(req, res, next) {
  res.render('results', { title: app, header: 'Results' });
});

router.post('/save', function(req, res, next) {
  console.log(req.body);
  res.render('session_saved', { title: app, header: 'Save Session', sessionNum: randomize() });
});

module.exports = router;