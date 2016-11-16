var module = angular.module('bugu.controllers');

module.controller('TuijianCtrl', function($scope,$rootScope, $state,FindFyRecommendService,FindFyWantService) {
  // 头部转换
  $scope.title = "求好书";
  $scope.isError=true;
  $scope.isWarning=false;
  $scope.noflag = false;
  $scope.isflag = false;
  $scope.flag = false;
  $scope.gotoPage1 = function() {
        $scope.title = "求好书";
        $scope.isError = true;
        $scope.isWarning = false;
        $scope.noflag = false;
        $scope.isflag = false;
        qiuhaoshu.style.display="block";
        jianhaoshu.style.display="none";
    }

  $scope.gotoPage2 = function() {
      $scope.title = "荐好书";
      $scope.isError =false;
      $scope.isWarning = true;
      $scope.noflag = true;
      $scope.isflag = true;
      qiuhaoshu.style.display="none";
      jianhaoshu.style.display="block";
      $scope.tuiload=true;
  }
  $scope.gotoAddBook = function() {
        $state.go('tab.tuijian.addtuijian');
    }
  $scope.gotoTuiBook = function() {
        $state.go('tab.addbook');
    }
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
  $scope.Lei_bie = function($event) {
     $event.stopPropagation();
    } 
  }
  
    $scope.tuidata={rows:[]};
    var tuipage=0;
    var tuirows=10;

    // 推荐数据获取
    /*拿数据*/
    $scope.getTuiBook=function(page,rows){
      FindFyRecommendService.get({},{page:tuipage,rows:tuirows},function(data) {
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.refreshComplete');
        console.log(data)
        if(tuipage==1){
          $scope.tuidata=data;
        }else{
          for(var i=0;i<data.rows.length;i++){
            $scope.tuidata.rows.push(data.rows[i])
          } 
        }
        if(data.total<=tuirows){
          $scope.tuiload=false;
        }
      });
    }
    /*拿数据--end*/

    
    /*下拉刷新，上拉加载*/
    $rootScope.tuiDoRefresh = function() {
      tuipage=1;
      $scope.tuiload=true;
      $scope.getTuiBook(tuipage,tuirows);
    };
    
    $scope.tuiLoadMore = function() {
      if($scope.tuidata.total==$scope.tuidata.rows.length){
        $scope.tuiload=false;
      }else{
        $scope.getTuiBook(++tuipage,tuirows);
      }
      
    };


    // 求书数据获取
    /*拿数据*/
    $scope.qiuload=true;
    $scope.qiudata={rows:[]};
    var qiupage=0;
    var qiurows=10;
    $scope.getQiuBook=function(page,rows){
      FindFyWantService.get({},{page:qiupage,rows:qiurows},function(data) {
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.refreshComplete');
        if(page == 1){
          $scope.qiudata = data;
        }else{
          for(var i=0;i<data.rows.length;i++){
            $scope.qiudata.rows.push(data.rows[i])
          } 
        }
        if(data.total <= qiurows){
          $scope.qiuload = false;
        }
      });

    }
    /*拿数据--end*/

    
    /*下拉刷新，上拉加载*/
    $rootScope.qiuDoRefresh = function() {
      qiupage=1;
      $scope.qiuload=true;
      $scope.getQiuBook(qiupage,qiurows);
    };
    
    $scope.qiuLoadMore = function() {
      if($scope.qiudata.total==$scope.qiudata.rows.length){
        $scope.qiuload=false;
      }else{
        $scope.getQiuBook(++qiupage,qiurows);
      } 
    };
});

