'use strict';

angular.module('sfsApp', ['monospaced.qrcode', 'ui.bootstrap'])
  .value('qrDecodeErrorString', 'error decoding QR Code')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        reloadOnSearch: false,
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
