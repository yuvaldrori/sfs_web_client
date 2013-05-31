'use strict';

describe('Controller: CodeCtrl', function () {

  // load the controller's module
  beforeEach(module('sfsApp'));

  var CodeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CodeCtrl = $controller('CodeCtrl', {
      $scope: scope
    });
  }));

  it('first and second should be 0-9 a-z', function () {
    expect(scope.first).toMatch(/[\da-z]{4}/);
    expect(scope.second).toMatch(/[\da-z]{4}/);
  });
  it('first should be different from second', function () {
    expect(scope.first).toNotEqual(scope.second);
  });
  it('ddMM should be 00-31 00-12', function () {
    expect(scope.ddMM).toMatch(/[0-3][0-9][0-1][0-9]/);
  });
  it('yyyy should be 4 digit', function () {
    expect(scope.ddMM).toMatch(/\d{4}/);
  });
  it('folder name should be 16 chars long', function () {
    expect(scope.folderName.length).toEqual(16);
  });
});
