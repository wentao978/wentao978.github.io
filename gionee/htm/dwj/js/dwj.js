$(document).ready(function(){
	var u = getQueryString('u');
	var s = getQueryString('s');
	
	
	/*端午节活动代码*/
	$("#bg").css({"width":$(window).width(),"height":$(window).height(),"max-width":640});
	
	//检测是不是移动设备
	var isMobile = true;
	var re = /android/gi;
	if(!re.test(navigator.userAgent)){
		isMobile = false;	
	};
	//alert(isMobile);
	//$("body").append("<span style='position:relative'>"+navigator.userAgent+"</span>");
	//出现积分的时候将滚动条设置到最顶端
    $('body,html').scrollTop(0);
	
	loadImg();
	function loadImg() {
		var oLoading = document.getElementById('loading');
		var imgArr = ['images/topPic.png','images/loading.gif','images/nav.png','images/game.png','images/gp.png','images/7.png','images/qian.png','images/wen.png','images/yi.png'];
		var num = 0;		
		for(var i=0;i<imgArr.length;i++){
			var Img = new Image();
			Img.src = imgArr[i];
			Img.onload = function(){
				num++;
				if(num == imgArr.length){
					oLoading.style.display = 'none';
				};
			};
			Img.onerror = function(){
				oLoading.style.display = 'none';
			};
		};
	};
		
	$.ajax({
		url: 'http://10.8.8.158:8080/active/dwj/dwj.php',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		data:{
			u:u,
			s:s,
			type:"query"
		},
		success: function(data){
			resData = data;
			resLevel = data.level;
			resCode = data.code;
			resNumber = data.number;
			if(data.code){
				$("#copy").attr("data-clipboard-text",data.code);
			};
			loadImg();
			function loadImg() {
				var oLoading = document.getElementById('loading');
				var imgArr = ['images/topPic.png','images/loading.gif','images/nav.png','images/game.png','images/gp.png','images/7.png','images/qian.png','images/wen.png','images/yi.png'];
				var num = 0;		
				for(var i=0;i<imgArr.length;i++){
					var Img = new Image();
					Img.src = imgArr[i];
					Img.onload = function(){
						num++;
						if(num == imgArr.length){
							oLoading.style.display = 'none';
						};
					};
					Img.onerror = function(){
						oLoading.style.display = 'none';
					};
				};
			};
		
			if(data.st == "1"){
				document.onclick = function(){
					toast('活动未开始',2600);
				};
			}else if(data.st == "3"){  //活动正常
				
				
			}else if(data.st == "2"){
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
	
	
	
	/*canvas代码*/
	
	var oW = $("#c1").width();
	var oH = oW * 309/833;         
	var oImg = new Image();
	oImg.src = "images/7.png";
	var jinzhi = 0;
	
	var oImg4 = new Image();
	oImg4.src = "images/4.png";
	var oImg5 = new Image();
	oImg5.src = "images/5.png";
	var oImg6 = new Image();
	oImg6.src = "images/6.png";
	var oImg7 = new Image();
	oImg7.src = "images/7.png";
	
	oImg.onload = function(){
		
			
		var img = new Image();   
		img.src = 'images/50.jpg';     
		 
		var oC = document.getElementById('c1');         
		var oGc = oC.getContext('2d');   
		
		oC.width = oW;             
		oC.height = oH; 
		
		img.onload = function(){
		
			var w = oW, h = oH;             
			var offsetX = oC.offsetLeft, offsetY = oC.offsetTop;                          
									 
			oC.width=w;             
			oC.height=h;             
			oC.style.backgroundImage='url('+img.src+')'; 
			oC.style.backgroundSize='cover';  
			oGc.shadowBlur = '3';
			oGc.shadowColor = 'white';
			
			oGc.drawImage(oImg,0,0,833,309,0,0,oW,oH);
						  
			oGc.globalCompositeOperation = 'destination-out';               
			
			
			var times = 1;
			var oT = false;	
			var mousedown = false;
			
			function eventDown(ev){                 
				ev.preventDefault();                 
				mousedown = true;
				if(times){
					var x = ev.clientX || ev.changedTouches[0].pageX;
               		var y = ev.clientY || ev.changedTouches[0].pageY;
					oGc.beginPath();
					oGc.moveTo(x - oC.getBoundingClientRect().left,y - oC.offsetTop - $(".gpWrap").offset().top + (isMobile ? 0 : $(document).scrollTop()));
				}else{
					alert("没机会了");
					removeEvent(ev);	
				};            
			};   
			function eventUp(ev){               
				ev.preventDefault();                 
				mousedown = false;
				jinzhi = 1;
				var data=oGc.getImageData(0,0,w,h).data;
				for(var i=0,j=0;i<data.length;i+=4){
					if(data[i] && data[i+1] && data[i+2] && data[i+3]){
						j++;
					}
				}
				if((j<=w*h*0.9)){
					//j是剩余面积数
					// 剩余90%面积提示信息
					//$("#test").html("恭喜您，中奖啦！");
					//$("#test").attr("data-rel","false");
					//alert("刮开面积大于10%，次数减一");
					oT = true;
					if(oT){
						//times--;
					};
																	
					var iNow = 0;	
					var timer = null;			
					timer = setInterval(function(){
						if(iNow < 4){
							
							var oImger = new Image();						
							oImger.src = "images/"+(iNow+4)+".png";	

							oImger.onload = function(){
								oGc.drawImage(this,0,0,833,309,0,0,oW,oH);
								
								document.title = iNow;											
								iNow++;	
							};									
						}else{
							clearInterval(timer);
							var w = oW, h = oH;             
							
							oC.width=w;             
							oC.height=h;             
							
							oGc.drawImage(oImg,0,0,833,309,0,0,oW,oH);
							//document.getElementById("div1").innerHTML = iNow;			  
							oGc.globalCompositeOperation = 'destination-out'; 
							
							//重置canvas之后，在这里弹出框...
							console.log("***");
						};
					},80);	
					
				};             
			};               
			function eventMove(ev){              
				ev.preventDefault();                 
				if(mousedown){                     
					var x = ev.clientX || ev.changedTouches[0].pageX;
               		var y = ev.clientY || ev.changedTouches[0].pageY;
					//var ev = ev.targetTouches[0];
					oGc.lineTo(x - oC.getBoundingClientRect().left,y - oC.offsetTop - $(".gpWrap").offset().top + (isMobile ? 0 : $(document).scrollTop()));
					oGc.lineWidth = "15";
					oGc.lineCap = 'round';
					oGc.stroke();					
					//阻止页面的滚动
					jinzhi=0;						
					if(jinzhi==0){
						ev.preventDefault();
						ev.stopPropagation();
					};				
				};             
			}; 
						
			function removeEvent(ev){
				ev.preventDefault();
				//抬起的时候执行eventUp的事件
				eventUp(ev);
                oC.removeEventListener('mousemove',eventMove,false);
                oC.removeEventListener('touchmove',eventMove,false);
                oC.removeEventListener('mouseup',removeEvent,false);
                oC.removeEventListener('touchend',removeEvent,false);
            };
			
            function startMove(ev){
                ev.preventDefault();
				//按下的时候执行eventDown的事件
				eventDown(ev);
                oC.addEventListener('mousemove',eventMove,false);
                oC.addEventListener('touchmove',eventMove,false);
                document.addEventListener('mouseup',removeEvent,false);
                document.addEventListener('touchend',removeEvent,false)
            };

			oC.addEventListener('mousedown',startMove);
			oC.addEventListener('touchstart',startMove);
						
			
				
		};
		
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*var resData;
	var resLevel;
	var resCode;
	var resNumber;
	
	转动代码*/
	/*var oStart = $(".start");
	var oZhuan = $(".zhuan");
	var numTurn = 10;
	var iSpeed = 0;
	var iCur = 0;
	var oBtn = true;
	var timer = null;
	var aDatas = [
					{"deg" : 22, "data" : "M5+"},
					{"deg" : 67, "data" : "电子书阅读器"},
					{"deg" : 112,"data" : "台灯"},
					{"deg" : 157,"data" : "200阅饼卷"},
					{"deg" : 202,"data" : "电子书阅读器"},
					{"deg" : 247,"data" : "500阅饼卷"},
					{"deg" : 292,"data" : "再接再厉"},
					{"deg" : 337,"data" : "100阅饼卷"}
				];
	
	*/
	
	/*点击复制*/
	var copy = document.getElementById('copy');
    var clipboard = new Clipboard(copy);

    clipboard.on('success', function(e) {
		toast('复制成功',2600);
    });

    clipboard.on('error', function(e) {
       toast('复制失败',2600);
    });

	
	/***********关闭按钮***********/
	$('.close-button').click(function(){
		
		$(this).parent('div').hide();
		$('#mask').hide();
		
		if(parseInt(resNumber) >= 3){
			setScrollTop();	
		};
		
		clearInput($(this),'.formNum');
		clearInput($(this),'.formPerson');
		clearInput($(this),'.formAddress');	
		
	});
	
	/*点击修改*/
	$('.xiugai').click(function(){
		$('.addressInfo').hide();	
		$('.inAddressWrap').show();
		
		$('.inText').eq(0).val(resData.name);
		$('.inText').eq(1).val(resData.phone);
		$('.inText').eq(2).val(resData.address);
		
	});
	/*
	$(document).on("scroll",function(){
		if( $(window).scrollTop() > $(".booklist:eq(4)").offset().top - $(window).height() ){
			$("#down").stop(true,false).animate({textIndent:0},{step: function(now,fx){
				$(this).css('-webkit-transform','translateX(-100%)'); 
			},duration:'slow'},'linear');
		}else{
			$("#down").stop(true,false).animate({textIndent:0},{step: function(now,fx){ 
				$(this).css('-webkit-transform','translateX(0%)'); 
			},duration:'slow'},'linear');
		};
	});*/
	
	/*点击领取*/
	$('.get').on('click',function(){
		$(this).parent('div').hide();
		$('.inAddressWrap').show();	
	});
	
	/*确认收货*/
	var rePhone = /^\d{11}$/;
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
				url: 'http://10.8.8.141/game/getRead.do',
				type: 'POST',
				dataType: 'jsonp',
				jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
				jsonpCallback:"callback3",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				timeout:15000,
				data: {
					u:u,
					s:s,
					n:$('.inText').eq(0).val(),
					ph:$('.inText').eq(1).val(),
					a:$('.inText').eq(2).val(),
					type:"save"
				},
				success: function(data,status,code){
					resData = data;
					if(parseInt(resNumber) >= 3){
						setScrollTop();	
					};
					
					switch (code.status){
						case 200 :
							if(data.status == "1"){
								resData = data;
								toast('保存成功',2600);
								$('.close-button').trigger('click');
							}else if(data.status == "0"){
								toast('保存失败',2600);
								$('.close-button').trigger('click');
							};
						break;
					};	
					$('.load').hide();				
				},
				error:function(jqXHR, textStatus, errorThrown){
					$('.load').hide();
					
					if(parseInt(resNumber) >= 3){
						setScrollTop();	
					};
					
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
	
	//只有手机号的情况
	var rePhone = /^\d{11}$/;
	$('.phoneCon').click(function(){
		if(!rePhone.test($('.phoneNum').val())){
			toast('请输入正确的手机号码',2600);
			return;
		}else{
			usePhoneNum = $('.phoneNum').val();
			$('.load').show();
			$.ajax({
				url: '/lockimage/updateAddr.do',
				type: 'POST',
				dataType: 'json',
				timeout:15000,
				data: {
					u:u,
					s:s,
					ri:hongbaoId,
					n:'1',
					ph:$('.phoneNum').val(),
					d:'1',
					a:'1',
					pc:'100000'
				},
				success: function(data,status,code){
					switch (code.status){
						case 200 :
							if(data.s == 1){
								toast('保存成功',2600);
								$('.close-button').trigger('click');
								
								yesHb = true;
							}else if(data.s == 0){
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
					}else if(jqXHR.status == 500){
						toast('服务器繁忙',2600);
					};
					if(textStatus == 'timeout'){
						toast('请求超时',2600);
					}
				}
			});	
		};	
	});
	
	//requestAnimationFrame方法
	(function() {
		var lastTime = 0;
		var vendors = ["ms", "moz", "webkit", "o"];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
			window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
			window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
		};
		if(!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element){
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function(){
				callback(currTime + timeToCall);
			},timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
		if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}());
	
	function setScrollTop(){
		var scroll_top = document.querySelector(".bookText").offsetTop;
		document.documentElement.scrollTop = scroll_top;
		window.pageYOffset = scroll_top;
		document.body.scrollTop = scroll_top;
	};
	
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