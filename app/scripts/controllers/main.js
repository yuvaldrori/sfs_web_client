'use strict';

angular.module('sfsApp')
.controller('MainCtrl', ['$scope', 'qrDecode', '$dialog',
  function ($scope, qrDecode, $dialog) {

    $scope.qrDecode = function(src) {
      qrDecode(src).then(function(result) {
        console.log('result: ' + result);
        $scope.decoded = result;
      }, function(data) {
        var d = $dialog.dialog();
        d.open('views/manualCode.html', 'ManualCodeCtrl');
      });
    };

  }]);
