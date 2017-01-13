$(document).ready(function(){
	var uid = getQueryString('imei');
	var s = getQueryString('s');
	
	var resData;
	var resLevel;
	var resCode;
	var resStatus;
	var resNumber;
	
	var num = 0;
	var moveLeft = ["8.5rem","10.5rem","12.5rem"];
	var staticLeft = ["1.2rem","8.2rem","12.5rem"];
	var oBtn = true;
	var textArr = ["","金立M6手机一部","喜马拉雅耳机一副","50元现金红包一个"];
	
	String.prototype.iphone = function(){
		return this.replace(/\d{1}(?=[\d\D]{4,7}$)/ig,"<span class='xing'>*</span>")
	};
	
	
	var topArr = ["0rem","-3.91rem","-7.83rem","-11.64rem"];
	var pLevel = 0;
	
	//leaves
	(function(){
 		//树叶的总个数
		var count = 20; 
		//获取随机数
		function Random(s,e){return Math.random()*(e-s)+s;};
		//循环创建树叶的dom元素
		var fragment = document.createDocumentFragment();
		for(var i = 0 ; i < count; i ++) {
			var div = document.createElement("div");
			div.className = 'leaves';
        	div.innerHTML = '<img src="images/f_'+(Math.round(Random(1,5)))+'.png" alt="">';
        	fragment.appendChild (div);
		};
		//添加到body里
		document.querySelector("#content").insertBefore(fragment,document.querySelector("#content .flagsWrap"));
		//给每个树叶添加animation动画，并设置随机的参数
 		var leaves = document.querySelectorAll('.leaves');
		Array.prototype.forEach.call(leaves,function(o,i){
  			var time1 = Random(10,15);   //树叶总共落下的时间
			var time2 = Random(0,5);    //每个树叶的延时时间
			var time3 = Random(1,3);    //每个树叶的摇摆的时间
			//随机设置left，根据浏览器宽度设置最大值
 			o.style.left = Random(0,16) +'rem';
			//设置animation属性，为了兼容添加了前缀，总共时间和延时时间随机获取
			o.style.animation = o.style.WebkitAnimation = 'fade '+time1+'s '+ time2+'s linear,move '+time1+'s '+ time2+'s linear';
			//设置里面图片的animation属性，设置时间，并设置翻转
			o.children[0].style.animation = o.children[0].style.WebkitAnimation = Math.round(Random(0,1)) ? 'rotate '+time3+'s ease-in-out infinite alternate' : 'rotate1 '+time3+'s ease-in-out infinite alternate';
		})
	})();
	
	//点击活动规则
	$(".ruleWrap").click(function(){
		$(".rules,#mask").show();	
	});
	
	//点击赞助链接
	$(".apk").each(function(index, element) {
        $(this).click(function(){
			window.location.href = $(this).find("img").data("href");
			$.ajax({
				url: '/active/eleven/search.php',
				type: 'POST',
				dataType: 'json',
				timeout:60000,
				data:{
					uid:uid,
					s:s,
					gameid:$(this).find("img").data("id")
				},
				success: function(){},
				error: function(){}
			});
		});
    });
	
	
	
	
	
	
	
	//抽奖代码
	var $list = $('.gridWrap .list');
	var $start = $('.gridWrap .start');
	var btn = true;
	var level = 8;
	
	$start.click(function(){
		if(!btn)return;
		
		if(parseInt(resNumber)){
			$start.addClass('gray');
			//在此处写ajax即可
			setTimeout(function(){
				level = 8;	
			},2000);
			
			
			var t1 = Date.now();
			raffleInit(level,function(n){
				console.log("恭喜你获得了："+(n)+' 等奖');
				console.log((Date.now() - t1)/1000);
				$start.removeClass('gray');
				btn= !btn;
			});
			btn= !btn;	
		}else{
			toast('您的摇杆次数用完了',2600);
		}	
	});
	
	var timer = null,now = $list.length - 1,count = 0,startOff = true,s = 200;  
	function raffleInit(){
		var endnum = arguments[0]-1;
		var cb =arguments[1];
		clearInterval(timer)
		timer = setInterval(function(){
			startGo();
		},s);
		function startGo(){
			
			endnum = level - 1;//将等级设置为延时后的值
			
			if(!startOff){
				cb(endnum+1)
				clearInterval(timer);
				count = 0,startOff = true,s = 180;
				return false;
			};
			for(var i=0;i<$list.length;i++){
				$list.eq(i).removeClass('active');
			};
			now++;
			now = now++%$list.length;
			if(now %$list.length == 0) {
				count++;   //计算圈数
			};
			
			$list.eq(now).addClass('active');
			if(count>=1 && count<7){
				clearInterval(timer);
				s *= 0.96;
				timer = setInterval(function(){
					startGo();
				},s);
			};
			if(count>7){
				clearInterval(timer);
				s *= 1.08;
				timer = setInterval(function(){
					startGo();
				},s);
				if(s>260 && (now == endnum)){
					startOff = false;
				};
			};
		};
	};
	
	
	
	
	

	$.ajax({
		url: '/active/year2017/search.php',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		data:{
			uid:uid,
			s:s,
			type:"search"
		},
		success: function(data){
			resData = data;
			resLevel = data.level;
			resCode = data.code;
			resStatus = data.status;
			resNumber = data.number;
			
			if(data.st == "2"){  //活动正常
				
				//抽奖代码
				var $list = $('.gridWrap .list');
				var $start = $('.gridWrap .start');
				var btn = true;
				var level = 8;
				
				$start.click(function(){
					if(!btn)return;
					
					if(parseInt(resNumber)){
						$start.addClass('gray');
						//在此处写ajax即可
						setTimeout(function(){
							level = 8;	
						},2000);
						
						
						var t1 = Date.now();
						raffleInit(level,function(n){
							console.log("恭喜你获得了："+(n)+' 等奖');
							console.log((Date.now() - t1)/1000);
							$start.removeClass('gray');
							btn= !btn;
						});
						btn= !btn;	
					}else{
						toast('您的摇杆次数用完了',2600);
					}	
				});
				
				var timer = null,now = $list.length - 1,count = 0,startOff = true,s = 200;  
				function raffleInit(){
					var endnum = arguments[0]-1;
					var cb =arguments[1];
					clearInterval(timer)
					timer = setInterval(function(){
						startGo();
					},s);
					function startGo(){
						
						endnum = level - 1;//将等级设置为延时后的值
						
						if(!startOff){
							cb(endnum+1)
							clearInterval(timer);
							count = 0,startOff = true,s = 180;
							return false;
						};
						for(var i=0;i<$list.length;i++){
							$list.eq(i).removeClass('active');
						};
						now++;
						now = now++%$list.length;
						if(now %$list.length == 0) {
							count++;   //计算圈数
						};
						
						$list.eq(now).addClass('active');
						if(count>=1 && count<7){
							clearInterval(timer);
							s *= 0.96;
							timer = setInterval(function(){
								startGo();
							},s);
						};
						if(count>7){
							clearInterval(timer);
							s *= 1.08;
							timer = setInterval(function(){
								startGo();
							},s);
							if(s>260 && (now == endnum)){
								startOff = false;
							};
						};
					};
				};
				
				/*点击中奖纪录*/
				$(".record").click(function(){
					if(oBtn){
						if(resLevel == "0"){
							toast('您还没有中奖纪录',2600);
						}else{
							switch (resLevel){
								case "3":  //50元红包
									$("#mask,.chongzhi").show();
									$(".hongbaoForm").hide();
									$(".hasHongbao").show();
									$(".inaddress").eq(0).hide();
									$(".inaddress").eq(1).show();
									$(".hasNum").html(resData.phone);
									$(".chongzhi").find(".prize").attr("src","images/p_"+resLevel+".png");
								break;
								case "2":  //喜马拉雅耳机
								case "1":  //M6手机
									$("#mask,.shouhuoWrap").show();
									$(".shouhuoWrap").find(".prizeImg").attr("src","images/p_"+resLevel+".png");
									$('.addressInfo').find('.nameInfo').html(resData.name);
									$('.addressInfo').find('.phoneInfo').html(resData.phone);
									$('.addressInfo').find('.addrInfo').html(resData.adrs);
								break;
								
							};	
						};
						
					};
				});
				
				
			}else if(data.st == "3"){
				$(".time").html("0");
				document.onclick = function(){
					toast('活动结束',2600);
				};
			};	
		},
		error:function(jqXHR, textStatus, errorThrown){
			$('#loading').hide();
			if(jqXHR.status == 400){
				toast('参数错误',2600);
			}else if(jqXHR.status == 401){
				toast('权限不足',2600);
			}else if(jqXHR.status == 500){
				toast('服务器繁忙',2600);
			};
			if(textStatus == 'timeout'){
				toast('请求超时',2600);
			}
			document.onclick = function(){
				toast('数据异常',2600);
			};
		}
	});
	
	
	/***********关闭按钮***********/
	$('.close-button').click(function(){
		
		$(this).parent('div').hide();
		$('#mask').hide();
				
		$(".dl").css("WebkitTransform","translateY(0px");
				
		clearInput($(this),'.formNum');
		clearInput($(this),'.formPerson');
		clearInput($(this),'.formAddress');	
		clearInput($(this),'.phoneNum');
	});
	
	/*输入框获取焦点时上移*/
	$('.phoneNum').focus(function(){
		
		$(".chongzhi").css("transform","translate3d(-50%,-70%,0)");	
	}).blur(function(){
		$(".chongzhi").css("transform","translate3d(-50%,-50%,0)");
	});
	
	
	/*点击修改*/
	$('.xiugai').click(function(){
		$('.addressInfo').hide();	
		$('.inAddressWrap').show();
		
		$('.inText').eq(0).val(resData.name);
		$('.inText').eq(1).val(resData.phone);
		$('.inText').eq(2).val(resData.adrs);
		
	});
	var rePhone = /^1[3|5|7|8][0-9]\d{8}$/;
	//只填写手机号点击确定
	$(".phoneCon").click(function(){
		if($(this).val() == ''){
			toast('请输入手机号',2600);
			return;
		}else{
			if(!rePhone.test($(".phoneNum").val())){
				toast('输入正确的手机号格式',2600);
				return;
			}else{
				$.ajax({
					url: '/active/eleven/save.php',
					type: 'POST',
					dataType: 'json',
					timeout:15000,
					data: {
						uid:uid,
						s:s,
						phone:$('.phoneNum').val(),
						type:"save"
					},
					success: function(data,status,code){
						resData = data;
						switch (code.status){
							case 200 :
								if(data.RsMassage == "1"){
									resData = data;
									toast('保存成功',2600);
									$('.close-button').trigger('click');
								}else if(data.RsMassage == "0"){
									toast('保存失败',2600);
									$('.close-button').trigger('click');
								};
							break;
						};	
						$('.load').hide();				
					},
					error:function(jqXHR, textStatus, errorThrown){
						$('.load').hide();
						
						if(jqXHR.status == 400){
							toast('参数错误',2600);
						}else if(jqXHR.status == 401){
							toast('权限不足',2600);
						}else if(jqXHR.status == 500){
							toast('服务器繁忙',2600);
						};
						if(textStatus == 'timeout'){
							toast('请求超时',2600);
						}
					}
				});
			};	
		};
	});
	
	/*点击领取*/
	$('.get').on('click',function(){
		$(this).parent('div').hide();
		$('.inAddressWrap').show();	
	});
	
	/*确认收货*/
	$('.shaddress').find('.addressCon').click(function(){
		var flag = true;
		var mesgArr = ['请输入收货人','请输入联系方式','请输入详细地址'];
		$('.inText').each(function(index,element){
			if($(this).val() == ''){
				toast(mesgArr[index],2600);
				flag =  false;
			};
			if($('.formNum').val() != ''){
				if(!rePhone.test($('.formNum').val())){
					toast('输入正确的手机号格式',2600);
					flag = false;
				};
			};
		});
		if(flag){
			$('.load').show();
			$.ajax({
				url: '/active/eleven/save.php',
				type: 'POST',
				dataType: 'json',
				timeout:15000,
				data: {
					uid:uid,
					s:s,
					name:$('.inText').eq(0).val(),
					phone:$('.inText').eq(1).val(),
					adrs:$('.inText').eq(2).val(),
					type:"save"
				},
				success: function(data,status,code){
					resData = data;
					
					switch (code.status){
						case 200 :
							if(data.RsMassage == "1"){
								resData = data;
								toast('保存成功',2600);
								$('.close-button').trigger('click');
							}else if(data.RsMassage == "0"){
								toast('保存失败',2600);
								$('.close-button').trigger('click');
							};
						break;
					};	
					$('.load').hide();				
				},
				error:function(jqXHR, textStatus, errorThrown){
					$('.load').hide();
					
					if(jqXHR.status == 400){
						toast('参数错误',2600);
					}else if(jqXHR.status == 401){
						toast('权限不足',2600);
					}else if(jqXHR.status == 500){
						toast('服务器繁忙',2600);
					};
					if(textStatus == 'timeout'){
						toast('请求超时',2600);
					}
				}
			});
			
		}
	});
	
	function toast(msg,time){
		var oT = document.getElementById('toast');
		if(!oT){
			var oDiv = document.createElement('div');
			oDiv.className = 'animated-slow fadeIn toast';
			oDiv.id = 'toast';
			oDiv.innerHTML = msg;
			document.body.appendChild(oDiv);
			setTimeout(function(){
				document.body.removeChild(oDiv);	
			},time);	
		};
	};
	
	function clearInput(_this,obj){
		if(_this.parent('div').find(obj).val() != ''){
			_this.parent('div').find(obj).val('');	
		};
	};
	
	function getQueryString(name){
		var qs = location.search.length > 0 ? location.search.substring(1) : '' ,items = qs.length ? qs.split('&') : [] , item = null , i = 0 , len = items.length;	
		for(i=0;i<len;i++){
			item = items[i].split('=');
			if(decodeURIComponent(item[0]) == name){
				return decodeURIComponent(item[1]);
			};
		};
	};
	
});