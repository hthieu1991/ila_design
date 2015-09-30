// JavaScript Document
    $(document).ready(function(){
	//========== menu-sidebar ================//
	
    
		
	 
	  $('#nav > li > a').click(function(){
		if ($(this).attr('class') != 'active'){
		  $('#nav li ul').slideUp();
		  $(this).next().slideToggle();
		  $('#nav li a').removeClass('active');
		  $(this).addClass('active');
		}
	  });
	  
	   $('.main_menu ul li').hover(function(){
		    var xLeft = $(this).offset();
			var vleft=xLeft.left;
			
			 if(vleft>=900)
			 {
				$(this).find($('.submenu')).addClass("right-menu");
				$(this).find($('.submenu_child')).css('left','-100%')
				$(this).find($('.submenu_child')).css('margin-left','-35px')
			 }
			 
			 
	   });
	  
  		//========== effect animated ================//
		
		$('.no-touch .animated').waypoint(function () {

        var animation = $(this).attr('data-animation');
        var xposition = $(this).attr('data-xposition');
        var yposition = $(this).attr('data-yposition');
        var delay = $(this).attr('data-animation-delay');
		//alert(delay);
        $(this).addClass(animation, function () {
			//$(this).css('animationDelay',delay + 'ms')
            $(this).css({
                //opacity: '1',
                //marginLeft: xposition + 'px',
                //marginTop: '-' + yposition + 'px',
               // animationDelay: delay + 'ms'
            });
        });

    }, {
        offset: '85%',
        triggerOnce: true
    });
	
	//========== custom select ================//
	
	$(".custom-select").each(function(){
		$(this).wrap("<span class='select-wrapper'></span>");
		$(this).after("<span class='holder'></span>");
	});
	$(".custom-select").change(function(){
		var selectedOption = $(this).find(":selected").text();
		$(this).next(".holder").text(selectedOption);
	}).trigger('change');
	
	});
