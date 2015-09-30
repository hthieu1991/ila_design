var common = {
	data:{},
	current_center:'',
	objPopup : null,
	// change dropdown program
	//CONFIG FOR HEADR
	sLinkRequest : '',
	sLinkEn : '',
	sLinkVn : '',
	sClassEn : '',
	sClassVn : '',
	oTrainingFirst: null,
	//CONFIG FOR FOOTER
	sLinkRequestFooter : '',
	
	
	initChatBox : function()
	{
		$("#lz_request_window").hide();
		$("#blur").hide();

		$('.chart-with-us a').click(function(){
			$("#lz_request_window").slideToggle('fast');
			$('.chart-with-us').hide();
			$("#blur").show();
			$('.box_pp').css("z-index", '1002');
		});
			$("#blur").click(function(){
			$("#lz_request_window").hide();
			$(".chart-with-us").show();
			$("#blur").hide();
			$('.box_pp').css("z-index", '992');
		   
		});
		
		$(".send_invi").click(function(){
            ph = $('#lz_invitation_phone').val();
            na = $('#lz_invitation_name').val();
            if(na != ""  && na != "Họ và tên" && ph != '' && ph != 'Điện thoại' && $("#lz_chat_form_groups").val())
            {
				$("#lz_request_window").hide();
				$(".chart-with-us").show();
				$("#blur").hide();
				$('.box_pp').css("z-index", '992');
			}
		});
	},
	
	
	lz_chat : function(){
		
		$(document).on('click','#blur',function(){
			
			$('#lz_request_window').hide();
			$(this).hide();
			$('.chart-with-us').show();
			$('.box_pp').css("z-index", '992');
		
		});
		
		$(document).on('click','.livebox-close',function(){
			$('#lz_request_window').hide();
			$('#blur').hide();
			$('.chart-with-us').show();
			$('.box_pp').css("z-index", '992');
			
						
		});
		
		$(document).on('click','.chart-with-us a img',function(){
			//$('.wp-live-chat').show();
			$('#lz_request_window').show();
			$('#blur').show();
			$('.box_pp').css("z-index", '1002');
			
						
		});
		
	},
	
	make_header : function(lang){
		
		
		var script = document.createElement('script');
		if(lang !="vi"){
			common.sLinkRequest = common.sLinkRequest.replace('http://', 'http://'+lang+".");
		}
		script.src = common.sLinkRequest+"?lang="+lang;

		//inject script tag into head
		document.getElementsByTagName('head')[0].appendChild(script);
		
	},
	
	
	callback_make_header: function(responseData){
	
		result = responseData.html;
    	result = result.replace(/{LINK_EN}/gi, common.sLinkEn);
    	result = result.replace(/{LINK_VN}/gi, common.sLinkVn);
    	result = result.replace(/{CLASS_EN}/gi, common.sClassEn);
    	result = result.replace(/{CLASS_VN}/gi, common.sClassVn);
    	$("#header").prepend(result);
    	
    	var hearder_job = $(result).find('.header-job');
    	var header_gallery = $(result).find('.header-gallery');
    	header_gallery.addClass('hide');
    	header_gallery.find('ul').removeClass();
    	
    	hearder_job.addClass('hide');
    	hearder_job.find('ul').removeClass();
    	
    	
    	$('#gallery-dis').replaceWith(header_gallery);
    	$('#job-dis').replaceWith(hearder_job);
    	
    	$('#menu').slicknav({
    		label : '',
			'open': function(trigger){
				
				//closedSymbol: '&#9658;',
		        //openedSymbol: '&#9660;',
				
				trigger.parent().siblings().find('ul').slideUp();
				trigger.parent().siblings().find('.slicknav_arrow').html("&#9658;");
				//trigger.parent().removeClass('slicknav_open').addClass('slicknav_collapsed');
				
				/*var that = trigger.parent().children('ul ul');
				$('.slicknav_menu ul li.slicknav_open ul ul').each(function(){
					if($(this).get( 0 ) != that.get( 0 )){
						$(this).slideUp().addClass('slicknav_hidden');
						$(this).parent().removeClass('slicknav_open').addClass('slicknav_collapsed');
					}
				})*/
				
			}, 
    	});
		
    	common.current_center = 'center_48';
    	common.center_active();
    	//popup_duhoche.init();
		
    	
	},
	
	
	callback_make_footer: function(responseData){
			
		result = responseData.html;
		$("#footer").prepend(result);
			
	},
	
	make_footer : function(lang){
		
		var script = document.createElement('script');
		if(lang !="vi"){
			common.sLinkRequestFooter = common.sLinkRequestFooter.replace('http://', 'http://'+lang+".");
		}
		script.src = common.sLinkRequestFooter+"?lang="+lang
		//inject script tag into head
		document.getElementsByTagName('head')[0].appendChild(script);
		
		
	},
	
	
	create_tab_training_faciliti : function(){
		
		$('.horizontalTab').responsiveTabs({
			startCollapsed: 'accordion',
			collapsible: false,
			rotate: false
		});
	},
	
	/* training slider index */
	slider_training : function() {

		//// fix training index????
		var training = $('#slider_training-0').bxSlider({
			auto : false,
			autoControls : true,
			pause : 3000,
			slideMargin : 0,
			adaptiveHeight : true,
		});
		$('.wp_slider_training').css('visibility', 'visible');
		window.training = training;
		common.oTrainingFirst = training;
		return training;

	},
	
	tab_tranning : function() {

		var slider0 = true;
		var slider1 = false;
		var slider2 = false;
		$(document).on('click', '.active-training', function() {

			var select = "#" + $(this).attr('data-id');
			var slider = "#slider_training-" + $(this).attr('data-slider');

			//$('.wp_block_trainings').removeClass('active');
			$('.wp_block_trainings').hide();
			$('a.active-training').parent().removeClass('active');
			$(this).show();
			$('.active-training').next().hide();
			$('.active-training').removeClass('active');
			$(this).addClass('active');
			$(this).next().show();
			$(select).show();
			if ((slider == "#slider_training-0") && !slider0) {
				$(slider).bxSlider({
					auto : false,
					autoControls : true,
					pause : 3000,
					slideMargin : 0
				});
			}
			if ((slider == "#slider_training-1") && !slider1) {
				$(slider).bxSlider({
					auto : false,
					autoControls : true,
					pause : 3000,
					slideMargin : 0
				});
			}
			if ((slider == "#slider_training-2") && !slider2) {
				$(slider).bxSlider({
					auto : false,
					autoControls : true,
					pause : 3000,
					slideMargin : 0
				});
			}
			if ($(this).attr('data-slider') == 0) {
				slider0 = true;
			}
			if ($(this).attr('data-slider') == 1) {
				slider1 = true;
			}
			if ($(this).attr('data-slider') == 2) {
				slider2 = true;
			}

			return false;

		});

	},
	
	
	change_program : function() {

		$(document).on(
						'change',
						'#dropdown_program',
						function() {
							if ($(this).val() != 0)
								$('#frm_year').submit();

						});

	},

	
	
	center_details : function(id) {

		
		$.ajax({
			type : "POST",
			data : {
				id : id,
				format : 'html'
			},
			url : '/index/center-details'
		}).done(function(data) {
			
			var center_info = $(data).filter('.info-ila');
			$('.info-ila').html(center_info.html());
			var map = $(data).filter('.google_maps');
 			$('.google_maps').html(map.html());
			var name = map.attr('data-name');
			var lon = map.attr('data-location');
			common.googleMap(map.attr('data-name'), map.attr('data-lat'),map.attr('data-lon'));
 			
		});

	},
	
	get_list_center : function() {

		
		$.ajax({
			type : "POST",
			data : {
				
				format : 'html'
			},
			url : '/index/get-list-center'
		}).done(function(data) {
			$('.select_center').html(data);
			var first_center_value = $(data).filter("#dr_ct_center").val();
			common.center_details(first_center_value);
			
			//$('#dr_ct_center').multiselect({maxHeight: 200,buttonWidth: '230px'});
			//$('.multiselect-container li').first().hide();
			
		});

	},
	
	change_quality_home :function(){
		$(document).on('click','.item-control',function(){
			
			$('.item-content').removeClass('active');
			var id = $(this).attr('data-id');
			$(id).addClass('active');
			
			
		})
		
	},
	
	// end change dropdown program

	// Slider Board

	board_slider : function() {

		$('#broad_slider').bxSlider({
			slideMargin : 10,
			minSlides : 1,
			maxSlides : 4,
			slideWidth : 192,
			responsive : true
		});

	},

	close_s : function() {
		$(document).on('click','.close_s',function(){
			$(this).parent().hide();
		})
		
    
	},

	// //Quality Zone

	quality_details : function(value){
		window.location = value;
		
	},
	

	teacherAlias:'',
	//teacher read more
	teacher_readmore : function(){
		var keyword = $("#txt_st").val();
		$.ajax({
			type : "POST",
			data : {
				keyword : keyword,
				format : 'html',
				alias : common.teacherAlias
			},
			url : '/teacher/readmore'
		}).done(function(data) {
			$('#break_list').nextAll().remove();
			$('.business_teacher').append(data).show('slow');

		});
		
	},
	// /Teacher Zone
	// search teacher
	teacher_search : function() {

		$(document).on('submit', 'form#frm-teacher-search', function() {
			var $form = $(this);
			var keyword = $form.find("input[name='keyword']").val();
			$.ajax({
				type : "POST",
				data : {
					'keyword' : keyword,
					format : 'html'
				},
				url : '/teacher/list'
			}).done(function(data) {
				$('#break_list').nextAll().remove();
				$('.business_teacher').append(data).show('slow');

			});

			return false;
		});

	},

load_teacher :function(alias){
		
		$.ajax({
			type : "POST",
			data : {
				alias : alias,
				format : 'html',
			},
			url : '/teacher/list-teacher'
		}).done(function(data) {
			$('#break_list').nextAll().remove();
			$('.business_teacher').append(data).show('slow');
		});
		
	},
	closepopup : function() {
		common.objPopup.remove();
		$('.overlay').css('display', "none");
	},
	openpopup : function() {
		$('.overlay', common.objPopup).css('width', $(window).width() + "px");
		$('.overlay', common.objPopup).css('height', $(window).height() + "px");
		$('.overlay').css('display', "block");
		common.objPopup.css('display', "block");
		$('.overlay').bind('click', function() {
			common.closepopup();
		});

	},

	details_teacher : function() {
		$(document).on('click', '.bu_teacher_list li > a', function() {
			var id = $(this).attr('data-id');
			$.ajax({
				type : "POST",
				data : {
					'id' : id,
					format : 'html'
				},
				url : '/teacher/details'
			}).done(function(data) {
				$('#popup_content').html(data);
				PopupTeacher.loadPopup();

			});

			return false;
		});

	},

	// get list center by id city
	contact_list_center : function(id) {

		$.ajax({
			type : "POST",
			data : {
				alias : id,
				format : 'html'
			},
			url : '/contact/list-center'
		}).done(function(data) {
			
			$('.select_contact').after(data);

		});

	},

	// get center details by id center
	contact_details_center : function(id) {
		
			$.ajax({
				type : "POST",
				data : {
					alias : id,
					format : 'html'
				},
				url : '/contact/center-details'
			}).done(function(data) {
				$('.waiting').css('display', "none");
				$('#center-content').html(data);
			});

			

	},
	// get teacher training
	contact_teacher_training : function() {

		$('.waiting').css('display', "block");
		$.ajax({
			type : "POST",
			data : {
				format : 'html'
			},
			url : '/contact/teacher-training'
		}).done(function(data) {
			$('.waiting').css('display', "none");
			$('.select_contact').siblings().remove();
			$('.select_contact').after(data);
		});

	},

	// get overseas center details

	contact_overseas_center : function(idcity) {

		$('.waiting').css('display', "block");

		$.ajax({
			type : "POST",
			data : {
				overseasid : idcity,
				format : 'html'
			},
			url : '/contact/overseas-center'
		}).done(function(data) {
			$('.waiting').css('display', "none");
			$('.select_contact').siblings().remove();
			$('.select_contact').after(data);

		});

	},

	// google map  

	
	googleMap : function(centerName, map1, map2) {

		var myCenter = new google.maps.LatLng(map1, map2);

		function initialize() {
			var mapProp = {
				center : myCenter,
				zoom : 16,
				mapTypeId : google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById("googleMap"),
					mapProp);

			var marker = new google.maps.Marker({
				position : myCenter,
			});

			marker.setMap(map);

			if (centerName.length > 0) {
				var infowindow = new google.maps.InfoWindow({

					content : '<div style="height:35px">' + centerName
							+ '</div>'
				});

				infowindow.open(map, marker);
			}
		}

		initialize();
	},

	// active center header_top
	center_active : function() {

		$(document).ready(function() {

			$("a.center").mouseover(function() {
				var content_show = $(this).attr("data-id");
	
				if(common.current_center != content_show){
					
				$(".actived").removeClass("actived");
				$(this).addClass("actived");
				$(".content_sub").slideUp();
				
				$("#" + content_show).slideDown();
				
				}
				common.current_center = content_show;
				
			});

		});

	},
	/*CENTER*/ 
	
	///get list center

	center_list_center : function(idcity) {

		$('.waiting').css('display', "block");
		$.ajax({
			type : "POST",
			data : {
				idcity : idcity,
				format : 'html'
			},
			url : '/center/list-center'
		}).done(function(data) {
			$('.waiting').css('display', "none");
			$('.content_child .ul_centre').html(data);
		});

	},
	
	//get list city
	
	
	center_list_city : function(idcity,district) {

		
		$.ajax({
			type : "POST",
			data : {
				alias : idcity,
				district :district,
				format : 'html'
			},
			url : '/center/list-city'
		}).done(function(data) {
			
			var menu = $(data).filter('ul._ul_menu');			
			var select = $(data).filter('select#dr_event');
			$('.siderbar_left').html(menu);
			$('.select_mobile').html(select);
			$('._ul_menu').menu();
		});

	},
	
	
	menu_city_center : function (){
		
		$(document).on('click','.center-list-center',function(){
			$('.center-list-center').removeClass('active');
			$(this).addClass('active');
			
			
			
		})
		
	},
	
	

	// /AWARD
	// get list photo
	award_list_photo : function(idaward) {

		$('.waiting').css('display', "block");
		$.ajax({
			type : "POST",
			data : {
				idaward : idaward,
				format : 'html'
			},
			url : '/award/list-photo'
		}).done(function(data) {
			$('.waiting').css('display', "none");
			$('.select_contact').next().remove();
			$('.select_contact').after(data);
		});

	},

	//

	side_bar_left : function() {
		$(document).on('click', '.ul-side-bar > li > a', function() {
			$('.ul-side-bar > li').removeClass('active');
			$(this).parent().addClass('active');

		});

	},

	// //NEW EVENT ZONE
	// form filter submit
	event_list : function() {
		$(document).on('change', '.select_contact', function() {
			var url = $('#frm-new-event').attr('action');
			var city = $("select[name='city']").val();
			var year = $("select[name='year']").val();
			$.ajax({
				type : "POST",
				data : {
					city : city,
					year : year,
					format : 'html'
				},
				url : url
			}).done(function(data) {
				$('.content_child').html(data);
			});
			return false;

		})

	},
	// load City

	loadCity : function(idcity) {
		$.ajax({
			type : "POST",
			data : {
				'city' : idcity,
				format : 'html'
			},
			url : '/newevent/load-city'
		}).done(function(data) {
			$('.e_city').html(data);
		});

	},

	// load Center

	loadCenter : function(idcenter) {
		$.ajax({
			type : "POST",
			data : {
				'center' : idcenter,
				format : 'html'
			},
			url : '/newevent/load-center'
		}).done(function(data) {
			$('.e_place').html(data);
		});

	},
	
	append_city : function(){
		 
		 $.ajax({
				type : "POST",
				data : {
				},
				url : '/common/list-city-option'
			}).done(function(data) {
				$.each($.parseJSON(data), function(index,item) {
					
					$('.fill-city').each(function(index_td,item_td){
						
						var tr_id = $(this).attr('data-id');
						if((item.id == tr_id || item.alias == tr_id ) &&  !$(this).hasClass('add-city'))
						{
							if(item.id ==48 )
							{
								item.name = "HCM";
							}							
							$(this).append(item.name);
							$(this).addClass('add-city');
							
							
							
						}
						
					});
		            
		        });

			});
		 
		 
	 },
	 
	 
append_center : function(){
		 
		 $.ajax({
				type : "POST",
				data : {
				},
				url : '/common/list-center-option'
			}).done(function(data) {
				$.each($.parseJSON(data), function(index,item) {
					
					$('.fill-center').each(function(index_td,item_td){
						
						var tr_id = $(this).attr('data-id');
						if((item.id == tr_id || item.alias == tr_id ) &&  !$(this).hasClass('add-center'))
						{
							var template = item.name+" <br>"+ item.address;
							$(this).append(template);
							$(this).addClass('add-center');
						}
						
					});
		            
		        });

			});
		 
		 
	 },
	 change_year : function() {
			$("select.filter-year").change(
					function() {
						$('#frm-filter-year').submit();
						
					});
		},

		
		readmore_news :function(){
			
			 $.ajax({
					type : "POST",
					
					url : '/new-event/readmore'
				}).done(function(data) {
					$('#break-list' ).nextAll().remove();
					$('.block-news-press').append(data);
					common.append_center();
					common.append_city();
				});
			
			
			
		},
		readmore_event :function(){
			
			 $.ajax({
					type : "POST",
					
					url : '/new-event/readmoreevent'
				}).done(function(data) {
					$('#break-list' ).nextAll().remove();
					$('.block-news-event').append(data);
					common.append_center();
					common.append_city();

				});
			
			
			
		},
		
		create_tab_mobile : function(){
			if(PDVideo.isMobile()){
				
				$(".wrap-slider-mb").each(function() {

					var id = $(this).attr('data-id');
					var sliderTemp  = $(id).clone();
					$(id).remove();
					sliderTemp.removeClass('col-sm-8').addClass('col-sm-12');
					$(this).append(sliderTemp);
					
				});
				
				//common.slider_training(); 
				$('#tab1').show();
				//common.oTrainingFirst.reloadSlider();
				
			}
			else
			{
				//common.slider_training(); 
				
			}
			
			
		},
		
		menu_contact : function(select){
			var result = "";
			$.ajax({
				
			    type: 'POST',
			    url: '/contact/get-menu',
			    data: {
			    	format : 'html',
			    	select : select
			    	
			    },
			    success: function(responseData)
			    {
			       $('.siderbar_left').html(responseData);
			       $('._ul_menu').menu();
			    },
			    
			});

			
		},
		scroll_bottom:function(){
			

			$('.item-blocks a[href*=#]').click(function(event){
				$('html, body').animate({
					scrollTop: $( $.attr(this, 'href') ).offset().top - 100
				}, 500);
				event.preventDefault();
			});
		},
		
		
		share_gallery : function(){
			
			
			$(document).on('click','.link-share',function(){
				
				$('.box-share').show();
			});
			$(document).on('mouseleave','.share_button',function(){
							
				$('.box-share').hide();
			});
			
			
		}
		
		,
		
		capcha_contact:function(){
			
			 $(document).ready (function(){
				 
				 $(document).on('click','#imgRefreshCaptcha',function(){
					 
					 jQuery.ajax({
	  	                  type:"POST",
	  	                  url:"/contact/refresh-captcha",
	  	                  global: false,
	  	                  success:function(data){
	  	                     $("#captcha-element").html(data);
	  	                  },
	  	                  error:function(){
	  	                   alert('co loi ro');
	  	                  },
	  	        });//end Ajax
					 
				 });
				
	        });
			
		},
		
		ilacn_click : function(){
			 $(window).scroll(function(){
		            var window_top = $(window).scrollTop() + 12; // the "12" should equal the margin-top value for nav.stick
		            var div_top = $('#nav-anchor').offset().top;
		                if (window_top > div_top) {
		                    $('#menu_network').addClass('stick');
		                } else {
		                    $('#menu_network').removeClass('stick');
		                }
		        });
			 
			
			   $(document).ready(function(){
			    $('#menu_network li a[href*=#]').click(function(event){
			    
		    	 $('#menu_network li').removeClass('active');
			     $(this).parent().addClass('active');	
			    	
			     $('html, body').animate({
			      scrollTop: $( $.attr(this, 'href') ).offset().top-70
			     }, 500);
			    
			     event.preventDefault();
			     
			    });
			   });
			
		},
		
		facebook_like :function(lang){
		
			(function(d, s, id) {
				  var js, fjs = d.getElementsByTagName(s)[0];
				  if (d.getElementById(id)) return;
				  js = d.createElement(s); js.id = id;
				  js.src = "//connect.facebook.net/"+lang+"/sdk.js#xfbml=1&version=v2.0";
				  fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
		}
		
		,
		link_banner:function(){
			$(document).on('click','img.banner-link',function(){
				$.session.remove('show-popup');
				window.open($(this).attr('data-url'),'_blank');
				
			});
		}
		
};




$(document).ready(function() {

	common.close_s();
	common.link_banner();
	//chat
	common.lz_chat();
	common.initChatBox();
	$(document).on('click','.r-tabs-anchor',function(){
		if($(this).attr('href') == "#gallery-img2")
		{
			$('#tab1').show();
			common.oTrainingFirst.reloadSlider();
		}
	});
	
	/* CHANGE GOOGLE+ & INSTAGRAM*/
	 if(PDVideo.isMobile()){
		 $('.box_google').hide();
		
	 }else{
		  $('.instagram-media-wp').hide();
		 
	 }
	
	setTimeout(function(){
		$('.chart-with-us').show();
		}, 5000);
	
	
	
	// common.side_bar_left();
	
	
});
