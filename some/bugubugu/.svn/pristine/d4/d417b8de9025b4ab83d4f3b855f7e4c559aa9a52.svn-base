var module = angular.module('bugu.controllers');

module.controller('PiaoCtrl', function($rootScope,$state,$scope,$cordovaBarcodeScanner,ScanFyBook,FindFyBookSomeService ,FindFyBookService ,$cordovaGeolocation, $ionicLoading) {
    // $state.go('tab.piaotushuView');
    $rootScope.isError=true;
    $scope.isWarning=false;
     // 站点 投票按钮切换
    $scope.flag = true;
    $scope.isflag = true;
    var transform = null;
    $scope.gotoToupiao = function() {
        $state.go('tab.toupiao');
    }
    $scope.gotoZhandian = function() {
        $state.go('tab.setzhandian');

    }
    $scope.gotoOrder = function($event) {
      $event.stopPropagation();
      $state.go('tab.order');
    }
    $scope.scan = function(){
       $cordovaBarcodeScanner.scan().then(function(imageData) { 
      if(imageData.cancelled==false){
        if(imageData.text!=""){
          ScanFyBook.get({},{isbn:imageData.text,page:1,rows:10},function(data){
            if(data.total==1){
              $rootScope.jieShuBooks=data;
              $state.go('tab.jieshu',{isbn:imageData.text});
            }else{
              $rootScope.showMessage("漂流广场无此书", 1000);
            }
          });
        }else{
          $rootScope.showMessage("请重新扫描书籍isbn条形码", 1000);
        }
      }else{
          return;
      }
      }, function(error) { 
        $rootScope.showMessage("出错,请重新扫描" + error, 1000);
      })
    }
    // 一级分类tab切换
    $scope.directory=[{name:'文学'}, {name:'史学'}, {name:'医学'}, {name:'自然科学'}, {name:'其它'}];
    $scope.selectRestaurant=function(row) {$scope.selectedRow=row;};
    // 二级分类tab切换
    $scope.directory2=[{name:'小说'}, {name:'自传'}, {name:'散文'}, {name:'诗歌'}, {name:'其它'}];
    $scope.selectRestaurant2=function(row2) {$scope.selectedRow2=row2;};
    $scope.gotoPage1 = function() {
        $scope.title = "图书";
        $rootScope.isError =true;
        $scope.isWarning = false;
        $scope.isflag = true;
        $scope.flag = true;
        tushu.style.display="block";
        zhandian.style.display="none";
    }

    var pi = 0;
    $scope.gotoPage2 = function() {
        $scope.title = "站点";
        $rootScope.isError = false;
        $scope.isWarning = true;
        $scope.flag = false;
        $scope.isflag = false;
        tushu.style.display="none";
        zhandian.style.display="block";
        if(pi == 0){

    //         ionic.Platform.ready(function () {
    //     $ionicLoading.show({
    //         template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    //     });

    //     var posOptions = {
    //         enableHighAccuracy: true,
    //         timeout: 20000,
    //         maximumAge: 0
    //     };
    //     $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
    //         var lat = position.coords.latitude;
    //         var long = position.coords.longitude;

    //         // var myLatlng = new google.maps.LatLng(lat, long);

    //         // var mapOptions = {
    //         //     center: myLatlng,
    //         //     zoom: 16,
    //         //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //         // };
    //         alert("lat:"+lat+",long:"+long);
    //         // $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //         $ionicLoading.hide();

    //     }, function (err) {
    //         $ionicLoading.hide();
    //         console.log(err);
    //     });
    // });

          // baidu_location.getCurrentPosition(successCallback, failedCallback);
          // var successCallback = function(data){
          //   allmap.innerHTML=data;
          //   alert(data);
          // }
          // var failedCallback = function(data){
          //   allmap.innerHTML=data;
          //   alert(data);
          // }
              // var map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('allmap', {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
        var str=['定位成功'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        str.push('精度：' + data.accuracy + ' 米');
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        alert(str)
        // document.getElementById('tip').innerHTML = str.join('<br>');
    }
    //解析定位错误信息
    function onError(data) {
        document.getElementById('tip').innerHTML = '定位失败';
    }
        // var map = new BMap.Map("allmap");
        // map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
        // var carMk = new BMap.Marker(pts[0],{icon:myIcon});
        // function resetMkPoint(i){
        //   carMk.setPosition(pts[i]);

            // var geolocation = new BMap.Geolocation();
            // geolocation.getCurrentPosition(function(r){
            // if(this.getStatus() == "BMAP_STATUS_SUCCESS"){
            //     alert(r.point.lng+","+r.point.lat);
            //     map.centerAndZoom(r.point, 20);
            //     var myCompOverlay = new ComplexCustomOverlay(r.point, "", 0);
            //     map.addOverlay(myCompOverlay);
            //     // map.panTo(r.point);
            //     // var bounds = map.getBounds();
            //     // var sw = bounds.getSouthWest();
            //     // var ne = bounds.getNorthEast();
            //     // var lngSpan = Math.abs(sw.lng - ne.lng);
            //     // var latSpan = Math.abs(ne.lat - sw.lat);
            //     // for(var i=1;i<6;i++){
            //     //     var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7)); 
            //     //     var txt = "漂流 | "+parseInt(Math.random() * 1000,10) + "本";
            //     //     var myCompOverlay = new ComplexCustomOverlay(point, txt, i);
            //     //     map.addOverlay(myCompOverlay);
            //     // }
            //     // alert('您的位置：'+r.point.lng+','+r.point.lat);
            // }
            // else {
            //     alert('failed'+this.getStatus());
            //     clearInterval(mapNowTimer);
            // }      
            // },{enableHighAccuracy: true}) 

        // $scope.map_search = function(){
        // }
        // $scope.map_chat = function(){
        // }
        // $scope.map_list = function(){
        //     }
        // $scope.map_location = function(){
        //   var tab_piao = document.getElementsByName("tab-piao")[0];
        //     if(zhandian.style.display=="block"&&tab_piao.getAttribute("nav-view")=="active"){
        //         geolocation.getCurrentPosition(function(r){
        //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //         var bounds = map.getBounds();
        //         var sw = bounds.getSouthWest();
        //         var ne = bounds.getNorthEast();
        //         var lngSpan = Math.abs(sw.lng - ne.lng);
        //         var latSpan = Math.abs(ne.lat - sw.lat);
        //         // if(r.point.lng>ne.lng&&r.point.lng<sw.lng&&r.point.lat<ne.lat&&r.point.lat>sw.lat){}
        //         console.log(sw.lng,ne.lng,ne.lat,sw.lat)
        //         map.panTo(r.point);
        //         var pixel = map.pointToOverlayPixel(r.point);
        //         var map_now = document.getElementsByClassName("map_now")[0];
        //         map_now.style.left = pixel.x -9 + "px";
        //         map_now.style.top  = pixel.y -20 + "px";
        //     }
        //     else {
        //         alert('failed'+this.getStatus());
        //         clearInterval(mapNowTimer);
        //     }  
        //   })
        //       }else{
        //         clearInterval(mapNowTimer);
        //       }
            
        //     }
        //   var mapNowTimer = setInterval($scope.map_location,1000);
        //     pi=1;
        }else{
          // mapNowTimer = setInterval($scope.map_location,1000);
        }
  }
    $scope.load=true;
    $scope.data={rows:[]};
    var page=0;
    var rows=10;
    var pos={lat:124,logt:53}
    /*拿数据*/
    $scope.getBook=function(page,rows,pos){
      FindFyBookSomeService.get({},{page:page,rows:rows, pos:pos},function(data) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if(page==1){
          $scope.data=data;
        }else{
          for(var i=0;i<data.rows.length;i++){
            $scope.data.rows.push(data.rows[i]);
          } 
        }
        if(data.total<=rows){
          $scope.load=false;
        }
      });
    }
    /*拿数据--end*/

    
    /*下拉刷新，上拉加载*/
    $rootScope.doRefresh = function() {
      page=1;
      $scope.load=true;
      $scope.getBook(page,rows,pos);
    };
    
    $scope.loadMore = function() {
      if($scope.data.total==$scope.data.rows.length){
        $scope.load=false;
      }else{
        $scope.getBook(++page,rows,pos);
      }
    };
    //搜索
    $scope.searchBook=function(name){
      FindFyBookService.get({},{name:name},function(data) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
          // $scope.data=data;
          console.log(data)
      });
    }



});
    /*下拉刷新，上拉加载--end*/

