/* global angular */
'use strict';

angular.module('Common.Auth')
    // 让获取account方法忽略http auth interceptor的拦截，我在用token获取account失败的时候，设置它token超时
    // 然后会有相应的提示。
    .factory('Account', function Account($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + 'getMyInfoUser');
    })
    .factory('AccountEdit', function AccountEdit($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + 'updateMyInfoUser', {}, {
            'update': { method: 'POST' }
        });
    })
    .factory('AccountPersonImg', function AccountPersonImg($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + 'UploadPersonImg');
    })

	.factory('RegisterKey', function($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'ActionGetVerify', {}, {
        	'get': { method : 'POST', params : {account : '@account'} }
        });
	})
	.factory('Register', function($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'Actionregister', {}, {
            'save': { method : 'post', params : { psw : '@psw' , account : '@account' , verify : '@verify'}}
        });
	})

	.factory('PasswordForget', function($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'ActionGetPsw', {}, {
        	'reset': { method : 'POST' }
        });
	});
    var service = angular.module('bugu.services');
    module.factory('FindFyMyWantService', function Account($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT+'findFyMyWant', {}, {
            'get': { method: 'POST' , params:{page:"@page",rows:"@rows"} }
        });
    });

    module.factory('FindFyMyRecommendService', function Account($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT+'findFyMyRecommend', {}, {
            'get': { method: 'POST' , params:{page:"@page",rows:"@rows"} }
        });
    });

    // 个人借阅记录
    module.factory('FindFyMyBorrowService', function Account($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT+'findFyMyBorrow', {}, {
            'get': { method: 'POST' , params:{page:"@page",rows:"@rows"} }
        });
    });

    // 删除求书
    module.factory('DelWantService', function Account($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT+'delWant', {}, {
            'get': { method: 'POST' , params:{id:"@id"} }
        });
    });

    // 删除推荐书
    module.factory('DelRecommendService', function Account($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT+'delRecommend', {}, {
            'get': { method: 'POST' , params:{id:"@id"} }
        });
    });

    // 已投漂的书
    module.factory('FindFyMyBookSomeService', function Account($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT+'findFyMyBookSome', {}, {
            'get': { method: 'POST' , params:{rows:"@rows",page:"@page"}}
        });
    });

     // 删除投漂的书
    module.factory('DelBookSomeService', function Account($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT+'delBookSome', {}, {
            'get': { method: 'POST' , params:{id:"@id"}}
        });
    });

