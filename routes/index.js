var express = require('express');
var document = require('browserify');
var http = require('http');
var router = express.Router();
var app = 'Foxify';

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
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  
  if (req.body.sessionNum !== undefined) {
    var sessionID = req.body.sessionNum;
  }

  var options = {
      host: '10.10.7.161',
      port: 3000,
      path: '/sesid/' + email,
      method: 'GET'
  }

  var req = http.request(options, function(response) {
    var data = [];
    response.setEncoding('utf8');
    response.on('data', function(chunk) {
      data.push(chunk);
    })
    response.on('end', function() {
      var result = JSON.parse(data.join(''));

      userSession = result;

      // Alerts the user if they have a saved session
      if (userSession[email] !== undefined) {
        existingSession = true;
      }

      // Restores the user's session
      if (sessionID === userSession[email]) {
        restoreSession = true;
        existingSession = false;
      }

      console.log(userSession[email]);
      console.log(restoreSession);
      console.log(existingSession);
  
      res.render('courses', { title: app, header: 'Add Courses', alertMsg: existingSession, session: restoreSession, firstName: firstName, lastName: lastName, email: email, sessionID: sessionID });
    })
    req.on('error', function(e) {
        console.log('\n\n==========ERROR==============')
        console.log('problem with request: ' + e.message);
    })
  });

  req.end();
});

router.get('/restore', function(req, res, next) {
  res.render('restore', { title: app, header: 'Restore Session' });
});

router.post('/submitted', function(req, res, next) {
  res.render('submitted', { title: app, header: 'Results' });
});

router.post('/save', function(req, res, next) {
  res.render('session_saved', { title: app, header: 'Save Session', sessionNum: randomize() });
});

module.exports = router;