'use strict';

describe('Service: fileList', function () {

  // load the service's module
  beforeEach(module('sfsApp'));

  // instantiate service
  var fileList;
  beforeEach(inject(function($injector) {
    fileList = $injector.get('fileList');
  }));

/*  it('to make array out of object', function () {
    expect(fileList({0: {}, 1: {}})).toEqual([{}, {}]);
  }); */

});
