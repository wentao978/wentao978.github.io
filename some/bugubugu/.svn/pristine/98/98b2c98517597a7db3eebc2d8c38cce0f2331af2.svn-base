// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('bugu', ['ionic', 'ngCordova', 'bugu.controllers', 'bugu.services', 'bugu.directives', 'bugu.filters', 'LocalStorageModule', 'ngCacheBuster',
  'ngResource', 'Alertify', 'angularMoment', 'ngSanitize', 'ngAnimate','Common', 'Common.utils', 'Common.Auth'])

.run(function($rootScope, $ionicPlatform, $ionicLoading, $ionicModal, $ionicHistory, $ionicTabsDelegate, $q, $log, $state,
    localStorageService, Auth, amMoment, Alertify, ENV, DebugLog, $templateCache) {

  $rootScope.$state = $state;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  amMoment.changeLocale('zh-cn');
  $rootScope.loadAccount = $q.defer();
  $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromParams) {
      var tabsCache = $templateCache.get('app/tabs.html');
      if (('data' in toState) && ('roles' in toState.data)) {
          if (!Auth.isLoggedIn()) {
              $log.log('Not log in');

              $rootScope.redirectName = toState;
              $rootScope.redirectParam = toStateParams;
              event.preventDefault();

              $rootScope.loadAccount.promise.then(function () {
                  $log.log('Signed in.');
                // has role based access defined, need to authorize.
                  if (!Auth.authorize(toState.data.roles)) {
                      $rootScope.showMessage("您没有权限访问该信息...");
                      $state.go('accessdenied');
                  }
              }, function (msg) {
                  $rootScope.closeSplash();
                  $rootScope.currentTabIndex = $ionicTabsDelegate.selectedIndex();
                  $rootScope.loginPopup();
                  return;
              });
          }
      }
  });

  // Call when the the client is confirmed
  $rootScope.$on('event:auth-loginConfirmed', function (config, userData) {
      $rootScope.authenticated = true;
      $rootScope.loginClose();

      $rootScope.showMessage('登录成功', 1000);
      var redirectState = $rootScope.redirectName;
      var redirectParam = $rootScope.redirectParam;
      if (redirectState && $state.get(redirectState)) {
          $state.go(redirectState, redirectParam);
      }
      // 如果没有redirectState，就关闭modal，继续打开当前页面
  });

// Call when the 401 response is returned by the server
  $rootScope.$on('event:auth-loginRequired', function (rejection) {
      DebugLog.log('访问的路径需要登录');
      $rootScope.loginPopup();
  });

// Call when the token expired
  $rootScope.$on('event:auth-login-expired', function (rejection) {
      // 不提示，让用户重新登录
      DebugLog.log('token超时，请重新登录');
  });

// Call when the 403 response is returned by the server
  $rootScope.$on('event:auth-notAuthorized', function (rejection) {
      $rootScope.showMessage("您没有权限访问该信息...", 1000);
      $state.go('accessdenied');
  });

