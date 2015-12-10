'use strict';

app.controller('ResultsCtrl',
  ['$scope', '$routeParams', '$http', '$location',
  function($scope, $routeParams, $http, $location) {

  $scope.title = 'Results';
  // Load the list of majors upon startup
  $http.get('http://10.10.7.161:3000/majors')
  .then(function(response) {
    $scope.majors = response.data;
  }, function(response) {
    console.log('Failed to load data.');
  });

  $scope.major = '*';
  $http.get('http://10.10.7.161:3000/maristtransferclasses/' + $scope.major + '/charles.ropes1@marist.edu')
  .then(function(response) {
    $scope.courses = response.data;
  }, function(response) {
    console.log('Failed to load data.');
  });


  $scope.updateReport = function() {
    if ($scope.major !== null) {
      console.log($scope.major);

      $http.get('http://10.10.7.161:3000/maristtransferclasses/' + $scope.major + '/charles.ropes1@marist.edu')
      .then(function(response) {
        $scope.courses = response.data;
      }, function(response) {
        console.log('Failed to load data.');
      });

      console.log($scope.courses);
    }
  }

  var categories = ['MSIE', 'Firefox', 'Chrome', 'Safari', 'Opera'],
      data = [{
          y: 0,
          color: '#286090',
          drilldown: {
              name: 'Opera versions',
              categories: ['Opera v12.x', 'Opera v27', 'Opera v28', 'Opera v29'],
              data: [0.34, 0.17, 0.24, 0.16]
          }
      }],
      browserData = [],
      versionsData = [],
      i,
      j,
      dataLen = data.length,
      drillDataLen,
      brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add version data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    $('#chart').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Credit Breakdown'
        },
        yAxis: {
            title: {
                text: 'Credit Breakdown'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '40%']
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: 'Browsers',
            data: browserData,
            size: '60%',
            innerSize: '20%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
            }
        }, {
            name: 'Versions',
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }]
    });


  $scope.editCourses = function() {
    $location.path('/courses');
  }
}]);