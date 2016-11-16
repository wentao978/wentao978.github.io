var module = angular.module('bugu.services');


// module.factory('FindMyRecommendService', function Account($resource) {
//     return $resource('/api/pages/findFyRecommend', {}, {
//             'get': { method: 'POST' }
//         });
// })

module.factory('FindFyBookSomeService', function Account($resource, API_ENDPOINT) {
  return $resource(API_ENDPOINT+'findFyBookSome', {}, {
    'get': { method: 'POST' , params:{page:"@page",rows:"@rows",pos:"@pos"} }
  });
})
//搜索
module.factory('FindFyBookService', function Account($resource, API_ENDPOINT) {
  return $resource(API_ENDPOINT+'findFyBook', {}, {
    'get': { method: 'POST' , params:{name:"@name",page:"@page",rows:"@rows"} }
  });
})

// 书本详情获取数据
module.factory('GetDetailBookSomeService', function Account($resource, API_ENDPOINT) {
  return $resource(API_ENDPOINT+'getDetailBookSome', {}, {
    'get': { method: 'POST' , params:{id:"@id"}}
  });
})

// 添加投票-系统内
module.factory('AddByScanBookSome', function Account($resource, API_ENDPOINT) {
  return $resource(API_ENDPOINT+'addByScanBookSome', {}, {
    'get': { method: 'POST' , params:{bookid:"@bookid",remark:"@remark",qrdata:"@qrdata"}}
  });
})

// 添加投票-系统外
module.factory('AddByScanBook', function Account($resource, API_ENDPOINT) {
  return $resource(API_ENDPOINT+'addByScanBook', {}, {
    'get': { method: 'POST' , params:{name:"@name",picture:"@picture",writer:"@writer",publish:"@publish",publishtimestr:"@publishtimestr",brief:"@brief",isbn:"@isbn",remark:"@remark",qrdata:"@qrdata"}}
  });
})

// 扫条形码isbn获得数据
module.factory('ScanFyBook', function Account($resource, API_ENDPOINT) {
  return $resource(API_ENDPOINT+'scanFyBook', {}, {
    'get': { method: 'POST' , params:{isbn:"@isbn",page:"@page",rows:"@rows"}}
  });
})