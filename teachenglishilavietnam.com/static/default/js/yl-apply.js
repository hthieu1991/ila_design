var ApplyNowCommon = {
	
	setting: {
		input_invalid: 'input-invalid',
	},
	
	isset: function(val){
		return ( typeof val != 'undefined' && val != null && val.trim() != '' ) ;
	},
	
	isNotSet: function(val){
		return ( typeof val == 'undefined' || val == null || val.trim() == '' ) ;
	},
	
	validRequire: function(object)
	{
		var isValid = true;
		
		if (typeof object == 'undefined') {
			object = 'input.required';
		}
		
		$(object).each(function(){ 
			switch($(this).attr('data-type'))
			{
				case 'email':
					switch(true)
					{
						case ApplyNowCommon.isNotSet($(this).val()):
							$(this).addClass(ApplyNowCommon.setting.input_invalid);
							isValid = false;
							break;
							
						case ! ApplyNowCommon.validateEmail($(this).val()):
							$(this).addClass(ApplyNowCommon.setting.input_invalid);
							isValid = false;
							break;
							
						default:
							$(this).removeClass(ApplyNowCommon.setting.input_invalid);
							break;
					}
					break;
					
				default:
					if (ApplyNowCommon.isNotSet($(this).val())) {
						$(this).addClass(ApplyNowCommon.setting.input_invalid);
						isValid = false;
					}
					else {
						$(this).removeClass(ApplyNowCommon.setting.input_invalid);
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
	
	doLater: function()
	{
		$('input[name="do_later"]').val(1);
		$('#frmTeaching').submit();
	},
};

var ApplyNow = {
	__proto__: ApplyNowCommon,
	is_submit : false,
	
	manager: function()
	{
		$('#frmTeaching').submit(function(){
			ApplyNow.is_submit = true;
			return ApplyNow.validCourseDate() && ApplyNow.validRequire();
		});
		
		$( ".datepicker" ).datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			changeYear: true,
			dateFormat: "dd/mm/yy",
			maxDate: 0,
			yearRange: "c-60:c+0"
		});
		
		/** Don't allow select same value on 2 choosen **/
		$('input[name="course_date1"]').click(function(){
			ApplyNow.checkCourseDate('input[name="course_date1"]', 'input[name="course_date2"]');
			if (ApplyNow.is_submit)	{
				ApplyNow.validCourseDate();
			}
		});
		
		$('input[name="course_date2"]').click(function(){
			ApplyNow.checkCourseDate('input[name="course_date2"]', 'input[name="course_date1"]');
		});
		
		ApplyNow.checkCourseDate('input[name="course_date1"]', 'input[name="course_date2"]');
		ApplyNow.checkCourseDate('input[name="course_date2"]', 'input[name="course_date1"]');
		
		$('input.required').blur(function(){
			if (ApplyNow.is_submit)	{
				ApplyNow.validRequire();
			}
		});
		
		/** choose only one **/		
		$('#learning_disabilities').click(function(){
			if ($(this).is(':checked') ) {
				$('#health_problem:checked').prop('checked', false);
			}
			ApplyNow.displayDisabilitiesNote2();
		});
		
		$('#health_problem').click(function(){
			if ($(this).is(':checked') ) {
				$('#learning_disabilities:checked').prop('checked', false);
			}
			
			ApplyNow.displayDisabilitiesNote();
		});
		
		this.displayDisabilitiesNote3();
	},

    displayDisabilitiesNote3: function()
    {
        if ($('#health_problem').is(':checked') || $('#learning_disabilities').is(':checked'))
        {
            $('#specify-health').show();
            if($('#health_problem').is(':checked'))
            {
                $('#txt_check').html('Please, specify any health problem you may have');
            }
            else
            {
                $('#txt_check').html('Please, specify any learning disabilities you may have');
            }


        }
        else
        {
            $('#specify-health').hide();
        }
    },

    displayDisabilitiesNote2: function()
    {
        if ($('#health_problem').is(':checked') || $('#learning_disabilities').is(':checked'))
        {
            $('#specify-health').show();
            $('#txt_check').html('Please, specify any learning disabilities you may have');
        }
        else
        {
            $('#specify-health').hide();
        }
    },

	displayDisabilitiesNote: function()
	{
		if ($('#health_problem').is(':checked') || $('#learning_disabilities').is(':checked'))
		{
			$('#specify-health').show();
            $('#txt_check').html('Please, specify any health problem you may have');
		}
		else
		{
			$('#specify-health').hide();
		}
	},
	
	checkCourseDate: function(source, dest)
	{
		var selVal = $(source+':checked').val();
		$(dest).prop('disabled', false);
		$(dest+'[value="'+selVal+'"]').prop('disabled', true);
	},
	
	validCourseDate: function()
	{
		var isValid = false;
		
		// valid 1st choise
		$('input[name="course_date1"]:checked').each(function(){
			isValid = true;
			$('#1stchoice').removeClass(ApplyNow.setting.input_invalid);
		});
		
		if (! isValid)
		{
			$('#1stchoice').addClass(ApplyNow.setting.input_invalid);
		}
		
		return isValid;
	},
	
};

var ApplyNow0 = {
	__proto__: ApplyNowCommon,
	is_add: false,
	is_submit : false,
	
	manager: function()
	{
		this.blindTableEvent();
		
		$('#frmTeaching').submit(function(){
			ApplyNow0.is_submit = true;
			return ApplyNow0.validRequire('input.edu-require'); //&& ApplyNow0.validRequire('.required')
		});
		
		$('a#add-education').click(function(){
			ApplyNow0.addEducation();
		});
		
		$('.required').blur(function(){
			if (ApplyNow0.is_submit)	{
				ApplyNow0.validRequire('.required');
			}
		});
	},
	
	addEducation: function()
	{
		if (this.checkFillRow()) {
			ApplyNow0.is_add = true;
			ApplyNow0.validRequire('input.edu-require');
			return;
		}
		
		$('#education-table tbody').append(
				"<tr>" +
				"	<td><input name=\"education[subject][]\" type=\"text\" class=\"txt-input edu-require\"/></td>" +
				"	<td><input name=\"education[year][]\" type=\"text\" class=\"txt-input edu-require\"/></td>" +
				"	<td>" +
				"		<input name=\"education[school][]\" type=\"text\" class=\"txt-input edu-require\"/>" +
				"		<a href=\"javascript:void(0)\" class=\"remove\" title=\"Remove\">close</a>" +
				"	</td>" +
				"</tr>"
		);
		this.blindTableEvent();
		ApplyNow0.is_add = false;
	},
	
	blindTableEvent: function()
	{
		$('#education-table a.remove').click(function(){
			$(this).closest('tr').remove();
		});
		
		$('input.edu-require').off('blur').blur(function(){
			if (ApplyNow0.is_add)	{
				ApplyNow0.validRequire('input.edu-require');
			}
		});
	},
	
	checkFillRow: function()
	{
		try {
			var subject = $('input[name="education[subject][]"]').last().val().trim();
			var year 	= $('input[name="education[year][]"]').last().val().trim();
			var school	= $('input[name="education[school][]"]').last().val().trim();
		}
		catch(err) {
			return false;
		}
				
		return (subject == '') || (year == '') || (school == ''); 
	},
};

var ApplyNow10 = {
	__proto__: ApplyNowCommon,
	is_submit : false,
		
	manager: function()
	{
		$('#frmTeaching').submit(function(){
			return true;
			ApplyNow10.is_submit = true;
			return ApplyNow10.validRequire('.required');
		});
		
		$('.required').blur(function(){
			if (ApplyNow10.is_submit)	{
				ApplyNow10.validRequire('.required');
			}
		});
		
		$('input[name="about_us[]"]').click(function(){
			ApplyNow10.displayAboutUsOther();
		});
		
		ApplyNow10.displayAboutUsOther();
	},
	
	displayAboutUsOther: function()
	{
		$('input[name="about_us[]"]').each(function(){
			if ($(this).is(':checked'))
			{
				$(this).parent().find('.display-check').show();
			}
			else
			{
				$(this).parent().find('.display-check').hide().val('');
			}
		});
	},
};


var ApplyNow70 = {
	__proto__: ApplyNowCommon,
	is_submit : false,
		
	manager: function()
	{
		$('#frmTeaching').submit(function(){
			if ($('#condition7').is(':checked'))
			{
				return true;
				ApplyNow70.is_submit = true;
				return ApplyNow10.validRequire('.required');
			}
			
			alert('You must check confirm to accept the our conditions.');
			return false;
		});
		
		$('.required').blur(function(){
			if (ApplyNow70.is_submit)	{
				ApplyNow70.validRequire('.required');
			}
		});
	},
};


var ApplyNow80 = {
	__proto__: ApplyNowCommon,
		
	manager: function()
	{
		$('.upload-document').change(function(){
			$(this).closest('.frmUpload').submit();
			$(this).parent().hide();
			$(this).closest('.frmUpload').find('img.ajaxloader').show();
		});
		
		$('.frmUpload').ajaxForm({
			beforeSend: function() {
		        
		    },
			complete: function(xhr) {
				
				try {
					data = $.parseJSON(xhr.responseText);
				}
				catch(err) {
					alert('Error');
					return;
				}
				
				if (data.result == 1) {
					$('#'+data.ele).parent().removeClass('yl-upload').addClass('yl-change').find('span.text').html('change');
					$('#'+data.ele).parent().find('span.view').html('<a href="'+ data.src +'" target="_target">'+ data.file_name +'</a>');
				}
				else {
					$('#'+data.ele).parent().find('span.view').html('<font color="#f00">- '+data.message+'</font>');
				}
				
				$('#'+data.ele).parent().show();
				$('#'+data.ele).closest('.frmUpload').find('img.ajaxloader').hide();
			},
		});
	},
};