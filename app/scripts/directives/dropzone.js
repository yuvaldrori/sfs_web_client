'use strict';

angular.module('sfsApp')
  .directive('dropzone', ['fileList', function (fileList) {
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
          scope.files = fileList(files);
          scope.$apply();
        });
      }
    };
  }]);
