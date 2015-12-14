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
  }])

  .service('sessionService', function() {
    return {
      generateSessionID: function generate() {
        var sessionID = '';
        
        if (localStorage.getItem('sessionID') === null ||
            localStorage.getItem('sessionID') === undefined) {
          var limit = 6;

          // Generate a random session ID
          for (var i = 0; i < limit; i++) {
            sessionID += Math.floor(Math.random() * 10);
          }

          localStorage.setItem('sessionID', sessionID);
        } else {
          sessionID = localStorage.getItem('sessionID');
        }

        return sessionID;
      }
    };
  });