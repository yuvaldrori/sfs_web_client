'use strict';

angular.module('sfsApp')
.factory('qrDecode', ['$q', '$rootScope', 'qrDecodeErrorString',
  function($q, $rootScope, qrDecodeErrorString) {

    return function(src) {
      var deferred = $q.defer();
      qrcode.callback = function(data) {
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
      qrcode.decode(src);
      return deferred.promise;
    };

  }]);
