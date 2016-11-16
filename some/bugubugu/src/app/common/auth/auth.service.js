/* global angular */
'use strict';

angular.module('Common.Auth', ['http-auth-interceptor'])
    .factory('Auth', function ($rootScope, $http, $q, $location, $timeout, $ionicLoading,authService, Account, localStorageService,
                                Alertify, ENV, API_ENDPOINT) {
    var currentUser;
    var service = {
        weixinLogin: function (code) {
            
            var data = 'code=' + encodeURIComponent(code);
            $http.post('/api/wx/auth', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                ignoreAuthModule: 'ignoreAuthModule'
            })
            .success(function (data, status, headers, config) {

                if (data.success) {
                    currentUser = data.user;
                    $rootScope.account = currentUser;
                    $rootScope.loadAccount.resolve(true);
                    authService.loginConfirmed(data.user, function (config) {
                        return config;
                    });
                } else {
                    // 对于未注册用户，用微信自动登录会失败
                    $rootScope.loadAccount.reject('登录失败:' + data.message);
                    $rootScope.$broadcast('event:auth-login-failed', null);
                    currentUser = null;
                    $rootScope.account = null;
                }
            })
            .error(function (data, status, headers, config) {
                // 由于微信错误而登录失败
                $rootScope.loadAccount.reject('登录失败:' + data.message);
                $rootScope.$broadcast('event:auth-login-failed', status);
                currentUser = null;
                $rootScope.account = null;
            });
        },
        checkLogin: function () {
            // get user account with storaged account, like auto-login. 
            var account = localStorageService.get('auth.account');
            var password = localStorageService.get('auth.password');
            if (account && password) {
                var user = {
                    account: account,
                    psw: password
                }
                this.login(user)
            } else {
                $rootScope.loadAccount.reject('登录失败: 没有存储用户名');
            }
        },
        login: function (user, successCallback, errorCallback) {
            var data = 'account=' + encodeURIComponent(user.account) + '&psw=' + encodeURIComponent(user.psw);
            // http://www.bookbugu.com/Actionlogin
            $http.post(API_ENDPOINT + 'Actionlogin', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                ignoreAuthModule: 'ignoreAuthModule'
            })
            .success(function (data, status, headers, config) {
                if (data.result != 1) { // 登录失败
                    $rootScope.$broadcast('event:auth-login-failed', status);
                    currentUser = null;
                    $rootScope.account = null;
                    if(data.msg == "帐号不存在"){
                        $rootScope.showMessage('账号不存在', 1000);
                        user.account="";
                        user.psw="";
                    }else if(data.msg == "密码错误"){
                        $rootScope.showMessage('密码错误', 1000);
                        user.psw="";
                    }
                    if (errorCallback) {
                        errorCallback();
                    }
                    
                }else{
                    localStorageService.set('auth.account', user.account);
                    localStorageService.set('auth.password', user.psw);
                    var userId = data.userid;
                    // Need to inform the http-auth-interceptor that
                    // the user has logged in successfully.  To do this, we pass in a function that
                    // will configure the request headers with the authorization token so
                    // previously failed requests(aka with status == 401) will be resent with the
                    // authorization token placed in the header
                    Account.get(function (resultData) {
                    if (resultData.result != 1) {
                        return; // 获取用户信息失败
                    }
                    var userData = JSON.parse(resultData.msg);
                    $rootScope.loadAccount.resolve(true);
                    currentUser = userData;
                    currentUser.authorities = ['CUSTOMER'];
                    $rootScope.account = currentUser;
                    authService.loginConfirmed(currentUser, function (config) { // Step 2 & 3
                        return config;
                    });
                    if (successCallback) {
                        successCallback();
                    }
                }, function(errData) { // 现在获取用户数据出错，假设可以获取
                    $rootScope.loadAccount.resolve(true);
                    currentUser = {
                        userId: userId,
                        account: user.account,
                        password: user.psw,
                        authorities: ['CUSTOMER']
                    };
                    $rootScope.account = currentUser;
                    authService.loginConfirmed(currentUser, function (config) { // Step 2 & 3
                        return config;
                    });

                });

                }
            })
            .error(function (data, status, headers, config) {
                $rootScope.loadAccount.reject('登录失败:' + data);
                $rootScope.$broadcast('event:auth-login-failed', status);
                currentUser = null;
                $rootScope.account = null;
                if (errorCallback) {
                    errorCallback();
                }
            });
        },
        // this is used after activation, update user data in account.
        setLoginData: function(loginData) {
            $rootScope.loadAccount.resolve(true);
            currentUser = loginData.user;
            $rootScope.weixinOpenId = loginData.user.openId;
            $rootScope.account = currentUser;
            var xAuthTokenHeaderName = 'x-auth-token';
            // weixin login token contain token and expires fields.
            var tokenObj = loginData.token;
            $http.defaults.headers.common[xAuthTokenHeaderName] = tokenObj.token;
            localStorageService.set('authorizationToken', tokenObj.token);
            // $cookieStore.put('authorizationToken', tokenObj.token);

            authService.loginConfirmed(loginData.user, function (config) {
                return config;
            });
        },
        logout: function (user) {
            currentUser = null;
            $rootScope.account = null;
            localStorageService.remove('auth.account');
            localStorageService.remove('auth.password');

            $rootScope.$broadcast('event:auth-logout-complete');
        },
        loginCancelled: function () {
            authService.loginCancelled();
        },
        isLoggedIn: function () {
            return currentUser && currentUser.authorities && currentUser.account;
        },
        authorize: function (authorizedRoles) {
            if (!this.isLoggedIn()) {
                return false;
            }
            if (!angular.isArray(authorizedRoles)) {
                if (authorizedRoles == '*') {
                    return true;
                }
                authorizedRoles = [authorizedRoles];
            }

            var isAuthorized = false;
            angular.forEach(authorizedRoles, function (authorizedRole) {
                var authorized = (!!currentUser.account &&
                    currentUser.authorities.indexOf(authorizedRole) !== -1);

                if (authorized || authorizedRole == '*') {
                    isAuthorized = true;
                }
            });

            return isAuthorized;
        },
        getUser: function () {
            return currentUser;
        }
    };
    return service;
});
