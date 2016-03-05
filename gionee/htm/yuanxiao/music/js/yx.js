$(document).ready(function(){
	var u = getQueryString('u');
	var s = getQueryString('s');
	var t = getQueryString('t') || 'music';
	var questionId;
	var isPrized;
	var isFirst;
	var userInfo = {};
	
	$.ajax({
		url: '/lockimage/getQuestion.do',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		data:{
			u:u,
			s:s,
			t:t
		},
		success: function(data){
			loadImg();
			function loadImg() {
				var oLoading = document.getElementById('loading');
				var imgArr = ['images/ditu.jpg','images/loading.gif','images/button1.png','images/button2.png','images/close-button.png','images/tip1.png','images/tip2.png'];
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
			console.log(data);
			if(data.st == 0){
				document.onclick = function(){
					toast('活动结束',2600);
				}
			}else if(data.st == 1){
				isFirst = data.f;
				isPrized = data.ip;
				questionId = data.q;
				
				if(data.ip == 1){
					$('.myPrize').show();
				}
				
				$('.questionText').html(data.qd);
				
				$('.answer').find('.ans').eq(0).find('span').html(data.a);
				$('.answer').find('.ans').eq(1).find('span').html(data.b);
				$('.answer').find('.ans').eq(2).find('span').html(data.c);
				
				//点击回答问题
				$('.answer').find('.ans').each(function(index,element){
			        $(this).click(function(){
						//alert($(this).data('answer'));
			        	$('.load').show();
			        	$.ajax({
							url: '/lockimage/yuanXiaoAnswer.do',
							type: 'POST',
							dataType: 'json',
							timeout:15000,
							data:{
								u:u,
								s:s,
								t:t,
								q:questionId,
								f:isFirst,
								a:$(this).data('answer')
							},
							success: function(data){
								//dataInfo = data;
								console.log(data);
								
								if(data.st == 0){
									toast('活动结束',2600);
								}else if(data.st == 1){
									if(data.r == 0){
										if($('.success').css('display') == 'block'){
											$('.success').css('display','none');
										};
										$('.error').stop(true,false).fadeIn('1000',function(){
											setTimeout(function(){
												$('.error').fadeOut('1000');	
											},1500);
										});
									}else if(data.r == 1){
										setTimeout(function(){
											$('.changeDiv').trigger('click');											
										},2100);
										if(data.p == 0){
											if($('.error').css('display') == 'block'){
												$('.error').css('display','none');
											};
											$('.success').stop(true,false).fadeIn('1000',function(){
												setTimeout(function(){
													$('.success').fadeOut('1000');	
												},1500);
											});
										}else if(data.p == 1){
											$('#mask').show();
											$('.jdk').show();
											$('.myPrize').show();
										}
									}
								}
								
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
					});
			    });
				//换一换
				$('.changeDiv').click(function(){
					$.ajax({
						url: '/lockimage/getQuestion.do',
						type: 'GET',
						dataType: 'json',
						timeout:60000,
						data:{
							u:u,
							s:s,
							t:t
						},
						success:function(data){
							console.log(data);
							isFirst = data.f;
							isPrized = data.ip;
							questionId = data.q;
							$('.questionText').html(data.qd);
							
							$('.answer').find('.ans').eq(0).find('span').html(data.a);
							$('.answer').find('.ans').eq(1).find('span').html(data.b);
							$('.answer').find('.ans').eq(2).find('span').html(data.c);
						},
						error:function(jqXHR, textStatus, errorThrown){
							//$('.load').hide();
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
				});
				
			}	
		},
		error:function(jqXHR, textStatus, errorThrown){
			//$('.load').hide();
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
		}
	});
	
	/***********关闭按钮***********/
	$('.close-button').click(function(){
		
		$(this).parent('div').hide();
		$('#mask').hide();
		
		
		clearInput($(this),'.phoneNum');
		clearInput($(this),'.formPerson');
		clearInput($(this),'.formAddress');	
		
	});
	
	
	/*点击获奖结果*/
	$('.myPrize').click(function(){
		$('.addressInfo').show();
		$('#mask').show();
		
		/*获取电话姓名地址*/
		$.ajax({
			url: '/lockimage/getYuanxiaoAdd.do',
			type: 'GET',
			dataType: 'json',
			timeout:15000,
			data:{
				u:u,
				s:s,
				t:t
			},
			success:function(ddd){
				userInfo.n = ddd.n;
				userInfo.ph = ddd.ph;
				userInfo.a = ddd.a;
				$('.nameInfo').html(ddd.n);
				$('.phoneInfo').html(ddd.ph);
				$('.addrInfo').html(ddd.a);
			},
			error:function(jqXHR, textStatus, errorThrown){
				//$('.load').hide();
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
	});
		
	
	
	/*点击修改*/
	$('.xiugai').click(function(){
		$('.addressInfo').hide();	
		$('.shouhuo').show();
		
		$('.inText').eq(0).val(userInfo.n);
		$('.inText').eq(1).val(userInfo.ph);
		$('.inText').eq(2).val(userInfo.a);
		
	});
	
	/*点击领取*/
	$('.get').on('click',function(){
		$(this).parent('div').hide();
		$('.shouhuo').show();	
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
				url: '/lockimage/updateYuanxiaoAdd.do',
				type: 'POST',
				dataType: 'json',
				timeout:15000,
				data: {
					u:u,
					s:s,
					t:t,
					n:$('.inText').eq(0).val(),
					ph:$('.inText').eq(1).val(),
					a:$('.inText').eq(2).val()
				},
				success: function(data,status,code){
					switch (code.status){
						case 200 :
							if(data.st == 1){
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