// 荐好书详情控制器
module.controller('TuijianDetailCtrl', function($scope,$state) {
  //拿完数据赋值，并设置滑块宽度
  $scope.tuijiantx=[{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"},{src:"img/tuijianpic/Path2Copy3.png"}];

  $scope.ulWidth=$scope.tuijiantx.length*48+"px";
});

// 求好书控制器
module.controller('QiuHaoShuCtrl', function($scope) {
  
});

// 荐好书控制器
module.controller('JianHaoShuCtrl', function($scope) {
  $scope.title = "非常棒！"
});

// 全部同求控制器
module.controller('TuijianAllRequestCtrl', function($scope) {
  $scope.title = "这是全部推荐"
});

// 全部推荐控制器
module.controller('TuijianAllRecommendCtrl', function($scope) {
  $scope.title = "这是全部推荐"
});

// 搜索页面控制器
module.controller('TuijianSearchCtrl', function($rootScope,$scope,FindFyBookService,$location) {
  var name= "";
  var page = 0;
  var rows = 10;
  $scope.load = false;
  $scope.getBooks = function(name,page,rows){
    FindFyBookService.get({},{name:name,page:page,rows:rows},function(data){
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        console.log(data)
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
    if(name!=""){
        page = 1;
        $scope.getBooks(name,page,rows);
    }else{
        $scope.data=null;
        $scope.load=false;
        $scope.show=true;
    }
  }
  $scope.loadMore = function(){
    if($scope.data.total==$scope.data.rows.length){
        $scope.load=false;
      }else{
        $scope.getBooks(name,++page,rows);
      }
  }
  $scope.backToTp=function($index){
    var id=$location.url().split('/')[4];
    $rootScope.touPiaobooks[id].name=$scope.data.rows[$index].name;
    $rootScope.touPiaobooks[id].writer=$scope.data.rows[$index].writer||"未知";
    $rootScope.touPiaobooks[id].isbn=$scope.data.rows[$index].isbn;
    $rootScope.touPiaobooks[id].img=$scope.data.rows[$index].picture;
    $rootScope.touPiaobooks[id].bookid=$scope.data.rows[$index].id;
    $rootScope.touPiaobooks[id].flag=true;
    $rootScope.$ionicGoBack();
  }

  $scope.Deleted = function() {
    $scope.searchval = "";
    $scope.data=null;
  }
});

// 增加好书页面控制器
module.controller('AddBookCtrl', function($scope,$rootScope,AddWantService) {
  // 一级分类tab切换
  $scope.directory=[{name:'不限'}, {name:'史学'}, {name:'医学'}, {name:'自然科学'}, {name:'其它'}];
  $scope.selectRestaurant=function(row) {$scope.selectedRow=row;};
  // 二级分类tab切换
  $scope.directory2=[{name:'小说'}, {name:'自传'}, {name:'散文'}, {name:'诗歌'}, {name:'其它'}, {name:'其它2'}];
  $scope.selectRestaurant2=function(row2) {$scope.selectedRow2=row2;};

  
  $rootScope.qiuHaobooks=[{content:"",keywords:""}];
  // 添加求好书
  $scope.addBook = function() {
    var keywords="搞笑"; 
    var content = $rootScope.qiuHaobooks[0].content;
    var keywords = $rootScope.qiuHaobooks[0].keywords;
    if($rootScope.qiuHaobooks[0].content==""){
        $rootScope.showMessage("描述不能为空", 1000);
        return;
      }
    $rootScope.showMessage("正在提交...", 15000);
    AddWantService.get({},{content:content,keywords:keywords},function(data) {
        $rootScope.showMessage(data.msg, 1000, function(){
            if(data.result==1){
              $rootScope.showMessage(data.msg, 1000, function(){
              $rootScope.qiuDoRefresh();
              $rootScope.$ionicGoBack();
            });
            }else{
              $rootScope.showMessage(data.msg, 1000);
            }
          });
      });
  }
});

// 个人主页控制器
module.controller('PersonalHomePageCtrl', function($scope) {
  $scope.title = "这是个人主页"

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


});

// 荐好书详情控制器
module.controller('JianHaoShuDetailCtrl', function($scope) {
  $scope.title = "这是荐好书"
});

// 推荐控制器
module.controller('AddTuiJianCtrl', function($scope,$state,$rootScope,$cordovaCamera,$cordovaBarcodeScanner,$ionicActionSheet,AddRecommendService) {
  $rootScope.touPiaobooks=[{name:"",writer:"",isbn:"",id:"",img:"",flag:false}];
  // $scope.addBook=function(){
  //       for(var i=0;i<$rootScope.touPiaobooks.length;i++){
  //           if($rootScope.touPiaobooks[i].bookid==""){
  //               return;
  //           }
  //       }
  //       $rootScope.touPiaobooks.push({name:"",writer:"",isbn:"",id:"",img:"",flag:false});
  //   }

    // 条形码码扫描
    $scope.scanBarcode = function($index) {
      $cordovaBarcodeScanner.scan().then(function(imageData) { 
        $rootScope.touPiaobooks[$index].isbn=imageData.text;
        ScanFyBook.get({},{isbn:imageData.text,page:1,rows:10},function(data){
          if(imageData.cancelled==false){
            if(imageData.text!=""){
              if(data.total==1){
                $rootScope.touPiaobooks[$index].name=data.rows[0].name;
                $rootScope.touPiaobooks[$index].isbn=data.rows[0].isbn;
                // $rootScope.touPiaobooks[$index].writer=data.rows[0].writer||"未知";
                $rootScope.touPiaobooks[$index].bookid=data.rows[0].id;
                $rootScope.touPiaobooks[$index].img=data.rows[0].picture;
                // $rootScope.touPiaobooks[$index].publish=data.rows[0].publish||"未知";
                // $rootScope.touPiaobooks[$index].publishtimestr=data.rows[0].publishtimestr||"未知";
                // $rootScope.touPiaobooks[$index].brief=data.rows[0].brief||"无";
                // $rootScope.touPiaobooks[$index].remark=data.rows[0].remark||"无";
                $rootScope.touPiaobooks[$index].flag=true;
              }else{
                $rootScope.touPiaobooks[$index].flag=false;
                $rootScope.showMessage("请选择系统内的书籍", 1000);
              }
            }else{
              $rootScope.showMessage("请重新扫描", 1000);
            }
          }else{
            return;
          }
        });
      }, function(error) { 
      $rootScope.showMessage("出错，请重新扫描" + error, 1000);
    })
  }
    // 添加推荐书
    $scope.addTuijian = function() {
      if($rootScope.touPiaobooks[0].name==""){
        $rootScope.showMessage("请填写书名", 1000);
        return;
      }
      if($rootScope.touPiaobooks[0].isbn==""){
        $rootScope.showMessage("请扫描isbn", 1000);
        return;
      }
      var id = $rootScope.touPiaobooks[0].bookid;
      var remark = $rootScope.touPiaobooks[0].remark;
      var recommendlist = [{id:id,remark:remark}];
      recommendlist = JSON.stringify(recommendlist);
      console.dir({content:"",recommendlist:recommendlist});
          $rootScope.showMessage("正在提交...", 15000);
      AddRecommendService.get({},{content:"",recommendlist:recommendlist},function(data) {
          $rootScope.showMessage(data.msg, 1000, function(){
            if(data.result==1){
              $rootScope.showMessage(data.msg, 1000, function(){
              $rootScope.tuiDoRefresh();
              $rootScope.$ionicGoBack();
            });
            }else{
              $rootScope.showMessage(data.msg, 1000);
            }
          });
      });
    }
  
});

// 推荐好书控制器
module.controller('AddTuiBookCtrl', function($scope) {
  $scope.title = "这是推荐好书页面"

});
// 添加标签页面控制器
module.controller('AddBiaoQianCtrl', function($scope,$rootScope) {
  $scope.tuijianBq=[{bqname:"日本"},{bqname:"文学"},{bqname:"经典"},{bqname:"日本"},{bqname:"文学"},{bqname:"经典"},{bqname:"日本"},{bqname:"文学"},{bqname:"经典"},{bqname:"日本"},{bqname:"文学"},{bqname:"经典"}]
  $scope.editBq=[{bqname:""}];
  $scope.add=function(){
    for(var i=0;i<$scope.editBq.length;i++){
        if($scope.editBq[i].bqname==""){
          return;
        }
      }
    $scope.editBq.push({bqname:""});
  }
  $scope.clickadd=function(str){
    for(var i=0;i<$scope.editBq.length;i++){
        if($scope.editBq[i].bqname==str){
          return;
        }
        if($scope.editBq[i].bqname==""){
          $scope.editBq[i].bqname=str;
          return;
        }
      }
      $scope.editBq.push({bqname:str});

  }
  $scope.submit=function(){
    var obj={}
    var json=[]
    for(var i=0;i<$scope.editBq.length;i++){
      if($scope.editBq[i].bqname){
        if(!obj[$scope.editBq[i].bqname]){
          obj[$scope.editBq[i].bqname]=true;
          json.push($scope.editBq[i].bqname)
        }
      }
    }
    var json=json.join();
    
    if(json){
      console.log(json);
      //提交service
    }
    $rootScope.$ionicGoBack();
  }
});
