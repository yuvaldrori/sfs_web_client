'use strict';

angular.module('sfsApp')
  .controller('CodeCtrl', ['$scope', '$filter', function ($scope, $filter) {
    var now = Date.now();
    // generate 4 random \d a-z
    var randomChars = function(digits) {
      return Math.floor(Math.random()*Math.pow(36, digits)).toString(36);
    };
    $scope.first = $filter('lowercase')(randomChars(4));
    $scope.second = $filter('lowercase')(randomChars(4));
    $scope.ddMM = $filter('date')(now, 'ddMM');
    $scope.yyyy = $filter('date')(now, 'yyyy');
    $scope.folderName = $scope.ddMM + $scope.yyyy + $scope.first +
      $scope.second;
  }]);
