'use strict';

angular.module('sfsApp')
  .directive('dropzone', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        element.bind('dragover', function(e) {
          e.stopPropagation();
          e.preventDefault();
        });
        element.bind('dragenter', function(e) {
          e.stopPropagation();
          e.preventDefault();
        });
        element.bind('drop', function(e) {
          e.stopPropagation();
          e.preventDefault();
          var files = e.originalEvent.dataTransfer.files;
          scope.files = scope.fileListToArr(files);
          scope.$apply();
        });
      }
    };
  });
