var module = angular.module('bugu');

module.config(function($stateProvider) {

  $stateProvider
  .state('tab.gongdu', {
      url: '/gongdu',
      views: {
        'tab-gongdu': {
          templateUrl: 'app/gongdu/tab-gongdu.html',
          controller: 'GongduCtrl'
        }
      }
    });
});