/*
Adaptation of code from:
https://github.com/danieltwagner/iso7064

iso7064 library Copyright Notices
---------------------------------

Copyright 2012 Daniel T. Wagner
*/
'use strict';

angular.module('sfsApp')
  .factory('checkDigit', [function() {
    // Service logic
    // ...

    // Public API here
    return {
      verify: function(str) {
        var re = /^[\da-z]{16}$/
        if (!re.test(str)) {
          return undefined;
        }
        var dataonly = str.substring(0, str.length - 2);
        return str === this.compute(dataonly);
      },
      compute: function(str) {
        var re = /^[\da-z]{14}$/
        if (!re.test(str)) {
          return undefined;
        }
        var m = 1271;
        var r = 36;
        var cs = '0123456789abcdefghijklmnopqrstuvwxzy';
        var p = 0;
        var checksum = 0;
        var first = 0;
        var second = 0;

        for (var i = 0; i < str.length; i++) {
          var val = str.indexOf(str.charAt(i));
          p = ((p + val) * r)%m;
        }

        p = (p * r)%m;

        checksum = (m - p + 1)%m;

        second = checksum % r;
        first = (checksum - second) / r;
        return str + cs.charAt(first) + cs.charAt(second);
      }
    };
  }]);
