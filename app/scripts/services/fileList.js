'use strict';

angular.module('sfsApp')
  .factory('fileList', ['$window', function($window) {
    // Service logic
    // ...

    var arr = [];

    var createSrc = function(file) {
      return $window.URL.createObjectURL(file);
    };

    // Public API here
    return function(filesObject) {
      angular.forEach(filesObject, function(key, value) {
        key.src = createSrc(key);
        this.push(key);
      }, arr);
      return arr;
    };
  }]);
