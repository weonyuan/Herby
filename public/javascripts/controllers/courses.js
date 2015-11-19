'use strict';

app.controller('CoursesCtrl',
  ['$scope', '$routeParams',
  function($scope, $routeParams) {

  $scope.data = {
    courses: courses
  }

  $scope.form = [
    { subject: null, courseNum: null },
    { subject: null, courseNum: null },
    { subject: null, courseNum: null }
  ]

  $scope.addCourse = function() {
    $scope.courseTemplate = {
      subject: null,
      courseNum: null
    }
    $scope.form.push($scope.courseTemplate);
  }

  $scope.updateSelection = function() {
    console.log($scope.data.courses["ACC"][$scope.data.courses["ACC"]["courseNum"].indexOf("104")]);
  };
}]);