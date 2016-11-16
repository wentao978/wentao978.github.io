var module = angular.module('bugu');

module.config(function($stateProvider) {

  $stateProvider
  .state('tab.piao', {
    url: '/piao',
    views: {
      'tab-piao': {
        templateUrl: 'app/piao/tab-piao.html',
        controller: 'PiaoCtrl'
      }
    }
  })
  .state('tab.toupiao', {
    url: '/toupiao',
    views: {
      'tab-piao': {
        templateUrl: 'app/piao/toupiao.html',
        controller: 'ToupiaoCtrl'
      }
    }
  })
  .state('tab.piao.detail', {
      url: '/piaoId/:id',
      // url: '/piaoId/:isbn/:userbookid',
      views: {
        'tab-piao@tab': {
          templateUrl: 'app/piao/piao-detail.html',
          controller: 'PiaoDetailCtrl'
        }
      }
    })
  .state('tab.setzhandian', {
      url: '/setzhandian',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/setzhandian.html',
          controller: 'SetZhanDianCtrl'
        }
      }
    })
  .state('tab.order', {
      url: '/order',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/order.html',
          controller: 'OrDerCtrl'
        }
      }
    })
  .state('tab.jiezhandian', {
      url: '/jiezhandian',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/jiezhandian.html',
          controller: 'JieZhanDianCtrl'
        }
      }
    })
  // 扫描页面路由
  .state('tab.saomiao', {
      url: '/saomiao',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/saomiao.html',
          controller: 'SaoMiaoCtrl'
        }
      }
    })

  // 帮投漂路由
  .state('tab.bangtou', {
      url: '/bangtou',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/bangtou.html',
          controller: 'BangTouCtrl'
        }
      }
    })

   // 帮助路由
  .state('tab.help', {
      url: '/help',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/help.html',
          controller: 'HelpCtrl'
        }
      }
    })
    // 搜索路由
  .state('tab.search', {
      url: '/search/:id',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/search.html',
          controller: 'PiaoSearchCtrl'
        }
      }
    })
   // 借书路由
  .state('tab.jieshu', {
      url: '/jieshu/:isbn',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/jieshu.html',
          controller: 'JieShuCtrl'
        }
      }
    })
  // 充值路由
  .state('tab.chongzhi', {
      url: '/chongzhi',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/chongzhi.html',
          controller: 'ChongZhiCtrl'
        }
      }
    })
  // 站点列表页面路由
  .state('tab.liebiao', {
      url: '/liebiao',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/liebiao.html',
          controller: 'LieBiaoCtrl'
        }
      }
    })
  // 站点主页页面路由
  .state('tab.zhandianzhuye', {
      url: '/zhandianzhuye',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/zhandianzhuye.html',
          controller: 'ZhanDianZhuYeCtrl'
        }
      }
    })
  // 全部推荐页面路由
  .state('tab.alltuijian', {
      url: '/alltuijian',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/alltuijian.html',
          controller: 'AllTuiJianCtrl'
        }
      }
    })
  // 全部书评页面路由
  .state('tab.allshuping', {
      url: '/allshuping',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/allshuping.html',
          controller: 'AllShuPingCtrl'
        }
      }
    })
   // 添加描述页面路由
  .state('tab.addmiaoshu', {
      url: '/addmiaoshu',
      views: {
        'tab-piao': {
          templateUrl: 'app/piao/addmiaoshu.html',
          controller: 'AddMiaoShuCtrl'
        }
      }
    })
  //详情页用户信息
  .state('tab.personal', {
      url: '/personal',
      views: {
        'tab-piao': {
          templateUrl: 'app/account/tab-account-personal.html',
          controller: 'PiaoPerSonalCtrl'
        }
      }
  })
});