// 站点控制器
module.controller('PiaoZhandianCtrl',function($scope,$state) {
    
})
// 投漂控制器
module.controller('ToupiaoCtrl',function($scope,$state,$rootScope,$cordovaCamera,$cordovaFileTransfer,API_ENDPOINT,$cordovaBarcodeScanner,$ionicActionSheet,AddByScanBookSome,AddByScanBook,ScanFyBook) {
    $scope.tou=false;
    $rootScope.touPiaobooks=[{name:"",writer:"",isbn:"",qrdata:"",img:"",publish:"",publishtimestr:"",brief:"",remark:"",flag1:false,flag2:true}];
    // $scope.addBook=function(){
    //     for(var i=0;i<$rootScope.touPiaobooks.length;i++){
    //         if($rootScope.touPiaobooks[i].qrdata==""){
    //             return;
    //         }
    //     }
    //     $rootScope.touPiaobooks.push({name:"",writer:"",isbn:"",qrdata:"",img:"",publish:"",publishtimestr:"",brief:"",remark:"",flag1:false,flag2:true});
    // }
    // $scope.deleteBook=function($index){
    //     if($rootScope.touPiaobooks.length==1){
    //         return;
    //     }else{
    //         $rootScope.touPiaobooks.splice($index,1);
    //     }
    // }
    $scope.scanBarcode = function($index,str) {
      $cordovaBarcodeScanner.scan().then(function(imageData) { 
      if(imageData.cancelled==false){
        if(imageData.text!=""){
          if(str=="isbn"){
          ScanFyBook.get({},{isbn:imageData.text,page:1,rows:10},function(data){
            if(data.total==1){
              $rootScope.touPiaobooks[$index].name=data.rows[0].name;
              $rootScope.touPiaobooks[$index].isbn=data.rows[0].isbn;
              $rootScope.touPiaobooks[$index].writer=data.rows[0].writer||"未知";
              $rootScope.touPiaobooks[$index].bookid=data.rows[0].id;
              $rootScope.touPiaobooks[$index].img=data.rows[0].picture;
              $rootScope.touPiaobooks[$index].publish=data.rows[0].publish||"未知";
              $rootScope.touPiaobooks[$index].publishtimestr=data.rows[0].publishtimestr||"未知";
              $rootScope.touPiaobooks[$index].brief=data.rows[0].brief||"无";
              $rootScope.touPiaobooks[$index].flag1="true";
            }else{
              $rootScope.touPiaobooks[$index].isbn=imageData.text;
              $rootScope.touPiaobooks[$index].flag1=false;
              $rootScope.touPiaobooks[$index].flag2=false;
            }
          });
        }else{
          $rootScope.touPiaobooks[$index].qrdata=JSON.parse(imageData.text);
        }
        }else{
          $rootScope.showMessage("请重新扫描", 1000);
        }  
        }else{
          return;
        }
      }, function(error) { 
        $rootScope.showMessage("出错，请重新扫描" + error, 1000);
    })
    }
    $scope.addTouPiao = function(){
      if($rootScope.touPiaobooks[0].name==""){
        $rootScope.showMessage("请填写书名", 1000);
        return;
      }
      if($rootScope.touPiaobooks[0].isbn==""){
        $rootScope.showMessage("请扫描isbn", 1000);
        return;
      }
      if($rootScope.touPiaobooks[0].qrdata==""){
        $rootScope.showMessage("请扫描二维码", 1000);
        return;
      }
      if($rootScope.touPiaobooks[0].bookid){
        var bookid = $rootScope.touPiaobooks[0].bookid;
        var remark = $rootScope.touPiaobooks[0].remark;
        var qrdata = $rootScope.touPiaobooks[0].qrdata;
            $rootScope.showMessage("正在提交", 15000);
        AddByScanBookSome.get({},{bookid:bookid,remark:remark,qrdata:qrdata},function(data){
            if(result==1){
              $rootScope.showMessage(data.msg, 1000, function(){
              $rootScope.doRefresh();
              $rootScope.$ionicGoBack();
            });
            }else{
              $rootScope.showMessage(data.msg, 1000);
            }
        });
      }else{
        if($rootScope.touPiaobooks[0].img==""){
          $rootScope.showMessage("请上传图片", 1000);
          return;
        }

        var name = $rootScope.touPiaobooks[0].name;
        var picture = $rootScope.touPiaobooks[0].img;
        console.log(picture)
        var writer = $rootScope.touPiaobooks[0].writer;
        var publish = $rootScope.touPiaobooks[0].publish;
        var publishtimestr = $rootScope.touPiaobooks[0].publishtimestr;
        var brief = $rootScope.touPiaobooks[0].brief;
        var isbn = $rootScope.touPiaobooks[0].isbn;
        var remark = $rootScope.touPiaobooks[0].remark;
        var qrdata = $rootScope.touPiaobooks[0].qrdata;
            $rootScope.showMessage("正在提交...", 15000);
            $scope.upImage(picture,function(result){
              // AddByScanBook.get({},{name:name,picture:result,writer:writer,publish:publish,publishtimestr:publishtimestr,brief:brief,isbn:isbn,remark:remark,qrdata:qrdata},function(data){
                  // if(result==1){
                  //   $rootScope.showMessage(data.msg, 1000, function(){
                  //   $rootScope.doRefresh();
                  //   $rootScope.$ionicGoBack();
                  // });
                  // }else{
                  //   $rootScope.showMessage(data.msg, 1000);
                  // }
              // });
            })
        
      }
    }
    //调起相机照相片
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
        quality: 80,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 800,
        targetHeight: 800,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
  };

  //照相
  $scope.takePicture = function($index) {
        options.sourceType = Camera.PictureSourceType.CAMERA; // 用相机拍照获取拍摄的图片
        $cordovaCamera.getPicture(options).then(function(imageURI) {
            if(imageURI){
                $rootScope.touPiaobooks[$index].img = imageURI;
            }
        }, function(err) {
          // error
          $rootScope.showMessage(err, 1000);
        });
  };
  //从图库中获取照片
  $scope.getPicture = function($index) {
        options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY; // 从图库中获取图片
        $cordovaCamera.getPicture(options).then(function(imageURI) {
          if(imageURI){
                $rootScope.touPiaobooks[$index].img = imageURI;
            }
        }, function(err) {
          // error
          $rootScope.showMessage(err, 1000);
        });
  };
  //上传图片
  $scope.upImage = function (imageUrl,successCallback) {
                console.log(imageUrl)
                document.addEventListener('deviceready', function () {
                    var url = API_ENDPOINT+"/UploadBookCover";
                    var options = {};
                    $cordovaFileTransfer.upload(url, imageUrl, options)
                      .then(function (result) {
                          console.log(JSON.stringify(result));
                          console.log(result);
                          successCallback(result);
                      }, function (err) {
                          alert(JSON.stringify(err));
                          alert(err);
                          alert("fail");
                      }, function (progress) {
                          // constant progress updates
                      });

                }, false);
              }

  // 上拉框
    $scope.frame = function($index){
      if($rootScope.touPiaobooks[$index].flag2){
        return;
      }else{
        var hideSheet = $ionicActionSheet.show({
                      buttons: [
                        { text: '拍照' },
                        { text: '相册选取' }
                      ],
                      titleText: '选择方式',
                      cancelText: 'Cancel',
                      cancel: function() {
                           // add cancel qrdata..
                         },
                      buttonClicked: function(index) {
                        if(index==0){
                            $scope.takePicture($index);
                        }else{
                            $scope.getPicture($index);
                        }
                        return true;
                      }
                  });
      }
    }
      
})


