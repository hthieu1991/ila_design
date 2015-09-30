var Testimonials = {
	base_url: 'testimoials/list',
	country: 'all',
	
	more: function(page)
	{
		$.ajax({
			url: this.base_url,
			data:{page:page,country:this.country},
			dataType: 'JSON',
			success: function(data)
			{
				$('#list-other').html(data.html);
				$('#paging').html(data.paging);
			},
		});
	},
	
	filter: function(obj)
	{
		this.country = $(obj).val();
		this.more(1);
	},
}