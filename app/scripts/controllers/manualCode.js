'use strict';

angular.module('sfsApp')
.controller('ManualCodeCtrl', ['$scope', 'dialog', 'checkDigit', '$location',
  function ($scope, dialog, checkDigit, $location) {

    $scope.name = undefined;
    $scope.invalid = undefined;

    $scope.close = function() {
      if ($scope.name) {
        $location.path('/event/$scope.name');
      };
      dialog.close($scope.name);
    };

    $scope.validate = function() {
      if ($scope.manualCode.$valid) {
        var name = '';
        name = $scope.ddMM + $scope.yyyy + $scope.first + $scope.second;
        if (checkDigit.verify(name)) {
          $scope.invalid = undefined;
          $scope.name = name;
        } else {
          $scope.invalid = true;
        };
      };
    };

  }]);
