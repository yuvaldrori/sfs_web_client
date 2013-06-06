'use strict';

angular.module('sfsApp')
  .controller('MainCtrl', ['$scope', 'fileListToArr', function ($scope,
    fileListToArr) {
    $scope.fileListToArr = fileListToArr.toArr;
  }]);
