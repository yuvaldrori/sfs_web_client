'use strict';

describe('Controller: ManualCodeCtrl', function () {

  // load the controller's module
  beforeEach(module('sfsApp'));

  var ManualCodeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManualCodeCtrl = $controller('ManualCodeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
