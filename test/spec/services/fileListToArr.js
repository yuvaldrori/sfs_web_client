'use strict';

describe('Service: fileListToArr', function () {

  // load the service's module
  beforeEach(module('sfsApp'));

  // instantiate service
  var fileListToArr;
  beforeEach(inject(function(_fileListToArr_) {
    fileListToArr = _fileListToArr_;
  }));

  it('to make array out of object', function () {
    expect(fileListToArr.toArr({0: {}, 1: {}})).toEqual([{}, {}]);
  });

});
