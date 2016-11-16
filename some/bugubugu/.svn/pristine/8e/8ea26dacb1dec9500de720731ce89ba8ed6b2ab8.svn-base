/* global angular */
'use strict';

angular.module('Common.utils')
  .service('DebugLog', function () {

    var showFunc;
    return {
      bind: function (fn) {
        showFunc = fn;
        if (typeof showFunc !== 'function') {
          throw new Error('Expected confirm function, got ' + JSON.stringify(fn));
        }
      },
      log: function (msg) {
        if (showFunc) {
            return showFunc(msg);
        }
      }
    };
  });

