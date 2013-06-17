'use strict';

angular.module('sfsApp')
.controller('MainCtrl', ['$scope', 'qrDecode', '$dialog', '$location',
  '$routeParams',
  function ($scope, qrDecode, $dialog, $location, $routeParams) {

    $scope.$on('$routeUpdate', function(){
      
    });

    $scope.decoded = undefined;
    $scope.decoding = undefined;

    $scope.qrDecode = function(src) {
      $scope.decoding = true;
      qrDecode(src, $scope.decoding).then(function(result) {
        $location.search('event',  result);
      }, function(data) {
        var d = $dialog.dialog({resolve: {src: function() {
          return angular.copy(src);}}});
        d.open('views/manualCode.html', 'ManualCodeCtrl');
      });
    };

  }]);
