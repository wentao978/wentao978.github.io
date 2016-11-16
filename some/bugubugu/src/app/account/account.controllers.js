var module = angular.module('bugu.controllers');

module.controller('AccountCtrl', function($scope, $cordovaBarcodeScanner, $cordovaCamera) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.data = {};

  $scope.scanBarCode = function($event) {

    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
        $scope.data.barCodeResult = '扫描完成:' + JSON.stringify(barcodeData);
      }, function(error) {
        // An error occurred
        $scope.data.barCodeResult = '出错啦:' + error;
      });
  };
  if (typeof Camera == 'undefined') {
    Camera = {
      DestinationType: {},
      PictureSourceType: {},
      EncodingType: {}
    }
  }
  if (typeof CameraPopoverOptions == 'undefined') {
    CameraPopoverOptions = {};
  }
  var options = {
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    allowEdit: true,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 100,
    targetHeight: 100,
    popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false,
    correctOrientation:true
  };
  $scope.takePicture = function() {
    options.sourceType = Camera.PictureSourceType.CAMERA; // 用相机拍照获取拍摄的图片
    $cordovaCamera.getPicture(options).then(function(imageURI) {
      $scope.data.camareResult = imageURI;
    }, function(err) {
      // error
      $scope.data.camareResultError = err;
    });
  };
  $scope.getPicture = function() {
    options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY; // 从图库中获取图片
    $cordovaCamera.getPicture(options).then(function(imageURI) {
      $scope.data.pictureResult = imageURI;
    }, function(err) {
      // error
      $scope.data.pictureResultError = err;
    });
  };
});

module.controller('AccountUserInfoCtrl', function($scope, $rootScope) {
  $scope.userInfo = angular.copy($rootScope.account);
})

// 提醒控制器
module.controller('RemindCtrl', function($scope, $rootScope) {

})
// 我的图书控制器
module.controller('BookCtrl', function($scope, $rootScope) {
  $scope.book = "超时一本未还";
})
// 我的积分页面控制器
module.controller('JiFenCtrl', function($scope, $rootScope) {

})
// 我的收藏页面控制器
module.controller('ShouCangCtrl', function($scope, $rootScope) {
   $scope.flag = false;
   $scope.showButton = function($event) {
    $event.stopPropagation();
    if($scope.flag != true){
      $scope.flag = true;
    }else{
      $scope.flag = false;
    }
  $scope.show_Button = function($event) {
     $event.stopPropagation();
     $scope.flag = false;
    }
  }
  $scope.Lei_bie = function($event) {
    $event.stopPropagation();
  }
});
// 我的设置页面控制器
module.controller('SheZhiCtrl', function($scope, $rootScope) {

})
// 我的记录页面控制器
module.controller('JiLuCtrl', function($scope, $rootScope) {

})

// 我的图书二级借阅页面控制器
module.controller('JieYueCtrl', function($scope, $rootScope,FindFyMyBorrowService) {
    $scope.load=true;
    $scope.data={rows:[]};
    var page=0;
    var rows=10;

    // 推荐数据获取
    /*拿数据*/
    $scope.getjieBook=function(page,rows){
      FindFyMyBorrowService.get({},{page:page,rows:rows},function(data) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if(page==1){
          $scope.data=data;
        }else{
          for(var i=0;i<data.rows.length;i++){
            $scope.data.rows.push(data.rows[i])
          } 
        }
        if(data.total<=rows){
          $scope.load=false;
        }
        if(data.total == 0){
          $scope.msg = "暂无数据";
        }
      });
    }
    /*拿数据--end*/

    /*下拉刷新，上拉加载*/
    $scope.DoJieRefresh = function() {
      page=1;
      $scope.load=true;
      $scope.getjieBook(page,rows);
      
    };
    
    $scope.JieLoadMore = function() {
      if($scope.data.total==$scope.data.rows.length){
        $scope.load=false;
      }else{
        $scope.getjieBook(++page,rows);
      }
    };

})
// 我的图书二级待投漂页面控制器
module.controller('DaiTouPiaoCtrl', function($scope, $rootScope) {

})

// 我的图书二级已投漂页面控制器
module.controller('YiTouPiaoCtrl', function($scope, $rootScope,FindFyMyBookSomeService,DelBookSomeService) {
    $scope.load=true;
    $scope.data={rows:[]};
    var page=0;
    var rows=10;
    // 推荐数据获取
    /*拿数据*/
    $scope.gettouBook=function(page,rows){
      FindFyMyBookSomeService.get({},{page:page,rows:rows},function(data) {
        console.log(data)
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if(page==1){
          $scope.data=data;
        }else{
          for(var i=0;i<data.rows.length;i++){
            $scope.data.rows.push(data.rows[i])
          } 
        }
        if(data.total<=rows){
          $scope.load=false;
        }
        if(data.total == 0){
          $scope.msg = "暂无数据";
        }
      });
      // 删除求书
        $scope.onItemDelete = function($index) {
          var id = $scope.data.rows[$index].id;
          DelBookSomeService.get({},{id:id},function(data) {
          $rootScope.showMessage(data.msg, 1000, function(){
          if(data.msg !== "无权删除"){
            $scope.data.rows.splice($index, 1);
            $rootScope.doRefresh();
            }
          });
        });  
      };
    }
    /*拿数据--end*/

    /*下拉刷新，上拉加载*/
    $scope.DoTouRefresh = function() {
      page=1;
      $scope.load=true;
      $scope.gettouBook(page,rows);
    };
    
    $scope.TouLoadMore = function() {
      if($scope.data.total==$scope.data.rows.length){
        $scope.load=false;
      }else{
        $scope.gettouBook(++page,rows);
      }
    };
})

