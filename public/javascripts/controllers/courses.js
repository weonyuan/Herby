'use strict';

app.controller('CoursesCtrl',
  ['$scope', '$routeParams', '$http', '$location', 'sessionService',
  function($scope, $routeParams, $http, $location, sessionService) {

  $scope.title = 'Add Courses';

  // Basic information
  $scope.firstName;
  $scope.lastName;
  $scope.email;

  // List of courses to be submitted
  $scope.form = [
    { 'subject': null, 'coursenum': null },
    { 'subject': null, 'coursenum': null },
    { 'subject': null, 'coursenum': null }
  ];

  $scope.sessionID = sessionService.generateSessionID();

  // Load up the list of subjects upon startup
  $http.get('http://10.10.7.161:3000/subjects')
  .then(function(response) {
    $scope.subjects = response.data;
  }, function(response) {
    console.log('Failed to load data.');
  });

  // When subject(s) are entered, load up the appropriate list of courses
  // and then save them locally for fast lookup
  $scope.courses = {};
  $scope.getCourses = function(subject) {
    // Call the API if the courses under that subject don't exist locally
    if ($scope.courses[subject] === undefined) {
      $http.get('http://10.10.7.161:3000/DCCCourseInfo/' + subject)
      .then(function(response) {
        $scope.courses[subject] = response.data[subject];
      }, function(response) {
        console.log('Failed to load data.');
      });
    }
  };

  // Check to see if previous session needs to be restored
  $scope.restoreSession;
  if ($scope.restoreSession) {
    document.getElementById('select-school').selectedIndex = 1;

    for (var i = 0; i < sessions['111111']['session'].length; i++) {
      // Expand the form if the session's courses surpass the form's default size
      if (i >= $scope.form.length) {
        $scope.form.push({});
      }

      $scope.form[i]['subject'] = sessions['111111']['session'][i]['subject'];

      // Since courses are not loaded immediately, get them as we iterate
      $scope.getCourses($scope.form[i]['subject']);
      $scope.form[i]['coursenum'] = sessions['111111']['session'][i]['coursenum'];
    }
  }

  $scope.addCourse = function() {
    $scope.form.push({});
  }

  $scope.removeCourse = function(index) {
    $scope.form.splice(index, 1);
  }

  $scope.updateSelection = function(subject, index) {
    $scope.form[index].coursenum = null;
    $scope.getCourses(subject);
    console.log($scope.form)
  };

  $scope.saveSession = function() {
    var request = {
      method: 'POST',
      url: 'http://10.10.7.161:3000/insertstudentclasses',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "student_classes": {
          "sesID": $scope.sessionID,
          "emailAdd": $scope.email,
          "session": $scope.form
        }
      }
    }

    $http(request).then(function(data) {
        console.log(request.data);
        $location.path('/save');
    }, function(response) {
      console.log('An error has occurred.');
    });
  };

  $scope.formSubmit = function() {
    /*$http.post('http://10.10.7.161:3000/insertstudent/' + 
      $scope.firstName + '/' + $scope.lastName + '/' +
      $scope.email, $scope.form)
      .then(function(data) {
        $scope.processForm();
      }, function(response) {
        console.log('An error has occurred.');
      }
    );*/
    $scope.processForm();
  };

  $scope.processForm = function() {
    var request = {
      method: 'POST',
      url: 'http://10.10.7.161:3000/insertstudentclasses',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "student_classes": {
          "sesID": $scope.sessionID,
          "emailAdd": $scope.email,
          "session": $scope.form
        }
      }
    }

    $http(request).then(function(data) {
        console.log(request.data);
        console.log('submitted!');
        $location.path('/submitted');
    }, function(response) {
      console.log('An error has occurred.');
    });
  }
}]);