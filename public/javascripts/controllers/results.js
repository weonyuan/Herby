'use strict';

app.controller('ResultsCtrl',
  ['$scope', '$routeParams', '$http', '$location', '$q',
  function($scope, $routeParams, $http, $location, $q) {

  var deferred = $q.defer();

  $scope.title = 'Results';
  // Load the list of majors upon startup
  $http.get('http://10.10.7.161:3000/majors')
  .then(function(response) {
    $scope.majors = response.data;
  }, function(response) {
    console.log('Failed to load data.');
  });

  $scope.major = '*';

  $scope.creditsEarned = 0;
  $scope.remainingCredits = 0;
  $scope.majorCredits = 0;

  $scope.getCreditsInfo = function() {
    $http.get('http://10.10.7.161:3000/maristtransferclasses/' + $scope.major + '/charles.ropes1@marist.edu')
    .then(function(response) {
      $scope.courses = response.data;
      $scope.updateReport();
    }, function(response) {
      console.log(response);
    });
  };

  $scope.getCreditsInfo();

  $scope.updateReport = function() {
    if ($scope.major !== null) {
      if ($scope.courses !== null) {
        $scope.creditsEarned = $scope.courses.creditTotal;
        $scope.remainingCredits = 120 - $scope.creditsEarned;
        $scope.majorCredits = $scope.courses.majorCreditTotal;

        $scope.renderChart();
      }
    }
  };

  $scope.renderChart = function() {
    // Create the chart
    $('#chart').highcharts({
        chart: {
            type: 'pie',
            renderTo: 'chart'
        },
        title: {
            text: 'Credit Pathway for ' + $scope.major + ' Major'
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
                color: Highcharts.getOptions().colors[0]
            }, {
                name: 'Non-major credits',
                y: $scope.creditsEarned - $scope.majorCredits,
                color: Highcharts.getOptions().colors[1]
            }, {
                name: 'Major credits',
                y: $scope.majorCredits,
                color: Highcharts.getOptions().colors[2]
            }]
        }]
    });
  }

  $scope.editCourses = function() {
    $location.path('/courses');
  }
}]);