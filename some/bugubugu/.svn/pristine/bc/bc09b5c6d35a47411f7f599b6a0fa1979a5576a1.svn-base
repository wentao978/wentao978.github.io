var module = angular.module('bugu.controllers', []);

module.controller('AppCtrl', function ($scope,$state, $rootScope, $log, $q, Auth, ENV,
  $ionicLoading, $ionicHistory, localStorageService, $ionicModal,
  $timeout, $ionicPopup,$ionicSideMenuDelegate, DebugLog, JSSdkTicket) {

  $log.log('init AppCtrl');

  $rootScope.logout = function () {
    $ionicPopup.show({
      title: '确定退出账号吗？',
      buttons: [{
        text: '<b>取消</b>',
        type: 'button-stable'
      }, {
        text: '<b>确定</b>',
        type: 'button-assertive',
        onTap: function () {
          Auth.logout();
          $ionicHistory.clearCache().then(function () {
            $rootScope.hideTabs=false;
            $state.go('tab.piao');
          });

          if ($ionicSideMenuDelegate.isOpenRight()) {
            $ionicSideMenuDelegate.toggleRight();
          }
          $rootScope.loadAccount = $q.defer();
          $rootScope.loadAccount.reject('已退出');
        }
      }]
    });
  };
  $rootScope.goback = function () {
    var preView = $ionicHistory.backView();
    if (preView) {
      $ionicHistory.goBack();
    }
     else {
      $rootScope.$state.go('tab.piao');
    }
  };
  $rootScope.gobackTwice = function () {
    $ionicHistory.goBack(-2);
  };
  
  $rootScope.clearCacheAndHistoryAndGo = function (newState, params) {
    $ionicHistory.clearCache().then(function () {
      $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true
      });
      $rootScope.$state.go(newState, params);
    });
  };

  $scope.$on('$ionicView.afterEnter', function () {
    $rootScope.closeSplash();
  });

})