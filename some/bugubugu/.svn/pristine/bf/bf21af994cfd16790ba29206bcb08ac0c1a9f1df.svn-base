
var module = angular.module('bugu');


module.config(function($stateProvider) {

  $stateProvider
  .state('tab.account', {
    url: '/account',
    data: {roles: ['CUSTOMER']},
    views: {
      'tab-account': {
        templateUrl: 'app/account/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.account.edit', {
    url: '/edit',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/temp.userInfo.html',
        controller: 'AccountUserInfoCtrl'
      }
    }
  })

  // 提醒页面路由
  .state('tab.account.remind', {
    url: '/remind',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/remind.html',
        controller: 'RemindCtrl'
      }
    }
  })
  // 关注被关注页面路由
  .state('tab.account.attention', {
    url: '/attention',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/tab-account-attention.html',
        controller: 'AttenTionCtrl'
      }
    }
  })
  // 我的求书推荐页面路由
  .state('tab.account.qiutuishu', {
    url: '/qiutuishu',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/tab-account-qiutuishu.html',
        controller: 'QiuTuiShuCtrl'
      }
    }
  })
  // 我的图书页面路由
  .state('tab.account.book', {
    url: '/book',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/tab-account-book.html',
        controller: 'BookCtrl'
      }
    }
  })
  // 我的积分页面路由
  .state('tab.account.jifen', {
    url: '/jifen',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/tab-account-jifen.html',
        controller: 'JiFenCtrl'
      }
    }
  })
  // 我的收藏页面路由
  .state('tab.account.shoucang', {
    url: '/shoucang',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/tab-account-shoucang.html',
        controller: 'ShouCangCtrl'
      }
    }
  })
  // 设置页面路由
  .state('tab.account.shezhi', {
    url: '/shezhi',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/tab-account-shezhi.html',
        controller: 'SheZhiCtrl'
      }
    }
  })
  // 记录页面路由
  .state('tab.account.jilu', {
    url: '/jilu',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/tab-account-jilu.html',
        controller: 'JiLuCtrl'
      }
    }
  })

  // 个人主页面路由
  .state('tab.account.personal', {
    url: '/personal',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/tab-account-personal.html',
        controller: 'PerSonalCtrl'
      }
    }
  })
  // 我的图书二级借阅页面路由
  .state('tab.account.jieyue', {
    url: '/jieyue',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/tab-account-jieyue.html',
        controller: 'JieYueCtrl'
      }
    }
  })
  // 我的图书二级待投漂页面路由
  .state('tab.account.daitoupiao', {
    url: '/daitoupiao',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/tab-account-daitoupiao.html',
        controller: 'DaiTouPiaoCtrl'
      }
    }
  })
  // 我的图书二级已投漂页面路由
  .state('tab.account.yitoupiao', {
    url: '/yitoupiao',
    views: {
      'tab-account@tab': {
        templateUrl: 'app/account/tab-account-yitoupiao.html',
        controller: 'YiTouPiaoCtrl'
      }
    }
  })
});
