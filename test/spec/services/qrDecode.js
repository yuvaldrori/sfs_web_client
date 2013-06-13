'use strict';

describe('Service: qrDecode', function () {

  // load the service's module
  beforeEach(module('sfsApp'));

  // instantiate service
  var qrDecode;
  beforeEach(inject(function(_qrDecode_) {
    qrDecode = _qrDecode_;
  }));

  it('should do something', function () {
    expect(!!qrDecode).toBe(true);
  });

});
