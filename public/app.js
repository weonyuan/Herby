'use strict';

var app = angular
  .module('foxifyApp', [
    'ngRoute'
  ])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/courses', {
        templateUrl: 'views/courses.html',
        controller: 'CoursesCtrl'
      })
      .otherwise({
        redirectTo: '/courses'
      });
  }]);