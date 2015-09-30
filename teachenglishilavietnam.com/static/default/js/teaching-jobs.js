var TeachingJobs = {
	base_url: 'teaching-jobs/ajax-job-list',

	manager: function()
	{
		$('ul.filter-job li').click(function(){
			$('li', $(this).parent()).each(function(){
				$(this).removeClass('selected');
			});
			
			$(this).addClass('selected');
			TeachingJobs.loadList();
		});
	},
	
	
	loadList: function()
	{
		var filter = {};
		
		$('ul.filter-job').each(function(){
			var $e = $(this).find('li.selected').first();
			if ($e.length > 0)
			{
				filter[ $(this).attr('data-field') ] = $e.attr('data-value');
			}
		});
		
		$('#job-list-content').load(this.base_url, filter);
	},
	
}

$(document).ready(function(){
	TeachingJobs.manager();
});

var ApplyJobs = {
	
	manager: function()
	{
		$('.btn-upload').change(function(){
			// ApplyJobs.addFile(this);
			$(this).closest('form').submit();
			$(this).closest('td').find('.ajaxloader').show();
		});
		
		this.rememberVal();
		
		$('#frmApply').submit(function(){
			ApplyJobs.is_submit = true;
			return ApplyJobs.validPosition() && ApplyJobs.validRequire();
		});
		
		$('.required').blur(function(){
			if (ApplyJobs.is_submit)	{
				ApplyJobs.validRequire();
			}
		});
		
		$('input[name="id_position"]').click(function(){
			if (ApplyJobs.is_submit)	{
				ApplyJobs.validPosition();
			}
		});
	},
	
	addFile: function(data)
	{
		var $list = $('input[name="name"][value="'+ data.element +'"]').closest('tr').find('ul.list-upload');
		var id    = this.uniqid();
		
		$('li.up-fail', $list).remove();
		
		switch (data.type)
		{
			case 'doc':
				$list.append('<li>'+ data.file_name +'<a href="javascript:void(0)" class="remove" data-id="'+id+'">remove</a></li>');
				break;
	
			case 'img':
				$list.append('<li>'+ data.file_name +'<a href="javascript:void(0)" class="remove" data-id="'+id+'">remove</a></li>');
				//$list.append('<li><img src="'+ data.src +'" title="'+ data.file_name +'"><a href="javascript:void(0)" class="remove" data-id="'+id+'">remove</a></li>');
				break;
		}
		
		// append data to form
		$('#frmApply').append('<input id='+ id +' type="hidden" name="'+ data.element +'[]" value="{'+ data.file_name +'}'+ data.src +'">');
		
		// register event remove
		this.blind();
		
		// hide ajax-loader
		$('input[name="name"][value="'+ data.element +'"]').closest('td').find('.ajaxloader').hide();
	},
	
	addFail: function(data)
	{
		var $list = $('input[name="name"][value="'+ data.element +'"]').closest('tr').find('ul.list-upload');
		if ($('li.up-fail', $list).length > 0) {
			$('li.up-fail', $list).html(data.message);
		}
		else {
			$list.append('<li class="up-fail">'+ data.message +'</li>');
		}
		
		// hide ajax-loader
		$('input[name="name"][value="'+ data.element +'"]').closest('td').find('.ajaxloader').hide();
	},
	
	base_name: function(path)
	{
		return path.replace(/\\/g,'/').replace( /.*\//, '' );
	},
	
	uniqid: function() {
	    var ts=String(new Date().getTime()), i = 0, out = '';
	    for(i=0;i<ts.length;i+=2) {        
	       out+=Number(ts.substr(i, 2)).toString(36);    
	    }
	    return ('d'+out);
	},
	
	removeFile: function(obj)
	{
		var id = $(obj).attr('data-id');
		$.post('teaching-jobs/ajax-remove-upload',{file_name:$('#'+id).val()});
		$('#'+id).remove();
		$(obj).closest('li').remove();
	},
	
	blind: function()
	{
		$('ul.list-upload a.remove').off('click').click(function(){
			ApplyJobs.removeFile(this);
		});
	},
	
	slipSrc: function(str)
	{		
		return str.match(/^\{(.*)\}(.*)/);
	},
	
	rememberVal: function()
	{
		$('input.old-upload').each(function(){
			var element = $(this).attr('name').replace('[]', '');
			var $list = $('input[name="name"][value="'+ element +'"]').closest('tr').find('ul.list-upload');
			var data = ApplyJobs.slipSrc($(this).val());
			
			switch (ApplyJobs.getType(element))
			{
				case 'doc':
					$list.append('<li>'+ data[1] +'<a href="javascript:void(0)" class="remove" data-id="'+$(this).attr('id')+'">remove</a></li>');
					break;
		
				case 'img':
					$list.append('<li>'+ data[1] +'<a href="javascript:void(0)" class="remove" data-id="'+$(this).attr('id')+'">remove</a></li>');
					//$list.append('<li><img src="'+ data[2] +'" title="'+ data[1] +'"><a href="javascript:void(0)" class="remove" data-id="'+$(this).attr('id')+'">remove</a></li>');
					break;
			}
		});
		
		this.blind();
	},
	
	getType: function(type)
	{
		switch (type)
		{
			case 'file_cv':
			case 'file_cover_letter':
				return 'doc';
				break;

			case 'file_university_degree':
			case 'file_certificates':
			case 'file_passport':
				return 'img';
				break;
		}
	},
	
	// valid form submit
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
						case ApplyJobs.isNotSet($(this).val()):
							$(this).addClass(ApplyJobs.setting.input_invalid);
							isValid = false;
							break;
							
						case ! ApplyJobs.validateEmail($(this).val()):
							$(this).addClass(ApplyJobs.setting.input_invalid);
							isValid = false;
							break;
							
						default:
							$(this).removeClass(ApplyJobs.setting.input_invalid);
							break;
					}
					break;
					
				default:
					if (ApplyJobs.isNotSet($(this).val())) {
						$(this).addClass(ApplyJobs.setting.input_invalid);
						isValid = false;
					}
					else {
						$(this).removeClass(ApplyJobs.setting.input_invalid);
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
	
	validPosition: function()
	{
		var isValid = false;
		
		// valid 1st choise
		$('input[name="id_position"]:checked').each(function(){
			isValid = true;
			$('.radio-check').removeClass(ApplyJobs.setting.input_invalid);
		});
		
		if (! isValid)
		{
			$('.radio-check').addClass(ApplyJobs.setting.input_invalid);
		}
		console.log(isValid);
		return isValid;
	},
}