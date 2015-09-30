/**
 * Quy trình chạy. Nhúng mã bên dưới ở trên thẻ </body>
 *		<script src="../dev.marketing.ila.com/static/api/dms-analytics.js"></script>
 *      <script type="text/javascript">
 *			_swga.init('SW-000001', "reg", "method");
 *			_swga.loadForm({fullname:'ho, ten', email:'email', phone:'dien_thoai', gender:'gioi_tinh', city:'tinh'});
 *      </script>
 * Đoạn script này có chức năng:
 *		- Phân tích tham số google analytics (utm_campaign, utm_medium, utm_source)
 * 		- Xác định landing page của user (Landing page là link đầu tiên truy cập hoặc link đặt quảng cáo)
 *		- Khi form đăng ký thông tin submit. Script này sẽ truyền thông tin của form, analytics, landing page tới trang thêm lead của tool.
 *		- Sau khi truyển xong thì gọi form submit để giao quyền kiểm soát form lại cho website.
 * 		- Trường hợp thêm thành công lead. Script sẽ truyền thông tin conversion cho google analytics
 *
 * (Note:)
 *		- profile_id: có định dạng "SW-XXXXXX". XXXXXX là ID product;
 *		- method: phương thức gửi dữ liệu sang marketing tool. có giá trị mặc định là 'default'. Các tùy chọn khác: 'default', 'callback', 'manual'
 *			+ 'default': chiếm quyền ưu tiên gửi dữ liệu khi form submit
 *			+ 'callback': kiểm tra valid qua function callback _swga.callback_valid truyền vào. Nếu valid thì hàm callback trả về true, ngược lại trả về false để thư viện tiến hành gửi dữ liệu.
 * 			+ 'manual': Thư viện không tự gửi dữ liệu sang marketing tool mà phải thực hiện một cách thủ công. Khi muốn truyền dữ liệu sang form thì gọi hàm _swga.postLead().
 * 			++++++ Lưu ý: khi gửi dữ liệu xong thì form sẽ tự submit.
 * 
 * @version: v1.1.0
 */
 
