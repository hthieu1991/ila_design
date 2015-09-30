var TrainingCenter = {
	base_url: 'about-us/default.htm',
	
	selectCity: function(idCity)
	{
		$('#city-content').load(this.base_url + 'why-ila-city',{id:idCity}, function(){TrainingCenter.addCustomSelect()});
		return false;
	},
	
	addCustomSelect: function()
	{ 
		$(".custom-select").each(function(){
			$(this).wrap("<span class='select-wrapper'></span>");
			$(this).after("<span class='holder'></span>");
			$(this).next(".holder").text($(this).find("option:first").text());
		});
		
		$(".custom-select").change(function(){
			var selectedOption = $(this).find(":selected").text();
			$(this).next(".holder").text(selectedOption);
		});
	},
	
	selectCenter: function(obj)
	{
		$('#center-content').load(this.base_url + 'why-ila-center',{id:$(obj).val()});
	},
	
	manager: function()
	{
		$('.horizontalTab').responsiveTabs({
            /*startCollapsed: 'accordion',*/
            collapsible: false,
            rotate: false
        });
		
		$('ul.catelory-location li > a').click(function(){
			$(this).closest('ul').find('li').each(function(){
				$(this).removeClass('current');
			});
			
			$(this).parent().addClass('current');
		});
		
		$('.main-gallery').first().bxSlider({
			auto: true,
			autoControls: true,
			pause: 3000,
			slideMargin: 0
		});
	    
	    this.loadSlider();
	},
	
	loadSlider: function()
	{
		var slider0 = true;
    	var slider1 = false;
    	var slider2 = false;
    	$(document).on('click', 'a.r-tabs-anchor', function() {
    
    		var select = $(this).attr('href');
    		var slider = $(select).find('.main-gallery').attr('id');
    
    		if ((slider == "sliderg1") && !slider0) {
    			$('#'+slider).bxSlider({
    				auto : true,
    				autoControls : true,
    				pause : 3000,
    				slideMargin : 0
    			});
    		}
    		if ((slider == "sliderg2") && !slider1) {
    			$('#'+slider).bxSlider({
    				auto : true,
    				autoControls : true,
    				pause : 3000,
    				slideMargin : 0
    			});
    		}
    		if ((slider == "sliderg3") && !slider2) {
    			$('#'+slider).bxSlider({
    				auto : true,
    				autoControls : true,
    				pause : 3000,
    				slideMargin : 0
    			});
    		}
    		if ($(this).attr('href') == '#gallery-img1') {
    			slider0 = true;
    		}
    		if ($(this).attr('href') == '#gallery-img2') {
    			slider1 = true;
    		}
    		if ($(this).attr('href') == '#gallery-img3') {
    			slider2 = true;
    		}
    
    	});
	},
}


var Event = {
	base_url: 'about-us/default.htm',
	
	manager: function()
	{
		$('#event-year').change(function(){
			Event.selectYear(this);
		});
		
		$('#event-list').change(function(){
			Event.selectEvent(this);
		});
	},
	
	selectYear: function(obj)
	{
		$('#event-list').load(this.base_url + 'event-list',{y:$(obj).val()}, function(){
			$(this).parent().find('span.holder').html('-- Select a event --');
		});
	},
	
	selectEvent: function(obj)
	{
		if ($(obj).val().trim() != '')
		{
			//window.location = this.base_url + 'event/alias/' + $(obj).val();
			window.location = 'ilavietnam-event-' + $(obj).val() + '.html';
		}
	},
	
}


var ContactForm = {
	is_submit : false,
	setting: {
		input_invalid: 'input-invalid',
	},
	
	isset: function(val){
		return ( typeof val != 'undefined' && val != null && val.trim() != '' ) ;
	},
	
	isNotSet: function(val){
		return ( typeof val == 'undefined' || val == null || val.trim() == '' ) ;
	},
	
	validRequire: function()
	{
		object = '.required';
		var isValid = true;
		
		$(object).each(function(){ 
			switch($(this).attr('data-type'))
			{
				case 'email':
					switch(true)
					{
						case ContactForm.isNotSet($(this).val()):
							$(this).addClass(ContactForm.setting.input_invalid);
							isValid = false;
							break;
							
						case ! ContactForm.validateEmail($(this).val()):
							$(this).addClass(ContactForm.setting.input_invalid);
							isValid = false;
							break;
							
						default:
							$(this).removeClass(ContactForm.setting.input_invalid);
							break;
					}
					break;
					
				default:
					if (ContactForm.isNotSet($(this).val())) {
						$(this).addClass(ContactForm.setting.input_invalid);
						isValid = false;
					}
					else {
						$(this).removeClass(ContactForm.setting.input_invalid);
					}
					break;
			}
		});
		
		return isValid;
	},
	
	validateEmail: function(email)
	{ 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	},
	
	
	manager: function()
	{
		$('#frm-contact').submit(function(){
			ContactForm.is_submit = true;
			return ContactForm.validRequire();
		});
		
		$('.required').blur(function(){
			if (ContactForm.is_submit)	{
				ContactForm.validRequire();
			}
		});
		
		$('#horizontalTab').responsiveTabs({
            startCollapsed: 'accordion',
            collapsible: false,
            rotate: false
        });
	},
}