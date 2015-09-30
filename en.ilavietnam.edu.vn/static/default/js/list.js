
var list ={
	
	//url				: '/admin/index',
	page			: 1,
	currentObj 		: null,
	url             :'',
	container       :'',
	data:{
		
		filter_field:{},
		filter_value:{}
		
	},
	
	edit: function(id){
		window.location = this.url + '/update/id/' + id;
	},
	 
	
	
	
	testimonials_paging_show : function (){
		
		
		$.ajax({
			url: list.url,
			data: this.data,
			dataType: "html",
			type: 'POST',
			
		}).done(function(response) {
		
			$('.wp-Testimonials').html(response);
			
		});		
		
		
	}
	
}




var requestPageTesti = function(page)
{
	list.data['page'] = page;
	list.testimonials_paging_show();
}