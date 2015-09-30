
var popup_duhoche = {
		
	close_popup:function (){
			$('.wrap_popup').fadeOut(500);
			$('.blur').fadeOut(500);
	},

	show_popup:function(){
		$('.wrap_popup').fadeIn(500);
		$('.blur').fadeIn(500);
	},
    updateParam: function(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    },
		
		
	
	init : function(){
		$.getScript( "/static/default/js/jquery.session.js" ,function(){
			var sess_item = $.session.get('show-popup');
			var show_param = $.urlParam('p')==null?"true":$.urlParam('p');
			
			
			
			if(show_param != "0")
			{
				if(typeof sess_item == "undefined")
				{
					popup_duhoche.show_popup();
					$.session.set("show-popup",false);
					
				}
			}else{
				$.session.set("show-popup",false);
			}
			
			/*$("a[target='_blank']").each(function(){
				
				var uri = $(this).attr('href');
				$(this).attr('href', popup_duhoche.updateParam(uri, 'p', '0'));
				
			});*/
			
		});
		
	
	}
	
	
	
		
};


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
};