// 书本详情控制器
module.controller('PiaoDetailCtrl',function($scope,$state,GetDetailBookSomeService,$location) {
    var _Lmain = document.getElementById("_Lmain");
    var _Rmain = document.getElementById("_Rmain");
    _Lbutton.style.color = "#E7BB9E";
    _Rbutton.style.color = "#D9D9D9";
    _Lbutton.onclick = function() {
       _Lmain.style.display = "block"; 
       _Rmain.style.display = "none"; 
       _Rbutton.style.color = "#D9D9D9";
       _Lbutton.style.color = "#E7BB9E";
    }
    _Rbutton.onclick = function() {
       _Lmain.style.display = "none"; 
       _Rmain.style.display = "block"; 
       _Lbutton.style.color = "#D9D9D9";
       _Rbutton.style.color = "#E7BB9E";
    }
    // 书本详情数据
    $scope.isHideTs = true;
    $scope.isHideZz = true;
    $scope.hideTsContent = function(){
      $scope.isHideTs = !$scope.isHideTs;
    }
    $scope.hideZzContent = function(){
      $scope.isHideZz = !$scope.isHideZz;
    }
    $scope.getBookDetail=function(id){
      GetDetailBookSomeService.get({},{id:id},function(data) {
        $scope.x=JSON.parse(data.msg);
        console.dir(data)
      });
    }
    var id=$location.url().split('/')[4];
    $scope.getBookDetail(id);
})


