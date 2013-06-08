'use strict';

angular.module('sfsApp')
  .directive('myFileInput', ['fileList', function (fileList) {
    return {
      template: '<span class="btn">' +
                '<input id="fileInput" type="file" multiple>' +
                '</span>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        element.append(attrs.text);
        var inputElement = jQuery('#fileInput', element);
        inputElement.click(function(e) {
          e.stopPropagation();
        });
        inputElement.change(function(e) {
          var files = fileList(e.target.files);
          scope.files = files;
          scope.$apply();
        });
        element.click(function() {
          inputElement.click();
        });
      }
    };
  }]);

