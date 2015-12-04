'use strict';

app.controller('CoursesCtrl',
  ['$scope', '$routeParams', '$http', '$location',
  function($scope, $routeParams, $http, $location) {

  $scope.form = [
    { subject: null, coursenum: null },
    { subject: null, coursenum: null },
    { subject: null, coursenum: null }
  ];

  $http.get('http://10.10.7.161:3000/subjects')
  .then(function(response) {
    $scope.subjects = response.data;
  }, function(response) {
    console.log('Failed to load data.');
  });

  $scope.courses = {};

  $scope.getCourses = function(subject) {
    if ($scope.courses[subject] === undefined) {
      $http.get('http://10.10.7.161:3000/DCCCourseInfo/' + subject)
      .then(function(response) {
        $scope.courses[subject] = response.data[subject];
      }, function(response) {
        console.log('Failed to load data.');
      });
    }
  };

  $scope.restoreSession;
  if ($scope.restoreSession) {
    document.getElementById('select-school').selectedIndex = 1;

    for (var i = 0; i < sessions['111111']['session'].length; i++) {
      if (i >= $scope.form.length) {
        $scope.form.push({});
      }

      $scope.form[i]['subject'] = sessions['111111']['session'][i]['subject'];
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