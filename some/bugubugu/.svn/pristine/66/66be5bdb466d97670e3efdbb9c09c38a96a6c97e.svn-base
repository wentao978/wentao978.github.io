/* global angular */
'use strict';

angular.module('Common')
    .factory('authInterceptor', function($rootScope, $q, $location, localStorageService) {
        return {
            // Add authorization token to headers
            request: function(config) {
                config.headers = config.headers || {};
                var token = localStorageService.get('token');

                if (token && token.expires && token.expires > new Date().getTime()) {
                    config.headers['x-auth-token'] = token.token;
                }

                return config;
            }
        };
    })
    
    .factory('httpErrorHandler', function($q, $injector, $rootScope) {
        return {
            'responseError': function(rejection) {
                // do something on error
                $rootScope.hideMessage();
                var status = rejection.status;
                var $state = $injector.get('$state');
                var DebugLog = $injector.get('DebugLog');

                if (!status){
                    $state.go("networkErr");
                } else if (status === 500) {
                    var msg;
                    if(rejection.data && rejection.data.message) {
                        msg = rejection.data.message;
                    } else {
                        msg = '服务器错误，请稍后再试!';
                    }
                    if (msg.indexOf('exception') >= 0 || msg.indexOf('Exception') >= 0 ){
                        DebugLog.log(msg);
                    } else {
                        $rootScope.showMessage(msg, 1000);
                    }
                } else if (status == 401 && rejection.data.path !== '/api/hunt/account') {
                    // 如果是初始化的时候同过期的token获取用户account，就不弹出登陆
                    var Auth = $injector.get('Auth');
                    var to = $rootScope.redirectName;
                    var params = $rootScope.redirectParam;
                    Auth.logout();
                    $rootScope.loginPopup();
                }
                return $q.reject(rejection);
            }
        };
    })
    ;