// 我的个人主页面控制器
module.controller('PerSonalCtrl', function($scope, $rootScope) {
   //个人主页地图
  var map=new BMap.Map('map');
  var dingwei=new BMap.Geolocation();
  dingwei.getCurrentPosition(function(r){
    if(this.getStatus()==BMAP_STATUS_SUCCESS){
       var mark=new BMap.Marker(r.point);
       map.addOverlay(mark);
       map.panTo(r.point);
  map.addControl(new BMap.NavigationControl());
  map.addControl(new BMap.GeolocationControl());
  map.addControl(new BMap.MapTypeControl());
      map.centerAndZoom(r.point,15);
    }else{
      alert('failed'+this.getStatus())
    }
  })
})

// 关注被关注页面控制器
module.controller('AttenTionCtrl', function($scope, $rootScope) {
// 头部转换
  $scope.isError=false;
  $scope.isWarning=true;
  $scope.gotoPage1 = function() {
      $scope.isError = false;
      $scope.isWarning = true;
      beiguanzhu.style.display="block";
      guanzhu.style.display="none";
    }

  $scope.gotoPage2 = function() {
      $scope.isError = true;
      $scope.isWarning = false;
      beiguanzhu.style.display="none";
      guanzhu.style.display="block";

  }

   // /*下拉刷新，上拉加载*/
   //  $scope.DoRefresh = function() {
   //    page=1;
   //    $scope.load=true;
   //    $scope.getBook(page,rows);
   //    $scope.$broadcast('scroll.refreshComplete');
   //  };
    
   //  $scope.LoadMore = function() {
   //    $scope.getBook(++page,rows);
   //    if($scope.data.total==$scope.data.rows.length){
   //      $scope.load=false;
   //    }
   //    $scope.$broadcast('scroll.infiniteScrollComplete');
      
   //  };

    // 删除被关注--接口？
    $scope.onItemDelete = function(x) {
      $scope.data.rows.splice($scope.data.rows.indexOf(x), 1);
    };
    // 删除关注--接口？
    $scope.ItemDelete = function(y) {
      $scope.Odata.rows.splice($scope.Odata.rows.indexOf(y), 1);
    };
})

// 我的求书推荐控制器
module.controller('QiuTuiShuCtrl',function($parse,$scope, $rootScope,FindFyMyWantService,FindFyMyRecommendService,DelWantService,DelRecommendService) {
  // 头部转换
  $scope.isError=false;
  $scope.isWarning=true;
  $scope.gotoPage1 = function() {
        $scope.isError = false;
        $scope.isWarning = true;
        qiushu.style.display="block";
        tuijian.style.display="none";
    }

  $scope.gotoPage2 = function() {
      $scope.isError = true;
      $scope.isWarning = false;
      qiushu.style.display="none";
      tuijian.style.display="block";
      $scope.tuiload=true;
    }
    
    $scope.load=true;
    $scope.data={rows:[]};
    var page=0;
    var rows=10;
    // 求书数据获取
    /*拿数据*/
    $scope.getqiuBook=function(page,rows){
      FindFyMyWantService.get({},{page:page,rows:rows},function(data) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if(page==1){
          $scope.data=data;
        }else{
          for(var i=0;i<data.rows.length;i++){
            $scope.data.rows.push(data.rows[i])
          } 
        }
        if(data.total<=rows){
          $scope.load=false;
        }
        if(data.total == 0){
          $scope.msg = "暂无数据";
        }  
      });
      // 删除求书
        $scope.onItemDelete = function($index) {
          var id = $scope.data.rows[$index].id;
          DelWantService.get({},{id:id},function(data) {
          $rootScope.showMessage(data.msg, 1000, function(){
          if(data.msg !== "无权删除"){
            $scope.data.rows.splice($index, 1);
            $rootScope.qiuDoRefresh();
            }
          });
        });  
      };
    }
    /*拿数据--end*/

    /*下拉刷新，上拉加载*/
    $scope.DoQiuRefresh = function() {
      page=1;
      $scope.load=true;
      $scope.getqiuBook(page,rows);
    };
    
    $scope.QiuLoadMore = function() {
      if($scope.data.total==$scope.data.rows.length){
        $scope.load=false;
      }else{
        $scope.getqiuBook(++page,rows);
      }
    };


    
    $scope.Odata={rows:[]};
    var tuipage=0;
    var tuirows=10;
     /*拿数据*/
    $scope.gettuiBook=function(tuipage,tuirows){
      FindFyMyRecommendService.get({},{page:tuipage,rows:tuirows},function(Odata) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if(tuipage==1){
          $scope.Odata=Odata;
        }else{
          for(var i=0;i<Odata.rows.length;i++){
            $scope.Odata.rows.push(Odata.rows[i])
          } 
        }
        if(Odata.total<=rows){
          $scope.tuiload=false;

        }
        if(Odata.total == 0){
          $scope.Tuimsg = "暂无数据";
        }
      });
      // 删除推荐书
      $scope.ItemDelete = function($index) {
        var id = $scope.Odata.rows[$index].id;
        DelRecommendService.get({},{id:id},function(Odata) {
          $rootScope.showMessage(Odata.msg, 1000, function(){
            if(Odata.msg !== "无权删除"){
              $scope.Odata.rows.splice($index, 1);
              $rootScope.tuiDoRefresh();
            } 
          });
        });  
      };
    }
    /*拿数据--end*/
      /*下拉刷新，上拉加载*/
    $scope.DoTuiRefresh = function() {
      tuipage=1;
      $scope.tuiload=true;
      $scope.gettuiBook(tuipage,tuirows);
    };
    
    $scope.TuiLoadMore = function() {
      if($scope.Odata.total==$scope.Odata.rows.length){
         $scope.tuiload=false;
      }else{
         $scope.gettuiBook(++tuipage,tuirows);
      }
    };
})