// 创建站点控制器
module.controller('SetZhanDianCtrl',function($scope,$state) {
})

// 预约控制器
module.controller('OrDerCtrl',function($scope,$state) {

})

// 预约控制器
module.controller('JieZhanDianCtrl',function($scope,$state) {
    
})

// 搜索页面控制器
module.controller('PiaoSearchCtrl', function($scope,$rootScope,FindFyBookService,$location) {
  $scope.Deleted = function() {
    $scope.searchval = "";
    $scope.data=null;
  }
  var name = "";
  var page = 0;
  var rows = 10;
  $scope.load = false;
  $scope.getBooks = function(name,page,rows){
    FindFyBookService.get({},{name:name,page:page,rows:rows},function(data){
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if(data.total==0){
            $scope.load=false;
            $scope.data=null;
            $scope.show=true;
        }else{
                $scope.show=false;                                                                                                                                                                                                                     
                if(page==1){
                $scope.data=data;
                }else{
                  for(var i=0;i<data.rows.length;i++){
                    $scope.data.rows.push(data.rows[i]);
                  } 
                }
                if(data.total<=rows){
                      $scope.load=false;
                    }else{
                      $scope.load=true;
                    }
            }
        
    })
  }
  $scope.change = function(){
    name = $scope.searchval;
    console.log(name)
    if(name!=""){
        page = 1;
        $scope.getBooks(name,page,rows);
    }else{
        $scope.load=false;
        $scope.data=null;
        $scope.show=true;
    }
  }
  $scope.loadMore = function(){
    console.log($scope.data)
    if($scope.data&&$scope.data.total==$scope.data.rows.length){
        $scope.load=false;
      }else{
        $scope.getBooks(name,++page,rows);
      }
  }
  $scope.backToTp=function($index){
    var id=$location.url().split('/')[3];
    $rootScope.touPiaobooks[id].name=$scope.data.rows[$index].name;
    $rootScope.touPiaobooks[id].isbn=$scope.data.rows[$index].isbn;
    $rootScope.touPiaobooks[id].writer=$scope.data.rows[$index].writer||"未知";
    $rootScope.touPiaobooks[id].bookid=$scope.data.rows[$index].id;
    $rootScope.touPiaobooks[id].img=$scope.data.rows[$index].picture;
    $rootScope.touPiaobooks[id].publish=$scope.data.rows[$index].publish||"未知";
    $rootScope.touPiaobooks[id].publishtimestr=$scope.data.rows[$index].publishtimestr||"未知";
    $rootScope.touPiaobooks[id].brief=$scope.data.rows[$index].brief||"无";
    $rootScope.touPiaobooks[id].flag1=true;
    $rootScope.$ionicGoBack();
  }
});
// 扫描页面控制器
module.controller('SaoMiaoCtrl',function($scope,$state) {
    
})

