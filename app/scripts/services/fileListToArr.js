'use strict';

angular.module('sfsApp')
  .factory('fileListToArr', [function() {
    // Service logic
    // ...

    var arr = [];

    // Public API here
    return {
      toArr: function(fileList) {
        angular.forEach(fileList, function(key, value) {
          this.push(key);
        }, arr);
        return arr;
      }
    };
  }]);
