var Schedules = {
	base_url: '../celta/schedule-list',
	
	more: function(page)
	{
		$.ajax({
			url: this.base_url,
			data:{page:page},
			dataType: 'JSON',
			success: function(data)
			{
				$('#schedule-content').append(data.html);
				$('#paging-button').html(data.paging);
			},
		});
	},
}