// Call when the user cancels login
  $rootScope.$on('event:auth-loginCancelled', function () {
    // we use popup login, if login canceled, the modal will be closed, no need to do anything.
      if (!$state.current.name) { // 如果直接刷新页面或打开页面到一个需要登录的页面，关了登陆以后需要转到主页
          $state.go('home');
      }
      if ($rootScope.currentTabIndex) {
        $ionicTabsDelegate.select($rootScope.currentTabIndex);
      }
  });
  $rootScope.$on('event:auth-login-failed', function () {
      // $rootScope.showMessage("登录失败...", 1000);
      DebugLog.log('登录失败...');
  });

  $rootScope.closeSplash = function () {
      $log.log('close splash.');
      var elem = document.getElementById('splash-overlay');
      if (elem) {
          elem.parentNode.removeChild(elem);
      }
      $rootScope.appLoading = false;
  };
  $rootScope.showMessage = function (message, mstime , callback) {
      if (!mstime) {
          mstime = 15000;
      }
      if (message) {
          $ionicLoading.show({
              template: message,
              duration: mstime
          });
      } else {
          $ionicLoading.show({duration: mstime});
      }
      if(callback){
        setTimeout(callback,mstime);
      }
  };
  $rootScope.hideMessage = function () {
      $ionicLoading.hide();
  };
  $rootScope.title = '未登录';
  $rootScope.state = 'NEED';
  $rootScope.loginPopup = function () {
      if ($rootScope.signModal && $rootScope.signModal.isShown()) {
          return;
      }
      $ionicModal.fromTemplateUrl('app/account/temp.signin.html', {
          animation: 'slide-in-up'
      }).then(function (modal) {
          $rootScope.signModal = modal;
          $rootScope.signModal.show();
      });
  };
  $rootScope.loginClose = function () {
      if ($rootScope.signModal) {
          $rootScope.signModal.hide();
          $rootScope.signModal.remove(); // just clean up, it will got every open the modal.
      }
  };
  $rootScope.pwForgetPopup = function () {
      if ($rootScope.forgetModal && $rootScope.forgetModal.isShown()) {
          return;
      }
      $ionicModal.fromTemplateUrl('app/account/temp.forget-ps.html', {
          animation: 'slide-in-up'
      }).then(function (modal) {
          $rootScope.forgetModal = modal;
          $rootScope.forgetModal.show();
      });
  };

  $rootScope.pwForgetClose = function () {
      if ($rootScope.forgetModal) {
          $rootScope.title = '登录';
          $rootScope.state = 'SIGNIN';
          $rootScope.loginPopup();
          setTimeout(function(){
            $rootScope.forgetModal.hide();
            $rootScope.forgetModal.remove();
          },500);
          
      }
  };

  if (ENV === 'dev') {
      DebugLog.bind(function (msg) {
          return Alertify.success(msg);
      });
  } else {
      DebugLog.bind(function (msg) {
          return $log.log(msg);
      });
  }

  Auth.checkLogin();

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider, $httpProvider,
    httpRequestInterceptorCacheBusterProvider, ENV) {

  httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/, /.*protected.*/], true);

  $ionicConfigProvider.backButton.text('');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.scrolling.jsScrolling(true);
  // disable debug mode (no classes like ng-scope) for production app (aprox. 10% faster)
  // can reload application again in debug mode: angular.reloadWithDebugInfo();
  if(ENV === 'prod') {
    $compileProvider.debugInfoEnabled(false);
  } else {
    $compileProvider.debugInfoEnabled(true);
  }
  $httpProvider.interceptors.push('authInterceptor');
  $httpProvider.interceptors.unshift('httpErrorHandler');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('home', {
    url: '/home',
    abstract: true
  })
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    controller: 'AppCtrl',
    templateUrl: 'app/tabs.html'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/piao');
  // $urlRouterProvider.when('/home', '/tab/piao');

});
var module = angular.module('bugu.directives', []);
module.directive('hideTabs', function ($rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function () {
                scope.$watch(attributes.hideTabs, function () {
                    $rootScope.hideTabs = true;

                });
            });

            scope.$on('$ionicView.beforeLeave', function () {
                $rootScope.hideTabs = false;
            });
        }
    };
});

var module = angular.module('bugu.filters', []);
var months = {Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"}
module.filter('dateTo', function () {
  return function(date){
  var date = date.split(" ");
  var month = months[date[0]];
  var day = date[1].split(",")[0];
  var year = date[2];
  var times = date[3];
  var type = date[4];
  times = times.split(":");
  var hour = times[0];
  var minute = times[1];
  
  if(parseInt(day)<10){
    day = "0"+day;
  }
  if(parseInt(hour)<10){
    hour = "0"+hour;
  }
  if(parseInt(minute)<10){
    hour = "0"+minute;
  }
  if(type == "PM"&&hour!="12"){
      hour = parseInt(hour)+12+"";
  }
    date = year+"-"+month+"-"+day+" "+hour+":"+minute;
    return date;
  }
  
});
module.filter('jieyuetime', function () {
  return function(date){
    var stoptime = new Date(date);
    var nowtime = new Date();
    var shengyu = stoptime - nowtime;
    shengyu = shengyu/1000/60/60/24;
    if(shengyu>0){
        if(shengyu>1){
          shengyu = "剩"+Math.ceil(shengyu)+"天";
        }else{
          shengyu = "剩"+Math.floor(shengyu*24)+"小时"+Math.floor(shengyu*24*60%60)+"分钟";
        }
    }else{
      shengyu = -shengyu;
      if(shengyu>1){
          shengyu = "超时"+Math.ceil(shengyu)+"天";
        }else{
          shengyu = "超时"+Math.floor(shengyu*24)+"小时"+Math.floor(shengyu*24*60%60)+"分钟";
        }
    }
    return shengyu;
  }
  
}); 
var colors=['randomcolor_1','randomcolor_2','randomcolor_3','randomcolor_4','randomcolor_5','randomcolor_6','randomcolor_7','randomcolor_8']
module.filter('randomColor', function () {
  return function(){
    var color=colors[Math.floor(Math.random()*8)];
    return color;
  }
}); 