// 帮助页面控制器
module.controller('HelpCtrl',function($scope,$state) {
    
})

// 借书页面控制器
module.controller('JieShuCtrl',function($scope,$rootScope,$state,ScanFyBook) {
    
})
// 充值页面控制器
module.controller('ChongZhiCtrl',function($scope,$state) {
    
})
// 站点列表形式控制器
module.controller('LieBiaoCtrl',function($scope,$state) {
    
})
// 站点主页页面控制器
module.controller('ZhanDianZhuYeCtrl',function($scope,$state) {
    
})
// 全部书评页面控制器
module.controller('AllShuPingCtrl',function($scope,$state) {
    
})
// 全部推荐页面控制器
module.controller('AllTuiJianCtrl',function($scope,$state) {
    
})

// 添加描述页面控制器
module.controller('AddMiaoShuCtrl',function($scope,$state) {
    
})

// 详情页用户信息
module.controller('PiaoPerSonalCtrl',function($scope,$state) {
    
})

// 帮投漂页面控制器
module.controller('BangTouCtrl',function($scope,$state,$interval,$ionicModal) {
    var user = $scope.user;
    $scope.user = {};
    $scope.keyBtnTitle = "获取验证码";
    // $scope.signinErrorMsg = '手机号码输入有误!';
    // $scope.signinError = true;
    var updateTime;
    var time = 60;
    function decreLeft() {
        time = time - 1;
        $scope.keyBtnTitle = time + '秒后重新获取';
        if (time == 0) {
            time = 60;
            $scope.getRegKeyBtn = false;
            $scope.keyBtnTitle = '重新获取验证码';
            $interval.cancel(updateTime);
        }
    }
    var patternMobile=/^[1-9]{1}[0-9]{10,10}$/;
    // no password during getting reset key
   var validateUserForPassword = function (user) {
        if (!patternMobile.exec(user.mobile)) {
            $scope.signupErrorMsg = '手机号码输入有误!';
            $scope.signupError = true;
            return false;
        } else {
            $scope.signupErrorMsg = '';
            $scope.signupError = false;
            return true;
        }
    };
    $scope.getRegKey = function() {
        if(!validateUserForPassword($scope.user)){
            return;
        }
        $scope.getRegKeyBtn = true;
        updateTime = $interval(decreLeft, 1000);  
    };
})

