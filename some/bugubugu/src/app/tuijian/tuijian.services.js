var service = angular.module('bugu.services');

module.factory('FindFyRecommendService', function Account($resource, API_ENDPOINT) {
  return $resource(API_ENDPOINT+'findFyRecommend', {}, {
    'get': { method: 'POST' , params:{page:"@page",rows:"@rows"} }
  });
})


module.factory('FindFyWantService', function Account($resource, API_ENDPOINT) {
  return $resource(API_ENDPOINT+'findFyWant', {}, {
    'get': { method: 'POST' , params:{page:"@page",rows:"@rows"} }
  });
})


//推荐搜索
module.factory('FindFyBookService', function Account($resource, API_ENDPOINT) {
  return $resource(API_ENDPOINT+'findFyBook', {}, {
    'get': { method: 'POST' , params:{name:"@name",page:"@page",rows:"@rows"} }
  });
})

//添加推荐书
module.factory('AddRecommendService', function Account($resource, API_ENDPOINT) {
  return $resource(API_ENDPOINT+'addRecommend', {}, {
    'get': { method: 'POST' , params:{content:"@content",recommendlist:"@recommendlist",id:"@bookid",remark:"@remark"} }
  });
})

//添加求书
module.factory('AddWantService', function Account($resource, API_ENDPOINT) {
  return $resource(API_ENDPOINT+'addWant', {}, {
    'get': { method: 'POST' , params:{content:"@content",keywords:"@keywords"} }
  });
})
