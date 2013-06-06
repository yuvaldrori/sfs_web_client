'use strict';

angular.module('sfsApp')
  .directive('myFileInput', [function () {
    return {
      template: '<span class="btn">' +
                '<input id="fileInput" type="file" multiple>' +
                '</span>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        element.append(attrs.text);
        var inputElement = angular.element('#fileInput');
        inputElement.click(function(e) {
          e.stopPropagation();
        });
        inputElement.change(function(e) {
          var files = event.target.files;
          scope.files = scope.fileListToArr(files);
          scope.$apply();
        });
        element.click(function() {
          inputElement.click();
        });
      }
    };
  }]);

