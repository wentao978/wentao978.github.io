/* globals $ */
/* globals angular, ionic */
'use strict';

angular.module('Common')
    .directive('ionProcessSpinner', [
        function () {
            return {
                scope: {
                    'cssClass': '@?',
                    'processing': '=',
                    'spinner': '@?'
                },
                restrict: 'E',
                transclude: true,
                template: '<div ng-transclude="" ng-if="!processing"></div><ion-spinner ng-if="processing" ng-class="cssClass" class="center" icon="{{spinner || \'crescent\'}}"></ion-spinner>'
            };
        }
    ])
    .directive("detectFocus", function($timeout, $rootScope) {
        return {
            "restrict" : "A",
            "link" : function(scope, elem, attrs) {

                elem.on('focus', function(e) {
                    if (ionic.Platform.isIOS()) {
                        ionic.keyboard.disable();
                    }
                });
                elem.on('focusout', function (e) {
                    if (ionic.Platform.isIOS()) {
                        ionic.keyboard.eable();
                    }
                });
            }
        };
    })
    ;
