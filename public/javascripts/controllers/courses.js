'use strict';

app.controller('CoursesCtrl',
  ['$scope', '$routeParams', '$http', '$location',
  function($scope, $routeParams, $http, $location) {

  // List of courses to be submitted
  $scope.form = [
    { subject: null, coursenum: null },
    { subject: null, coursenum: null },
    { subject: null, coursenum: null }
  ];

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

  $scope.updateSelection = function(subject, index) {
    $scope.form[index].coursenum = null;
    $scope.getCourses(subject);
  };

  $scope.formSubmit = function() {
    $http.post('/save', $scope.form)
    .success(function(data) {
      console.log('posted successfully!');
    }).error(function(data) {
      console.error('error....');
    })
  }
}]);