'use strict';

app.controller('CoursesCtrl',
  ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

  $scope.courseTemplate = {
      subject: null,
      courseNum: null
  }

  $scope.form = [
    { subject: null, courseNum: null },
    { subject: null, courseNum: null },
    { subject: null, courseNum: null }
  ]

  $scope.restoreSession;

  if ($scope.restoreSession) {
    document.getElementById('select-school').selectedIndex = 1;

    for (var i = 0; i < sessions['111111']['session'].length; i++) {
      if (i >= $scope.form.length) {
        $scope.form.push({});
      }

      $scope.form[i]['subject'] = sessions['111111']['session'][i]['subject'];
      $scope.form[i]['courseNum'] = sessions['111111']['session'][i]['courseNum'];
    }
  }

  $scope.data = {
    courses: courses
  }

  $scope.addCourse = function() {
    $scope.form.push($scope.courseTemplate);
  }

  $scope.updateSelection = function() {
    
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