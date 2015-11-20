'use strict';

app.controller('CoursesCtrl',
  ['$scope', '$routeParams',
  function($scope, $routeParams) {

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

  console.log($scope.restoreSession);
  if ($scope.restoreSession) {
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
    console.log($scope.data.courses["ACC"][$scope.data.courses["ACC"]["courseNum"].indexOf("104")]);
  };
}]);