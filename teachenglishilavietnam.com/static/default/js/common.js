var common = {
	
	refesh_captcha: function(url,content){
		
		
		$(document).on('click','#imgRefreshCaptcha',function(){
			
			 jQuery.ajax({
	                  type:"POST",
	                  url:url,
	                  global: false,
	                  success:function(data){
	                     $(content).html(data);
	                  },
	                  error:function(){
	                	  alert('Error');
	                  },
			 });
			
		});
		
	},
	
	
	
	
	
	
	
};


$(document).ready(function(){
	
$("#frmApply").submit( function(eventObj){
		
		var keyCaptcha = $(".job-at-ila #keyCaptcha").clone();
		var valueCaptcha = $(".job-at-ila #valueCaptcha").clone().attr('type','hidden');
		
		if($(this).find('#keyCaptcha').length > 0){
			$(this).find('#keyCaptcha').replaceWith(keyCaptcha);
		}else{
			$(this).append(keyCaptcha);
		}
		if($(this).find('#valueCaptcha').length > 0){
			$(this).find('#valueCaptcha').replaceWith(valueCaptcha);
		}else{
			$(this).append(valueCaptcha);
		}	
		
	
	    
	});
	
});