'use strict';

describe('Directive: myFileInput', function () {
  beforeEach(module('sfsApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<div><my-file-input></my-file-input></div>');
    element = $compile(element)($rootScope);
    expect(element.html()).toEqual(
      '<span class="btn"><input id="fileInput" type="file" multiple="">' +
      '</span>');
  }));
});
