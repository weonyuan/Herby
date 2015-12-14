'use strict';

app.controller('SessionCtrl',
  ['$scope', '$routeParams', '$http', '$location', 'sessionService',
  function($scope, $routeParams, $http, $location, sessionService) {

  $scope.title = 'Save Session';

  $scope.sessionID = sessionService.generateSessionID();
  
}]);