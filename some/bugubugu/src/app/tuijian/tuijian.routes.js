var service = angular.module('bugu.services');


module.config(function($stateProvider) {

  $stateProvider
  .state('tab.tuijian', {
      url: '/tuijian',
      views: {
        'tab-tuijian': {
          templateUrl: 'app/tuijian/tab-tuijian.html',
          controller: 'TuijianCtrl'
        },
        'Page1@tab.tuijian': {
          templateUrl: 'app/tuijian/qiuhaoshuView.html',
          controller: 'AddTuiBookCtrl'
        }
      }
    })
  .state('tab.qiuhaoshuView', {
      url: '/tuijianQiuHaoShuView',
      views: {
        'Page1@tab.tuijian': {
          templateUrl: 'app/tuijian/qiuhaoshuView.html',
          controller: 'QiuHaoShuCtrl'
        }
      }
    })
  .state('tab.jianhaoshuView', {
      url: '/tuijianJianHaoShuView',
      views: {
        'Page2@tab.tuijian': {
          templateUrl: 'app/tuijian/jianhaoshuView.html',
          controller: 'JianHaoShuCtrl'
        }
      }
    })
  .state('tab.addbook', {
      url: '/tuijianaddbook',
      views: {
        'tab-tuijian': {
          templateUrl: 'app/tuijian/addbook.html',
          controller: 'AddBookCtrl'
        }
      }
    })
    .state('tab.tuijian.detail', {
      url: '/tuijiandetail',
      views: {
        'tab-tuijian@tab': {
          templateUrl: 'app/tuijian/tuijian-detail.html',
          controller: 'TuijianDetailCtrl'
        }
      }
    })
    .state('tab.tuijian.allrequest', {
      url: '/tuijianAllRequest',
      views: {
        'tab-tuijian@tab': {
          templateUrl: 'app/tuijian/allrequest.html',
          controller: 'TuijianAllRequestCtrl'
        }
      }
    })
    .state('tab.tuijian.allrecommend', {
      url: '/tuijianAllRequest',
      views: {
        'tab-tuijian@tab': {
          templateUrl: 'app/tuijian/allrecommend.html',
          controller: 'TuijianAllRecommendCtrl'
        }
      }
    })
    .state('tab.tuijian.peosonal', {
      url: '/tuijianpersonal',
      views: {
        'tab-tuijian@tab': {
          templateUrl: 'app/tuijian/tab-account-personal.html',
          controller: 'PersonalHomePageCtrl'
        }
      }
    })
    .state('tab.tuijian.jianhaoshudetail', {
      url: '/tuijianjianhaoshudetail/:bookid',
      views: {
        'tab-tuijian@tab': {
          templateUrl: 'app/tuijian/jianhaoshu-detail.html',
          controller: 'JianHaoShuDetailCtrl'
        }
      }
    })
    .state('tab.tuijian.addtuijian', {
      url: '/tuijianaddtuijian',
      views: {
        'tab-tuijian@tab': {
          templateUrl: 'app/tuijian/addtuijian.html',
          controller: 'AddTuiJianCtrl'
        }
      }
    })

    // 添加标签页面
    .state('tab.tuijian.addbiaoqian', {
      url: '/tuijianaddbiaoqian',
      views: {
        'tab-tuijian@tab': {
          templateUrl: 'app/tuijian/addbiaoqian.html',
          controller: 'AddBiaoQianCtrl'
        }
      }
    })

    // 搜索页面
    .state('tab.tuijian.search', {
      url: '/tuijiansearch/:id',
      views: {
        'tab-tuijian@tab': {
          templateUrl: 'app/piao/search.html',
          controller: 'TuijianSearchCtrl'
        }
      }
    })
});
