'use strict';

app.controller('CoursesCtrl',
  ['$scope', '$routeParams',
  function($scope, $routeParams) {

  $scope.data = {
    courses: courses,
    numCourses: 3
  }

  $scope.form = [
    { subject: null, courseNum: null },
    { subject: null, courseNum: null },
    { subject: null, courseNum: null }
  ]

  $scope.updateSelection = function() {
    console.log($scope.form);
    console.log($scope.data.courses[$scope.form.subject]);
  };

  console.log($scope.data.numCourses);
  console.log($scope.form);
}]);