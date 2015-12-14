'use strict';

var app = angular
  .module('foxifyApp', [
    'ngRoute'
  ])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/courses.html',
        controller: 'CoursesCtrl'
      })
      .when('/submitted', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .when('/save', {
        templateUrl: 'views/session.html',
        controller: 'SessionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);