// function ComplexCustomOverlay(point, text, num){
//       this._point = point;
//       this._text = text;
//       this._num = num;
//     }
//     ComplexCustomOverlay.prototype = new BMap.Overlay();
//     ComplexCustomOverlay.prototype.initialize = function(map){
//       this._map = map;
//       if(this._num !== 0){
//         var div = this._div = document.createElement("div");
//         div.className = "map_mask";
//         var mk = document.createElement("div");
//         mk.appendChild(document.createTextNode(this._num));      
//         mk.className = "map_mk";
//         div.appendChild(mk);
//         var bg = document.createElement("div");
//         bg.className = "map_mask_bg";
//         var text = document.createElement("div");
//         text.appendChild(document.createTextNode(this._text));      
//         bg.appendChild(text);
//         div.appendChild(bg);
//         div.addEventListener("touchstart", function(){
//           console.log(e)
//         var map_mask = allmap.getElementsByClassName("map_mask");
//           for(var i=0;i<map_mask.length;i++){
//             map_mask[i].i = i;
//             map_mask[i].style.zIndex="0";
//           }
//           this.style.zIndex="1";
//       })
//       }else{
//         var div = this._div = document.createElement("div");
//         div.className = "map_now";
//       }
//       map.getPanes().labelPane.appendChild(div);
//       return div;
//     }
//     ComplexCustomOverlay.prototype.draw = function(){
//       var map = this._map;
//       var pixel = map.pointToOverlayPixel(this._point);
//       if(this._num !== 0){
//       this._div.style.left = pixel.x -20 + "px";
//       this._div.style.top  = pixel.y -60 + "px";
//       }else{
//       this._div.style.left = pixel.x -9 + "px";
//       this._div.style.top  = pixel.y -20 + "px";
//       }
//     }
    
            
