'use strict';

angular.module('sfsApp')
.factory('qrDecode', ['$q', '$rootScope', 'qrDecodeErrorString',
  function($q, $rootScope, qrDecodeErrorString) {

    return function(src) {
      var deferred = $q.defer();
      jsqrcode.callback = function(data) {
        if (data !== qrDecodeErrorString) {
          $rootScope.$apply(function() {
            deferred.resolve(data);
          });
        } else {
          $rootScope.$apply(function() {
            deferred.reject(data);
          });
        };
      };
      jsqrcode.decode(src);
      return deferred.promise;
    };

  }]);
