/* global angular */
'use strict';

angular.module('Common')
    .config(function ($stateProvider) {
        $stateProvider
            .state('error', {
                parent: 'tab',
                url: '/error',
                views: {
                    'menuContent': {
                        templateUrl: 'app/common/templates/error.html'
                    }
                },
                resolve: {
                }
            })
            .state('accessdenied', {
                parent: 'tab',
                url: '/accessdenied',
                views: {
                    'menuContent': {
                        templateUrl: 'app/common/templates/accessdenied.html'
                    }
                },
                resolve: {
                }
            });
    });
