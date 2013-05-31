'use strict';

angular.module('sfsApp', ['monospaced.qrcode'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/code', {
        templateUrl: 'views/code.html',
        controller: 'CodeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
