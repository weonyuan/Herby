'use strict';

app.controller('ResultsCtrl',
  ['$scope', '$routeParams', '$http', '$location', '$q',
  function($scope, $routeParams, $http, $location, $q) {

  var deferred = $q.defer();

  $scope.title = 'Results';

  $http.get('http://10.10.7.161:3000/studentcourseinfo/111111')
    .then(function(response) {
      $scope.transferCourses = response.data;

    }, function(response) {
      console.log(response);
  });

  console.log($scope.transferCourses);

  // Load the list of majors upon startup
  $http.get('http://10.10.7.161:3000/majors')
  .then(function(response) {
    $scope.majors = response.data;
  }, function(response) {
    console.log('Failed to load data.');
  });

  $scope.creditsEarned = 0;
  $scope.remainingCredits = 0;
  $scope.majorCredits = 0;

  $scope.getCreditsInfo = function() {
    $http.get('http://10.10.7.161:3000/maristtransferclasses/' + $scope.major + '/charles.ropes1@marist.edu')
    .then(function(response) {
      $scope.maristCourses = response.data;
      $scope.maristCourses.equivalent = $scope.transferCourses;

      $scope.creditsEarned = $scope.maristCourses.creditTotal;
      $scope.remainingCredits = 120 - $scope.creditsEarned;
      $scope.majorCredits = $scope.maristCourses.majorCreditTotal;
      $scope.percentComplete = $scope.creditsEarned / 120 * 100;


      $scope.updateReport();
    }, function(response) {
      console.log(response);
    });
  };

  $scope.getCreditsInfo();

  $scope.updateReport = function() {
    $('div#majorCredits').empty();
    if ($scope.major === null || $scope.major === undefined || $scope.major === '*') {
      $scope.major = '*';
    } else {
      $('#transferredCredits').append('<div id="majorCredits"><strong>' + $scope.majorCredits + ' credits</strong> will cover a ' + $scope.major + ' major.</div>');
    }

    if ($scope.maristCourses !== null) {
      $scope.creditsEarned = $scope.maristCourses.creditTotal;
      $scope.remainingCredits = 120 - $scope.creditsEarned;
      $scope.majorCredits = $scope.maristCourses.majorCreditTotal;

      $scope.renderChart();
    }
  };

  $scope.renderChart = function() {
    var title = 'Credit Pathway';

    if ($scope.major !== '*') {
      title = 'Credit Pathway for ' + $scope.major + ' Major';
    }

    // Create the chart
    $('#chart').highcharts({
        chart: {
            type: 'pie',
            renderTo: 'chart'
        },
        title: {
            text: title
        },
        plotOptions: {
            pie: {
                innerSize: '60%',
                size: '100%',
                dataLabels: {
                  enabled: false
                },
                showInLegend: true,
                shadow: false
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.point.y +'</b> credits (' + (this.point.y/120)*100 + '%)' ;
            }
        },
        series: [{
            name: 'Credit Pathway to ' + $scope.major,
            data: [{
                name: 'Credits remaining',
                y: $scope.remainingCredits,
                color: "#D1D0CE"
            }, {
                name: 'Non-major credits',
                y: $scope.creditsEarned - $scope.majorCredits,
                color: "#808080"
            }, {
                name: 'Major credits',
                y: $scope.majorCredits,
                color: "#B31B1B"
            }],
            point: {
                events: {
                    legendItemClick: function () {
                        return false; // <== returning false will cancel the default action
                    }
                }
            }
        }]
    });
  }

  $scope.editCourses = function() {
    $location.path('/courses');
  }
}]);