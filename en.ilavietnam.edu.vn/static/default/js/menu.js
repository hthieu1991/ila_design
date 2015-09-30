(function($) {

	$.fn.menu = function(options) {

		var root = $(this);
		var first_child = root.children('li');
		var second_child = first_child.children().children('li');

		first_child.children('a').click(function() {

			manager($(this), ".first");

		});

		manager = function(obj, _class) {

			obj.parent().find('ul').not(obj.parent()).each(function() {
				$(this).slideUp();
				$(this).parent().removeClass('ct_selected');
			});
			$(_class).removeClass('active');
			$('.first').removeClass('active');
			obj.parent().parent().parent().addClass('active');
			obj.parent().addClass('active');
			obj.parent().siblings().find('.active').removeClass('active');
			if (obj.parent().find('ul').is(":visible") == true){
				return;}
			obj.parent().addClass('ct_selected');
			obj.parent().find('ul').slideDown("slow");
			

		}

		second_child.children('a').click(function() {

			manager($(this), ".second");

		});

		init = function() {
			first_child.addClass('first');
			second_child.addClass('second');
			/* set select menu item */
			$(".second").each(function(){
				  if( $(this).hasClass('active')){
				  $(this).parent().parent().addClass('active');
				  }
 
	        });
		}

		init();
	};

}(jQuery));