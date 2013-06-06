'use strict';

describe('Service: checkDigit', function () {

  // load the service's module
  beforeEach(module('sfsApp'));

  // instantiate service
  var checkDigit;
  beforeEach(inject(function(_checkDigit_) {
    checkDigit = _checkDigit_;
  }));

  var goodInputString = '0123456789abcd';
  var longInputString = '01234566789abcd';
  var shortInputString = '012345789abcd';
  var badInputString = '012345#789abcd';

  it('it should fail to compute because of bad input', function () {
    expect(checkDigit.compute(longInputString)).toBe(undefined);
    expect(checkDigit.compute(shortInputString)).toBe(undefined);
    expect(checkDigit.compute(badInputString)).toBe(undefined);
  });

  it('it should compute a good string', function () {
    expect(checkDigit.compute(goodInputString)).toEqual('0123456789abcdr9');
  });

  it('it should fail to verify because of bad input', function () {
    expect(checkDigit.verify(longInputString + 'efg')).toBe(undefined);
    expect(checkDigit.verify(shortInputString)).toBe(undefined);
    expect(checkDigit.verify(badInputString + 'efg')).toBe(undefined);
  });

  it('it should verify a good string', function () {
    expect(checkDigit.verify('0123456789abcdr9')).toBe(true);
  });

  it('it should verify a bad string', function () {
    expect(checkDigit.verify('0123456689abcdr9')).toBe(false);
  });

  it('it should verify a bad (end) string', function () {
    expect(checkDigit.verify('0123456789abcdr0')).toBe(false);
  });
});
