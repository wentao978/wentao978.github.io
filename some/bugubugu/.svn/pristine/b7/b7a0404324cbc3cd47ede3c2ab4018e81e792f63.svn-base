
var module = angular.module('bugu.controllers');

module.controller('SigninCtrl', function($scope, $rootScope, $ionicHistory, $log, $state, $interval, $ionicLoading, $timeout,
             Auth, RegisterKey, Register, $ionicModal){
    $scope.data = {};
    $scope.init = function () {
    	$scope.title = $rootScope.title;
    	$scope.state = $rootScope.state;
        $scope.user = {
            name: '',
            realName: '',
            roles: []
        };
        setTimeout(function(){
            var watchpsw = document.getElementsByClassName('watchpsw');
            var psws = document.getElementsByClassName('psw')
            for(var i=0;i<watchpsw.length;i++){
            watchpsw[i].i=i;
            watchpsw[i].addEventListener('touchstart',function(){
                psws[this.i].type="text";
                this.src="../img/loginpic/Group4.png";
            })
            watchpsw[i].addEventListener('touchend',function(){
                psws[this.i].type="password";
                this.src="../img/loginpic/password01.png";
            })  
            }
        },100)
    };
    $scope.init();

    $scope.getRegKeyBtn = false;
    $scope.keyBtnTitle = '获取验证码';
	
	$scope.gotoSignin = function() {
    		$scope.title='登录';
    		$scope.state='SIGNIN';

             
	};
    
	$scope.gotoSignup = function() {
		$scope.title = '注册';
		$scope.state = 'SIGNUP';
	};
    
    $scope.gotoForget = function () {
        $rootScope.pwForgetPopup();
        $timeout( function () {
            $rootScope.loginClose();
        }, 500);
    };
    $scope.goDirectly = function() {
        $rootScope.title = '未登录';
        $rootScope.state = 'NEED';
        $rootScope.loginClose();
    }
	$scope.signin = function() {
        // if (validateUserForSignin($scope.user)) {
            $ionicLoading.show({
              template: '正在登陆...'
            });
            Auth.login($scope.user);
        // }
	};
	var updateTime;
    var time = 60;
    function decreLeft() {
        time = time - 1;
        $scope.keyBtnTitle = time + '秒后重新获取';
        if (time == 0) {
            time = 60;
            $scope.keySent = false;
            $scope.keyBtnTitle = '重新获取验证码';
            $interval.cancel(updateTime);
        }
    }
    var accountPattern=/^[a-z]{1}[a-z0-9_]{3,19}$/;
    var patternMobile=/^[1-9]{1}[0-9]{10,10}$/;
    var validateUserForSignup = function (user) {
        if (!patternMobile.exec(user.account)) {
            $scope.signupErrorMsg = '手机号码输入有误!';
            $scope.signupError = true;
            return false;
        }
        if (!user.psw || user.psw.length < 6) {
            $scope.signupError = true;
            $scope.signupErrorMsg = '密码最少为6位';
        }
        
        $scope.signupErrorMsg = '';
        $scope.signupError = false;
        return true;
    };
    var validateUserForSignin = function (user) {
         if (!patternMobile.exec(user.account)) {
            $scope.signinError = true;
            $scope.signinErrorMsg = '手机号码输入有误!';
            return false;
        }
        if (!user.psw || user.psw.length < 6) {
            $scope.signinError = true;
            $scope.signinErrorMsg = '密码最少为6位';
            return false;
        }
        if (!accountPattern.exec($scope.user.account) && !patternMobile.exec($scope.user.account)) {
            $scope.signinErrorMsg = '用户名/手机号码输入有误!\n用户名只能是小写字符、下划线或数字，且以小写字符开头!';
            $scope.signinError = true;
            return false;
        }
        
        $scope.signinErrorMsg = '';
        $scope.signinError = false;
        return true;
    };
	$scope.getRegKey = function() {
        if (!validateUserForSignup($scope.user)) {
            return;
        }
        RegisterKey.get({},{account:$scope.user.account}, function(result) {
            if(result.result == 0){
                if(result.msg == "该用户已存在，请使用其他手机。"){
                    $scope.signupError = true;
                    $scope.signupErrorMsg = '该用户已存在，请使用其他手机。';
                    return;
                }else if(result.msg == "手机号不能为空"){
                    $scope.signupError = true;
                    $scope.signupErrorMsg = '手机号不能为空';
                    return;
                }
            }else{
                $scope.keySent = true;
                $scope.keyBtnTitle = '60秒后重新获取';
                updateTime = $interval(decreLeft, 1000);  
            }
            
        }, function(errorData) {
            $ionicLoading.show({
              template: '获取验证码失败:' + errorData.data,
              duration: 2000
            });
        });
    };
    $scope.signup = function() {
        if (!validateUserForSignup($scope.user)) {
            return;
        }
        if (!$scope.user.verify || $scope.user.verify.length < 4) {
            $scope.signupError = true;
            $scope.signupErrorMsg = '请输入4位手机验证码!';
            return false;
        }
        Register.save({},$scope.user,
            function(successData) {
                console.log(successData)
                
                if(successData.result == 0){
                    if(successData.msg == "帐号不能为空"){
                        $scope.signupError = true;
                        $scope.signupErrorMsg = '手机号不能为空';
                        return;
                    }
                }else{
                    $log.log('Register success');
                    $ionicLoading.show({
                      template: '注册成功',
                      duration: 600
                    });
                }
                Auth.login($scope.user, function() {
                    $rootScope.hideLoading();
                    $scope.init();
                    $state.go('tab.account.edit'); // 注册成功以后，直接跳转到修改个人信息页面
                });
            },
            function(errorData) {
                $log.log(errorData);
                $ionicLoading.show({
                  template: '注册失败:' + errorData.data,
                  duration: 2000
                });
            });
    };

	$scope.wxAuthLogin = function($event) {
		$log.log('Login with weixin.');
        $rootScope.showMessage("正在登陆...");
        Wechat.auth('snsapi_userinfo', function (response) {
            // you may use response.code to get the access token.
            $rootScope.showMessage("获取用户信息...", 20000);
            Auth.weixinLogin(response.code);
        }, function (reason) {
            $scope.showMessage('登陆失败:' + reason, 5000);
        });
    }

    $scope.weixinInstalled = false;
    var checkWeixinInstalled = function() {
        if (typeof Wechat == 'undefined') {
                $scope.weixinInstalled = false;
        } else {
            Wechat.isInstalled(function (installed) {
                if (installed) {
                    $scope.weixinInstalled = true;
                }
            }, function (reason) {
                    $scope.weixinInstalled = false;
            });
        }
    };
    $timeout(checkWeixinInstalled, 3000);
    $scope.cancelLogin = function () {
        $rootScope.loginClose();
        $scope.$emit('event:auth-loginCancelled');
        $scope.init();
    };
});


