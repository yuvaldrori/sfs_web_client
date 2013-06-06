'use strict';

angular.module('sfsApp')
  .controller('CodeCtrl', ['$scope', '$filter', 'checkDigit', function ($scope,
    $filter, checkDigit) {
    var now = Date.now();
    // generate random \d a-z
    var randomChars = function(digits) {
      return Math.floor(Math.random()*Math.pow(36, digits)).toString(36);
    };
    var random = $filter('lowercase')(randomChars(6));
    var ddMM = $filter('date')(now, 'ddMM');
    var yyyy = $filter('date')(now, 'yyyy');
    var data = ddMM + yyyy + random;
    var folderName = checkDigit.compute(data);
    $scope.folderName = folderName;
    $scope.ddMM = ddMM;
    $scope.yyyy = yyyy;
    $scope.first = folderName.substr(8, 4);
    $scope.second = folderName.substr(12, 4);
  }]);