window._swga = {
	profile_id: '',
	form_id: '',
	form_fields: {fullname:'fullname',gender:'gender', email:'email', phone:'phone', mobile:'mobile', address:'address', id_city:'id_city', id_city:'id_country'},
	_options: {date_format:'d/m/Y'},
	is_process: false,
	isSubmit : true,
	base_url_post : '',
	callback_valid: null,
	
	data:{
		curSearch: window.location.search.substring(1),
		referrer: document.referrer
	},
	
	_ga:{
		campaign: '',
		source: '',
		medium: ''
	},
	
	init: function(profile_id, form_id, submit)
	{		
		this.addLead();
		this.profile_id = profile_id;
		this.form_id 	= form_id;
		
		if (this.data.curSearch != '' || this.data.referrer != '')
		{
			this.analytics();
		}
		
		this.generalLandingPage();
		
		var form = document.getElementById(this.form_id);
		var obj  = this;
		
		if (this.isNotSet(form)) {
				return;
		}
		
		// check submit type
		var submitType = ['default', 'callback', 'manual'];
		
		if (this.isNotSet(submit) || submitType.indexOf(submit) == -1) {
			submit = 'default';
		}
		
		// register form submit
		switch(submit)
		{
			case 'default':
				try{
					form.addEventListener("submit", function(e) {
						e.preventDefault();
						obj.postLead();
						return false;
					});
				}
				catch(err)
				{
					form.attachEvent("onsubmit", function(event) {
						(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
						obj.postLead();						
						return false;
					});
				}
				break;
				
			case 'callback':
				try{
					form.addEventListener("submit", function(e) {
						e.preventDefault();
						
						if (typeof obj.callback_valid == 'function') {
							if (obj.callback_valid()) {
								obj.postLead();
							}
						}					
						
						return false;
					});
				}
				catch(err)
				{
					form.attachEvent("onsubmit", function(event) {
						(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
						
						if (typeof obj.callback_valid == 'function') {
							if (obj.callback_valid()) {
								obj.postLead();
							}
						}
						
						return false;
					});
				}
				break;
		}
	},
	
	
	addLead: function()
	{
		if (typeof window.ga == 'function' && this.isset(sessionStorage.sw_success) && sessionStorage.sw_success == 1)
		{
			// send lead when register successful
			sessionStorage.removeItem('sw_success');
			window.ga('send', 'event', 'category', 'action', {'metric1': 1});
		}
	},
	
	
	loadForm: function(fields, $options)
	{
		this.form_fields = fields;
		
		if (typeof $options != 'undefined') {
			this._options = this.mergeRecursive(this._options, $options);
		}
	},
	
	/**
	 * Analytics param from url
	 */
	analytics: function()
	{
		var matchUrl = {
			seo: /^(http:\/\/|https:\/\/)?(www\.)?google(\.com?)?(\.[a-z]{2})?(.*)?$/, 
			adw: /^(http:\/\/|https:\/\/)?(www\.)?doubleclick\.net(.*)?$/i, 
			direct: new RegExp('^(http:\/\/|https:\/\/)?(www\.)?'+ window.location.host +'(.*)?$')
		};

		var params = this.getParams(this.data.curSearch);
		
		if (this.isset(params['utm_source'])) // isset utm_source, utm_campaign, utm_medium
		{
			this._ga.source = params['utm_source'];
			this._ga.campaign = this.isset(params['utm_campaign']) ? params['utm_campaign'] : '';
			this._ga.medium = this.isset(params['utm_medium']) ? params['utm_medium'] : '';
		}
		else
		{
			if (this.isset(this.data.referrer) && ! this.data.referrer.match(matchUrl.direct))
			{
				this._ga.campaign = ''; // current campaign
		
				if (this.isset(params['gclid'])
						&& ( this.data.referrer.match(matchUrl.seo) // referrer from google
								|| this.data.referrer.match(matchUrl.adw) )  // referrer from doubleclick.net
				)
				{
					this._ga.source = 'google';
					this._ga.medium = 'cpc'; // google adword
				}
				else if( this.data.referrer.match(matchUrl.seo) )
				{
					var $source = this.parseUrl(this.data.referrer);
					this._ga.source = $source['host'];
					this._ga.medium = 'organic'; // SEO
				}
				else 
				{
					var $source = this.parseUrl(this.data.referrer);
					this._ga.source = $source['host'];
					$medium = 'referral'; // Reference
				}
			}
			else
			{
				// khong luu session
				return;
			}
		}

		sessionStorage.setItem("sw_campaign",this._ga.campaign);
		sessionStorage.setItem("sw_source",this._ga.source);
		sessionStorage.setItem("sw_medium",this._ga.medium);
	},
	
	/**
	 * General landing page
	 */
	generalLandingPage: function()
	{
		var landingPage = window.location.pathname + window.location.search;
		var flag = false;
		
		// filter google analytic param
		landingPage = landingPage.replace(/utm_campaign(=([^\&]*))?\&?/, '');
		landingPage = landingPage.replace(/utm_source(=([^\&]*))?\&?/, '');
		landingPage = landingPage.replace(/utm_medium(=([^\&]*))?\&?/, '');
		landingPage = landingPage.replace(/gclid=([^\&]*)\&?/, '');
		
		if (landingPage != (window.location.pathname + window.location.search)) {
			flag = true;
			landingPage = landingPage.replace(/[\?\&]$/, '');
		}
		
		if (this.isNotSet(sessionStorage.sw_landing_page) || flag)
		{
			sessionStorage.setItem("sw_landing_page",landingPage);
		}
	},
	
	/**
	 * add lead to marketing tool
	 */
	postLead: function()
	{
		// not allow multi click
		if (this.is_process)
			return;
		
		this.is_process = true;
		
		var q = [];
		var form = document.getElementById(this.form_id);	
		var ga = this.getGA();
		
		// add Google Analytics param to form data
		for (field in ga)
		{
			q.push(field + '=' + encodeURIComponent(ga[field]) );
		}
		
		// add option to form data
		q.push('_op_date_format=' + encodeURIComponent(this._options.date_format) );
		
		// get form data
		for(field in this.form_fields)
		{
			try
			{
				switch (field)
				{					
					default:						
						var part = this.form_fields[field].split(",");
						var val = [];
						
						for(i in part) {
							val.push(form[ part[i].trim() ].value);
						}
						
						q.push(field + '=' + encodeURIComponent(val.join(' ')) );
						break;
				}
			}catch(ex) {}
		}
		
		//var base_url = "../marketingtool.ilavietnam.edu.vn";
		//var base_url = "../dev.marketing.ila.com";
		//var base_url = "../ila.marketing.silkwires.com";
		this._ajax(_swga.base_url_post + '/add-lead/index/p/'+ this.profile_id + '?url=' + encodeURIComponent(location.href), q.join('&'), function(){
			if (window._swga._xmlhttp.responseText == 'Insert successful!') {
				sessionStorage.setItem("sw_success", 1);
			}
			if(_swga.isSubmit){
				document.getElementById(window._swga.form_id).submit();
			}
		});
	},
	
	getGA: function()
	{
		return {
			sw_campaign: this.isset(sessionStorage.sw_campaign) ? sessionStorage.sw_campaign : '',
			sw_medium: this.isset(sessionStorage.sw_medium) ? sessionStorage.sw_medium : '',
			sw_source: this.isset(sessionStorage.sw_source) ? sessionStorage.sw_source : '',
			sw_landing_page: this.isset(sessionStorage.sw_landing_page) ? sessionStorage.sw_landing_page : ''
		};
	},
	
	/******** HELPER FUNCTION ************/
	
	isset: function(val)
	{
		return ( typeof val != 'undefined' && val != null && val != '' );
	},
	
	isNotSet: function(val)
	{
		return ( typeof val == 'undefined' || val == null || val == '' );
	},
	
	/**
	 * Merge the contents of two objects together into the first object.
	 */
	mergeRecursive: function(obj1, obj2)
	{
		for (var p in obj2)
		{
    		try
			{ // Property in destination object set; update its value.
				if (obj2[p].constructor==Object) {
					obj1[p] = this.mergeRecursive(obj1[p], obj2[p]);
				}
				else {
					obj1[p] = obj2[p];
				}
    		}
			catch(e)
			{// Property in destination object not set; create it and set its value.
				obj1[p] = obj2[p];
			}
		}

  		return obj1;
	},
	
	/**
	 * Get param from url
	 */
	getParams: function(search_string)
	{
		var parse = function(params, pairs)
		{
			var pair = pairs[0];
			var parts = pair.split('=');
			var key = decodeURIComponent(parts[0]);
			var value = decodeURIComponent(parts.slice(1).join('=').replace(/[+]/g,"%20"));
	
			// Handle multiple parameters of the same name
			if (typeof params[key] === "undefined") {
				params[key] = value;
			}
			else {
				params[key] = [].concat(params[key], value);
			}
		
			return pairs.length == 1 ? params : parse(params, pairs.slice(1))
		}

		// Get rid of leading ?
		return search_string.length == 0 ? {} : parse({}, search_string.split('&'));
	},
	
	/**
	 * parse param of url
	 */
	parseUrl: function(url)
	{
		var parser = document.createElement('a');
		parser.href = url;
		return this.getParams(parser.search);
	},
	
	/**
	 * Init XMLHttp request object
	 */
	_initXMLHttp: function()
	{
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			this._xmlhttp = new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			this._xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	},
	
	/**
	 * call ajax request
	 */
	_ajax: function(url, data, callback, method)
	{
		// init xml http request
		this._initXMLHttp();
		
		if (typeof method === 'undefined') {
			method = "POST";
		}
		
		var errorCallback = function(){
			console.log('Post data error');
			document.getElementById(window._swga.form_id).submit();
		};

		if(window.XDomainRequest)
		{
			this._xmlhttp = new XDomainRequest();
			this._xmlhttp.open(method, url, true);
			this._xmlhttp.onerror = errorCallback;
			this._xmlhttp.onload = function() {
				callback();
			};
			this._xmlhttp.send(data);
		}
		else
		{
			// send data
			this._xmlhttp.onerror = errorCallback;
			this._xmlhttp.onreadystatechange = function(){
				if (window._swga._xmlhttp.readyState==4 && window._swga._xmlhttp.status==200)
				{
					callback();					
				}
			};
			this._xmlhttp.open(method, url, true);
			//this._xmlhttp.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
			this._xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			this._xmlhttp.send(data);
		}
	},
	
	_createXmlHttp: function(id)
	{   /*Creates an ActiveX object used by Internet Explorer that will make Ajax calls*/
		var xmlHttp = null;
		try 
		{
		  xmlHttp = new ActiveXObject(id);
		}catch(e) {}
		return xmlHttp;
	}
}

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}