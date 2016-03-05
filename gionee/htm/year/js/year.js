$(document).ready(function(){
	var u = getQueryString('u');
	var s = getQueryString('s');
	var data = {};
	var datas;
	var Index;
	var dataInfo = {};
	var recordId;
	var today;
	var hongbaoId;
	var imagesArr = [];
	var hasToday = false;
	var n ;
	var closer = false;
	var bBtn = true;
	var hB = false;
	var yesHb = true;
	var dRi ;
	var dId ;
	var usePhoneNum = '';
	$.ajax({
		url: '/lockimage/getDays.do',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		data:{
			u:u,
			s:s
		},
		success: function(response){
			data = response;
			datas = data.datas;
			var prizeHtml = '';
			for(var i = 0; i<data.msgs.length;i++){
				prizeHtml += '<li><span>'+data.msgs[i].n+'</span>&nbsp;获得<span>'+data.msgs[i].pn+'</span>一个</li>';
			}
			$('#scrollDiv').find('ul').html(prizeHtml);
			
			n = data.n; //从服务端获取今天是第几天
			if(n<1){
				$(document).on('click',function(){
					toast('活动还没开始',2600);	
				});
			}else if(n>8){
				$(document).on('click',function(){
					toast('抱歉，活动结束',2600);	
				});	
			}else{
				/***********设置遮罩的高度***********/
				var oMh;
				var oIm = new Image();
				oIm.src = 'images/base.jpg';
				oIm.onload = function(){
					oMh = $(document).height() > $(window).height() ? $(document).height() : $(window).height();	
					$('#mask').css('height',oMh);
				};
				oIm.onerror = function(){
					oMh = $(document).height() > $(window).height() ? $(document).height() : $(window).height();	
					$('#mask').css('height',oMh);
				};
				/***********关闭按钮***********/
				$('.close-button').click(function(){
					
					
					if(today){
						$(this).parent('div').hide();
						$(this).parent('div').find('.prize').attr('src','');
						$('#mask').hide();	
						if(!sing.paused || sing.paused){
							sing.pause();
							$('.music').find('.sing').attr('src','');
							pBtn.css('left','0');
							inDiv.css('width','0');
							play.attr('src','images/play.png');
						};
						clearInput($(this),'.phoneNum');
						clearInput($(this),'.formNum');
						clearInput($(this),'.formPerson');
						clearInput($(this),'.formArea');
						clearInput($(this),'.formAddress');
						
						
						if(bBtn){
							$('.appleDiv').eq(n-1).find('img').removeClass('dApple')
							$('.appleDiv').eq(n-1).css({'transform':'scale(0)','transition':'0.5s'});
							
							setTimeout(function(){
								$('.appleDiv').eq(n-1).css({'transform':'scale(0.75)','transition':'0.5s'});
								$('.appleDiv').eq(n-1).find('img').attr('src','images/day'+n+'/littleapple/apple'+(n)+'-gray.png');	
								$('.chatDiv').hide();
							},500);
							bBtn = false;
						}
						
						
						
						if(closer){
							$('.jdk').show();
							$('#mask').show()
							$('.jdk').find('.prize').attr('src','images/'+today.pi+'.png');
							$('.jdk').find('.close-button').click(function(){
								$(this).parent('div').hide();
								$('#mask').hide()	
							});
							
							if(hasToday){//中实物直接点取消
								$('.jdk').hide();
								$('.jdk').find('.prize').attr('src','');
								$('#mask').hide();
								
								$('.appleDiv').eq(n-1).find('img').removeClass('dApple')
								$('.appleDiv').eq(n-1).css({'transform':'scale(0)','transition':'0.5s'});
								
								setTimeout(function(){
									$('.appleDiv').eq(n-1).css({'transform':'scale(0.75)','transition':'0.5s'});
									$('.appleDiv').eq(n-1).find('img').attr('src','images/day'+n+'/littleapple/apple'+(n)+'-gray.png');	
									$('.chatDiv').hide();
								},500);
								bBtn = false;
							};
							
						}else{ 
							
							
						}
						
						
					}else{
						$(this).parent('div').hide();
						$(this).parent('div').find('.prize').attr('src','');
						$('#mask').hide();	
						if(!sing.paused || sing.paused){
							sing.pause();
							$('.music').find('.sing').attr('src','');
							pBtn.css('left','0');
							inDiv.css('width','0');
							play.attr('src','images/play.png');
						};
						clearInput($(this),'.phoneNum');
						clearInput($(this),'.formNum');
						clearInput($(this),'.formPerson');
						clearInput($(this),'.formArea');
						clearInput($(this),'.formAddress');	
					}
					
					
					
				});
				/************音乐***********/
				var sing = $('.sing').get(0);
				var play = $('.play');
				var slideWrap = $('.slideWrap');
				var inDiv = $('.inDiv');
				var pBtn = $('.pbtn');
				play.click(function(){
					if(sing.paused){
						sing.play();
						play.attr('src','images/pause.png');
					}else{
						sing.pause();
						play.attr('src','images/play.png');
					};	
				});
				setInterval(function(){
					var Left = (parseInt(sing.currentTime)/parseInt(sing.duration))*(slideWrap.outerWidth() - pBtn.outerWidth());
					pBtn.css('left',Left);
					inDiv.css('width',Left+pBtn.outerWidth());
					if( parseInt(sing.currentTime) == parseInt(sing.duration) ){
						play.attr('src','images/play.png');
					};
				},1000);
				var disX;
				pBtn.on('touchstart',function(d){
					var This = $(this);
					var e = d.originalEvent.changedTouches[0];
					disX = e.clientX - pBtn.position().left;
					$(this).on('touchmove.drag',function(d){
						var e = d.originalEvent.changedTouches[0];
						var L = e.clientX - disX;
						if(L < 0){
							L = 0;
						}else if(L > slideWrap.outerWidth() - pBtn.outerWidth()){
							L = slideWrap.outerWidth() - pBtn.outerWidth();
						};
						pBtn.css('left',L);
						inDiv.css('width',L+pBtn.outerWidth());
						var scale = L /	(slideWrap.outerWidth() - pBtn.outerWidth());
						sing.currentTime = scale * parseInt(sing.duration);
					});
					$(this).on('touchend.drag',function(){
						$(this).off('.drag')
					});	
				});
				/*左下角滚动*/
				var oUl = $('#scrollDiv').find('ul');
				var aLi = oUl.children('li');
				var H = aLi.eq(0).height();
				var iNow = 0;
				var iNow2 = 0;
				setInterval(function(){
					if(iNow == 0){
						aLi.eq(0).css('position','static');
						oUl.css('top','0');
						iNow2 = 0;
					};
					if(iNow == aLi.length -1 ){
						iNow = 0;
						aLi.eq(0).css('position','relative').css('top',aLi.length*H);
					}else{
						iNow++;
					};
					iNow2++;
					oUl.animate({top:-H*iNow2}, 1000);
				}, 4000);
				/*根据不同的天显示不同的苹果*/
				var d = n;  //第几天
				
				//var jdUrl = ['http://coupon.m.jd.com/coupons/show.action?key=79bb2beaa6174f0480265e73c629cd93&roleId=2256306&to=sale.jd.com/act/e27kefanpv.html','http://coupon.m.jd.com/coupons/show.action?key=374936e13c154985a45ee9128e27ad86&roleId=2256311&to=sale.jd.com/act/e27kefanpv.html','http://coupon.m.jd.com/coupons/show.action?key=f7df656974014517a86fec13579c5273&roleId=2256313'];
				//var jdText = ['金立年货节优惠券<br>999-50','金立年货节优惠券<br>1999-100','金立年货节优惠券<br>2999-150'];
				var tdayPosition = [{"left":"5em","top":"10.6em"},{"left":"8.1em","top":"7.5em"},{"left":"11em","top":"11.3em"},{"left":"5.06em","top":"7.17em"},{"left":"2.6em","top":"8.6em"},{"left":"8em","top":"11em"},{"left":"2.68em","top":"11em"},{"left":"10.6em","top":"8.8em"}];
				var chatPosition = [{"left":"4.4em","top":"13.5em"},{"left":"6.6em","top":"10.2em"},{"left":"9.6em","top":"14em"},{"left":"7.18em","top":"9.83em"},{"left":"5em","top":"11em"},{"left":"10em","top":"13.8em"},{"left":"5em","top":"13.6em"},{"left":"12.6em","top":"11.8em"}];
				$('.qiqiu').each(function(index,element){
					$(this).find('img').attr('src','images/day'+d+'/q'+(index+1)+'.png');
					imagesArr.push('images/day'+d+'/q'+(index+1)+'.png');
				});
				$('.appleDiv').each(function(index,element){
					var This = $(this);
					$(this).find('img').attr('src','images/day'+d+'/littleapple/apple'+(index+1)+'.png');
					imagesArr.push('images/day'+d+'/littleapple/apple'+(index+1)+'.png');
					if(index == n-1){
						$(this).find('img').addClass('dApple');
						$(this).css({"width":"3.11em","z-index":"7","left":tdayPosition[d-1].left,"top":tdayPosition[d-1].top});
					};
					$('.chatDiv').find('img').attr('src','images/day'+n+'/chat.png');
					$('.chatDiv').css({left:chatPosition[d-1].left,top:chatPosition[d-1].top});
				});
				if(datas[d-1].s == 1){
					$('.appleDiv').eq(d-1).css({'transform':'scale(0.75)','transition':'0s'});
					$('.appleDiv').eq(d-1).find('img').removeClass('dApple').attr('src','images/day'+d+'/littleapple/apple'+(d)+'-gray.png');	
					$('.chatDiv').hide();
				};
				$('.appleDiv').each(function(index,element){  //点击的时候
					var This = $(this);
					This.find('.img').click(function(){
						Index = $(this).index('.appleImg');  //根据图片的index去找对应的数据  ---非今天
						
						switch (datas[Index].s) {
							case 1 :
								switch (datas[Index].pi){
									case 0 :  //音乐
										var tns = datas[Index].pn.split(',');
										$('.music').show();
										$('#mask').show();
										$('.music').find('.sing').attr('autoPlay','autoPlay').attr('src',datas[Index].pd);							
										if(sing.paused){
											sing.play();
											play.attr('src','images/pause.png');
										};
										$('.music').find('.prize').attr('src','images/'+datas[Index].pi+'.png');
										$('.music').find('.musicName').html(tns[0]);
										$('.music').find('.songerName').html(tns[1]);
									break;
									case 1 :  //福字，财神，豪车
									case 2 :
									case 3 :
										$('.static').show();
										$('#mask').show();
										$('.static').find('.prize').attr('src','images/'+datas[Index].pi+'.png');
									break;
									case 4 :  //大众点评优惠券
										reInCard('.dazhong');
									break;
									case 5 :  //格瓦拉电影票
										reInCard('.gewala');
									break;
									case 6 :  //蚂蜂窝优惠券
										reInCard('.mafengwo');
									break;
									case 7 :  //魔鬼猫优惠券
										reInCard('.moguimao');
									break;
									case 8 :  //鲜生活的优惠券
										reInCard('.xianshenghuo');
									break;
									case 9 :  //京东优惠券
										$('.jingdong').show();
										$('#mask').show();
										$('.jingdong').find('.prize').attr('src','images/'+datas[Index].pi+'.png');
										$('.jingdong').find('.text').html('<a href="'+datas[Index].pd+'" target="_blank">请戳此链接</a>');
										//$('.jingdong').find('.text').html(jdText[datas[Index].ri-1]);
										//$('.jingdong').find('.jdlianjie').attr('href',datas[Index].pd);
									break;
									case 10 :  //魔鬼猫公仔，CD，手机支架，M5P，耳机，京东卡100
									case 11 :
									case 12 :	
									case 13 :
									case 14 :
									case 17 :
										$('.addressInfo').show();
										$('#mask').show();
										$('.load').show();
										dRi = datas[Index].ri;
										$.ajax({
											url: '/lockimage/getAddr.do',
											type: 'GET',
											dataType: 'json',
											timeout:15000,
											data:{
												u:u,
												s:s,
												ri:datas[Index].ri	
											},
											success: function(data){
												dataInfo = data;
												recordId = datas[Index].ri;
												$('.addressInfo').find('.prizeImg').attr('src','images/'+datas[Index].pi+'.png').css({'width':'60%','margin':'0 20%'});
												$('.addressInfo').find('.nameInfo').html(dataInfo.n);
												$('.addressInfo').find('.phoneInfo').html(dataInfo.ph);
												$('.addressInfo').find('.areaInfo').html(dataInfo.d);
												$('.addressInfo').find('.addrInfo').html(dataInfo.a);
												$('.addressInfo').find('.douhao').show();
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
									break;
									case 15 :
										$('.xianjin').show();
										$('.xianjin').find('.prize').attr('src','images/'+datas[Index].pi+'.png');
										$('#mask').show();
										
										
										
										$('.xianjin').find('.hongbaoForm').hide();
										$('.xianjin').find('.hasHongbao').show();
										$('.xianjin').find('.inaddress').eq(1).show();
										$('.xianjin').find('.inaddress').eq(0).hide();
										$('.xianjin').find('.hasNum').html(datas[Index].ph);
									
											
																		
									break;
									case 16 :
										$('.xianjin').show();
										$('.xianjin').find('.prize').attr('src','images/'+datas[Index].pi+'.png');
										$('#mask').show();
										
										
										$('.xianjin').find('.hongbaoForm').hide();
										$('.xianjin').find('.hasHongbao').show();
										$('.xianjin').find('.inaddress').eq(1).show();
										$('.xianjin').find('.inaddress').eq(0).hide();
										$('.xianjin').find('.hasNum').html(datas[Index].ph);
										
									break;	
								};
							
							break;
							case 2 :
								if($('.tomorrow').css('display') == 'block'){
									$('.tomorrow').css('display','none');
								};
								$('.date').stop(true,false).fadeIn('1000',function(){
									setTimeout(function(){
										$('.date').fadeOut('1000');	
									},1500);
								});
							break;
							case 3 :
								if($('.date').css('display') == 'block'){
									$('.date').css('display','none');
								};
								$('.tomorrow').stop(true,false).fadeIn('1000',function(){
									setTimeout(function(){
										$('.tomorrow').fadeOut('1000');	
									},1500);
								});
							break;	
						}
						
						
						//datas[Index].s == 0 今天未抽奖 1 已中奖  ---点击今天发送一个请求
						
						
						if( (datas[Index].s == 0) && today){   //点击过一次--再次点击
							switch (today.pi){
								case 0 :  //音乐
									var tns = today.pn.split(',');
									$('.music').show();
									$('#mask').show();
									$('.music').find('.sing').attr('autoPlay','autoPlay').attr('src',today.pd);							
									if(sing.paused){
										sing.play();
										play.attr('src','images/pause.png');
									};
									$('.music').find('.prize').attr('src','images/'+today.pi+'.png');
									$('.music').find('.musicName').html(tns[0]);
									$('.music').find('.songerName').html(tns[1]);
								break;
								case 1 :  //福字，财神，豪车
								case 2 :
								case 3 :
									$('.static').show();
									$('#mask').show();
									$('.static').find('.prize').attr('src','images/'+today.pi+'.png');
								break;
								case 4 :  //大众点评优惠券
									//reInCard('.dazhong');
									$('.dazhong').show();
									$('#mask').show();
									$('.dazhong').find('.prize').attr('src','images/'+today.pi+'.png')
									$('.dazhong').find('.text').html(today.pd);
								break;
								case 5 :  //格瓦拉电影票
									//reInCard('.gewala');
									$('.gewala').show();
									$('#mask').show();
									$('.gewala').find('.prize').attr('src','images/'+today.pi+'.png')
									$('.gewala').find('.text').html(today.pd);
								break;
								case 6 :  //蚂蜂窝优惠券
									//reInCard('.mafengwo');
									$('.mafengwo').show();
									$('#mask').show();
									$('.mafengwo').find('.prize').attr('src','images/'+today.pi+'.png')
									$('.mafengwo').find('.text').html(today.pd);
								break;
								case 7 :  //魔鬼猫优惠券
									//reInCard('.moguimao');
									$('.moguimao').show();
									$('#mask').show();
									$('.moguimao').find('.prize').attr('src','images/'+today.pi+'.png')
									$('.moguimao').find('.text').html(today.pd);
								break;
								case 8 :  //鲜生活的优惠券
									//reInCard('.xianshenghuo');
									$('.xianshenghuo').show();
									$('#mask').show();
									$('.xianshenghuo').find('.prize').attr('src','images/'+today.pi+'.png')
									$('.xianshenghuo').find('.text').html(today.pd);
								break;
								case 9 :  //京东优惠券
									$('.jingdong').show();
									$('#mask').show();
									//$('.jingdong').find('.prize').attr('src','images/'+today.pi+'.png');
									$('.jingdong').find('.prize').attr('src','images/'+today.pi+'.png');
									$('.jingdong').find('.text').html('<a href="'+today.pd+'" target="_blank">请戳此链接</a>');
									//$('.jingdong').find('.text').html(jdText[today.ri-1]);
									//$('.jingdong').find('.jdlianjie').attr('href',today.pd);
								break;
								
								case 15 :
									$('.xianjin').show();
									$('.xianjin').find('.prize').attr('src','images/'+today.pi+'.png');
									$('#mask').show();
									hongbaoId = today.ri;
									if(yesHb){  //填写了
										$('.xianjin').find('.hongbaoForm').hide();
										$('.xianjin').find('.hasHongbao').show();
										$('.xianjin').find('.inaddress').eq(1).show();
										$('.xianjin').find('.inaddress').eq(0).hide();
										$('.xianjin').find('.hasNum').html(usePhoneNum);
									}else{                //没填
										$('.xianjin').find('.hongbaoForm').show();
										$('.xianjin').find('.hasHongbao').hide();
										$('.xianjin').find('.inaddress').eq(0).show();
										$('.xianjin').find('.inaddress').eq(1).hide();
									};								
								break;
								case 16 :
									$('.xianjin').show();
									$('.xianjin').find('.prize').attr('src','images/'+today.pi+'.png');
									$('#mask').show();
									hongbaoId = today.ri;
									if(yesHb){  //填写了
										$('.xianjin').find('.hongbaoForm').hide();
										$('.xianjin').find('.hasHongbao').show();
										$('.xianjin').find('.inaddress').eq(1).show();
										$('.xianjin').find('.inaddress').eq(0).hide();
										$('.xianjin').find('.hasNum').html(usePhoneNum);
									}else{  			  //没填
										$('.xianjin').find('.hongbaoForm').show();
										$('.xianjin').find('.hasHongbao').hide();
										$('.xianjin').find('.inaddress').eq(0).show();
										$('.xianjin').find('.inaddress').eq(1).hide();
									};
								break;
								
								case 10 :  //魔鬼猫公仔，CD，手机支架，M5P，耳机，京东卡100
								case 11 :
								case 12 :	
								case 13 :
								case 14 :
								case 17 :
									
									//today---出现中奖信息  
									
									if(!hasToday){  //中奖并出现中奖需要填写
										$('.jdk').show();
										$('#mask').show()
										$('.jdk').find('.prize').attr('src','images/'+today.pi+'.png');
										hasToday = true;
										closer = true;
									}else{         //填写结束--出现填写结果
										$('.addressInfo').show();
										$('#mask').show();
										closer = false;
										$('.load').show();
										$.ajax({
											url: '/lockimage/getAddr.do',
											type: 'GET',
											dataType: 'json',
											timeout:15000,
											data:{
												u:u,
												s:s,
												ri:today.ri	
											},
											success: function(data){
												dataInfo = data;
												recordId = today.ri;
												$('.addressInfo').find('.prizeImg').attr('src','images/'+today.pi+'.png').css({'width':'60%','margin':'0 20%'});
												$('.addressInfo').find('.nameInfo').html(dataInfo.n);
												$('.addressInfo').find('.phoneInfo').html(dataInfo.ph);
												$('.addressInfo').find('.areaInfo').html(dataInfo.d);
												$('.addressInfo').find('.addrInfo').html(dataInfo.a);
												$('.addressInfo').find('.douhao').show();
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
																		
								break;
								
							};
							
							
						}
						
						
						if($(this).hasClass('dApple')){          //今天 
							//发送ajax请求
							
							$('.load').show();
							$.ajax({   //没有点击  --点击抽奖
								url: '/lockimage/prize.do',
								type: 'POST',
								timeout:15000,
								dataType: 'json',
								data: {
									u:u,
									s:s
								},
								success: function(data,status,code){
									$('.load').hide();
									today = data;
									console.log(data);
									switch (code.status){
										case 200 :
											switch (today.pi){
												case 0 :  //音乐
													var tns = today.pn.split(',');
													$('.music').show();
													$('#mask').show();
													$('.music').find('.sing').attr('autoPlay','autoPlay').attr('src',today.pd);							
													if(sing.paused){
														sing.play();
														play.attr('src','images/pause.png');
													};
													$('.music').find('.prize').attr('src','images/'+today.pi+'.png');
													$('.music').find('.musicName').html(tns[0]);
													$('.music').find('.songerName').html(tns[1]);
												break;
												case 1 :  //福字，财神，豪车
												case 2 :
												case 3 :
													$('.static').show();
													$('#mask').show();
													$('.static').find('.prize').attr('src','images/'+today.pi+'.png');
												break;
												case 4 :  //大众点评优惠券
													//reInCard('.dazhong');
													$('.dazhong').show();
													$('#mask').show();
													$('.dazhong').find('.prize').attr('src','images/'+today.pi+'.png')
													$('.dazhong').find('.text').html(today.pd);
												break;
												case 5 :  //格瓦拉电影票
													//reInCard('.gewala');
													$('.gewala').show();
													$('#mask').show();
													$('.gewala').find('.prize').attr('src','images/'+today.pi+'.png')
													$('.gewala').find('.text').html(today.pd);
												break;
												case 6 :  //蚂蜂窝优惠券
													//reInCard('.mafengwo');
													$('.mafengwo').show();
													$('#mask').show();
													$('.mafengwo').find('.prize').attr('src','images/'+today.pi+'.png')
													$('.mafengwo').find('.text').html(today.pd);
												break;
												case 7 :  //魔鬼猫优惠券
													//reInCard('.moguimao');
													$('.moguimao').show();
													$('#mask').show();
													$('.moguimao').find('.prize').attr('src','images/'+today.pi+'.png')
													$('.moguimao').find('.text').html(today.pd);
												break;
												case 8 :  //鲜生活的优惠券
													//reInCard('.xianshenghuo');
													$('.xianshenghuo').show();
													$('#mask').show();
													$('.xianshenghuo').find('.prize').attr('src','images/'+today.pi+'.png')
													$('.xianshenghuo').find('.text').html(today.pd);
												break;
												case 9 :  //京东优惠券
													$('.jingdong').show();
													$('#mask').show();
													//$('.jingdong').find('.prize').attr('src','images/'+today.pi+'.png');
													$('.jingdong').find('.prize').attr('src','images/'+today.pi+'.png');
													$('.jingdong').find('.text').html('<a href="'+today.pd+'" target="_blank">请戳此链接</a>');
													//$('.jingdong').find('.text').html(jdText[today.ri-1]);
													//$('.jingdong').find('.jdlianjie').attr('href',today.pd);
												break;
												case 10 :  //魔鬼猫公仔，CD，手机支架，M5P，耳机，京东卡100
												case 11 :
												case 12 :	
												case 13 :
												case 14 :
												case 17 :
													
													//today---出现中奖信息  
													dId = today.ri;
													if(!hasToday){
														$('.jdk').show();
														$('#mask').show()
														$('.jdk').find('.prize').attr('src','images/'+today.pi+'.png');
														hasToday = true;
														closer = true;
													}else{
														closer = false;
														$('.addressInfo').show();
														$('#mask').show();
														$('.load').show();
														$.ajax({
															url: '/lockimage/getAddr.do',
															type: 'GET',
															dataType: 'json',
															timeout:15000,
															data:{
																u:u,
																s:s,
																ri:today.ri	
															},
															success: function(data){
																dataInfo = data;
																recordId = today.ri;
																$('.addressInfo').find('.prizeImg').attr('src','images/'+today.pi+'.png').css({'width':'60%','margin':'0 20%'});
																$('.addressInfo').find('.nameInfo').html(dataInfo.n);
																$('.addressInfo').find('.phoneInfo').html(dataInfo.ph);
																$('.addressInfo').find('.areaInfo').html(dataInfo.d);
																$('.addressInfo').find('.addrInfo').html(dataInfo.a);
																$('.addressInfo').find('.douhao').show();
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
													
												break;
												case 15 :
													$('.xianjin').show();
													$('.xianjin').find('.prize').attr('src','images/'+today.pi+'.png');
													$('#mask').show();
													hongbaoId = today.ri;
													hB = true;
													
													
													$('.xianjin').find('.hongbaoForm').show();
													$('.xianjin').find('.hasHongbao').hide();
													$('.xianjin').find('.inaddress').eq(0).show();
													$('.xianjin').find('.inaddress').eq(1).hide();
													yesHb = false;
													
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
																					
												break;
												case 16 :
													$('.xianjin').show();
													$('.xianjin').find('.prize').attr('src','images/'+today.pi+'.png');
													$('#mask').show();
													hongbaoId = today.ri;
													hB = true;
													
													$('.xianjin').find('.hongbaoForm').show();
													$('.xianjin').find('.hasHongbao').hide();
													$('.xianjin').find('.inaddress').eq(0).show();
													$('.xianjin').find('.inaddress').eq(1).hide();
													yesHb = false;
													
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
																				$('.xianjin').hide();
																				$('#mask').hide();
																				
																				yesHb = true;
																			}else if(data.s == 0){
																				toast('保存失败',2600);
																				$('.xianjin').hide();
																				$('#mask').hide();
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
													
													
												break;
											};
											
										break;
											
									};
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
							
							if(datas[Index].s == 0 ){
								if(today){
									$(this).attr('src','images/day'+d+'/littleapple/apple'+(index+1)+'-gray.png');	
									$('.chatDiv').hide();		
								}else{
									imagesArr.push('images/day'+d+'/littleapple/apple'+(index+1)+'-gray.png');
								}
								
								
							}else if(datas[Index].s == 1){
								$(this).attr('src','images/day'+d+'/littleapple/apple'+(index+1)+'-gray.png');	
								$('.chatDiv').hide();	
							}
						};
						
					});
				});	
			};
			imagesArr.push('images/day'+n+'/chat.png');
			imagesArr.push('images/base.jpg');
			imagesArr.push('images/boy.png');
			imagesArr.push('images/sownman.png');
			imagesArr.push('images/sidai.png');
			imagesArr.push('images/sidai1.png');
			imagesArr.push('images/sidai2.png');
			imagesArr.push('images/money.png');
			imagesArr.push('images/logo.png');
			imagesArr.push('images/word.png');
			imagesArr.push('images/star1.png');
			imagesArr.push('images/star2.png');
			imagesArr.push('images/redwallet.png');
			imagesArr.push('images/loading.gif');
			imagesArr.push('images/tomorrow.png');
			imagesArr.push('images/date.png');
			loadImg();
			function loadImg() {
				var oLoading = document.getElementById('loading');
				var imgArr = imagesArr;
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
			
		},
		error:function(jqXHR, textStatus, errorThrown){
			$('#loading').hide();
			if(jqXHR.status == 400){
				//toast('参数错误',2600);
			}else if(jqXHR.status == 500){
				toast('服务器繁忙',2600);
			};
			if(textStatus == 'timeout'){
				toast('请求超时',2600);
			};
			
			$('.chatDiv').hide();
			$('.scrollDiv').hide();
			
		}
		//整个获取7天信息
	});
	$('.get').on('click',function(){
		$(this).parent('div').hide();
		$('.shaddress').show();	
	});
	$('.shaddress').find('.close-button').on('click',function(){
		$(this).parent('div').hide();
		//pid	
	});
	
	/*修改收货信息*/
	$('.xiugai').click(function(){
		$(this).parent('div').hide();	
		$('.shaddress').show().addClass('pa');
		if(dataInfo){
			$('.shaddress').find('.formPerson').val(dataInfo.n);
			$('.shaddress').find('.formNum').val(dataInfo.ph);
			$('.shaddress').find('.formArea').val(dataInfo.d);
			$('.shaddress').find('.formAddress').val(dataInfo.a);
		}
	});

	/*确认收货*/
	var rePhone = /^\d{11}$/;
	$('.shaddress').find('.addressCon').click(function(){
		var flag = true;
		var mesgArr = ['请输入收货人','请输入联系方式','请输入所在地区','请输入详细地址'];
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
			
			
			if(dRi){  //today.ri
				$.ajax({
					url: '/lockimage/updateAddr.do',
					type: 'POST',
					dataType: 'json',
					timeout:15000,
					data: {
						u:u,
						s:s,
						ri:dRi,
						n:$('.inText').eq(0).val(),
						ph:$('.inText').eq(1).val(),
						d:$('.inText').eq(2).val(),
						a:$('.inText').eq(3).val(),
						pc:'100000'	
					},
					success: function(data,status,code){
						switch (code.status){
							case 200 :
								if(data.s == 1){
									dataInfo = data;
									toast('保存成功',2600);
									$('.shaddress').hide();
									$('#mask').hide();
								}else if(data.s == 0){
									toast('保存失败',2600);
									$('.shaddress').hide();
									$('#mask').hide();
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
			}else if(dId){
				$.ajax({
					url: '/lockimage/updateAddr.do',
					type: 'POST',
					dataType: 'json',
					timeout:15000,
					data: {
						u:u,
						s:s,
						ri:dId,
						n:$('.inText').eq(0).val(),
						ph:$('.inText').eq(1).val(),
						d:$('.inText').eq(2).val(),
						a:$('.inText').eq(3).val(),
						pc:'100000'	
					},
					success: function(data,status,code){
						switch (code.status){
							case 200 :
								if(data.s == 1){
									dataInfo = data;
									toast('保存成功',2600);
									$('.close-button').trigger('click');
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
			}
			
			
			
			
		}
	});
	
	/*输入检测*/
	var re = /^\d+$/;
	$('.phoneNum').on('blur',function(){
		if(re.test($(this).val())){
			$('.phoneNum').addClass('white');
			$('.phoneCon').addClass('yellow');
		}else{
			$('.phoneNum').removeClass('white');
			$('.phoneCon').removeClass('yellow');
		};
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
	function reInCard(obj){
		if(today){
			$(obj).show();
			$('#mask').show();
			$(obj).find('.prize').attr('src','images/'+today.pi+'.png')
			$(obj).find('.text').html(today.pd);	
		}else{
			$(obj).show();
			$('#mask').show();
			$(obj).find('.prize').attr('src','images/'+datas[Index].pi+'.png')
			$(obj).find('.text').html(datas[Index].pd);	
		}
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