module.controller('PasswordForgetCtrl', function($scope, $rootScope, $ionicHistory, $log, $state, $interval, $ionicLoading, $http, $timeout,
             PasswordForget, $ionicModal, Auth, RegisterKey){
    $scope.signupErrorMsg = '输入正确手机号并提交，稍后密码会以短信形式发送至该手机!';
    $scope.signupError = true;
     var validateUserForForget = function (user) {
        if (!user.psw || user.psw.length < 6) {
            $scope.signinError = true;
            $scope.signinErrorMsg = '密码最少为6位';
            return false;
        }  
        $scope.signinErrorMsg = '';
        $scope.signinError = false;
        return true;
    };
    $scope.keyBtnTitle = "获取验证码";
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
    
    $scope.cancelForget= function () {

        $rootScope.pwForgetClose();
    };

    var patternMobile=/^[1-9]{1}[0-9]{10,10}$/;
    // no password during getting reset key
    var validateUserForPassword = function (user) {
        if (!user||!patternMobile.exec(user.account)) {
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
     
    };
    
	$scope.getPassword = function() {
        console.log($scope.user)
        if (!validateUserForPassword($scope.user)) {
            return;
        }
        
        PasswordForget.reset($scope.user.account, function(result) {
            $rootScope.showMessage('密码已经发送至手机', 1500);
        });
	};
});