
(function($) {
	
  $.fn.slider_ama = function(options){
   
    // Initial configuration
	  var scripts = document.getElementsByTagName("script");

	  var jsFolder = "";

	    for (var i= 0; i< scripts.length; i++)

	    {

	        if( scripts[i].src && scripts[i].src.match(/slider-ama\.js/i))

	            jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);

	    }    
	    var config = $.extend({
    		jsfolder:jsFolder,

            width:630,

            height:362,

            skinsfoldername:"",

            loadimageondemand:false,

            isresponsive:true,

            autoplayvideo:false,

            pauseonmouseover:false,

            addmargin:true,

            randomplay:false,

            playvideoonclickthumb:false,

            slideinterval:5000,

            enabletouchswipe:true,

            transitiononfirstslide:false,

            loop:0,

            autoplay:true,

            navplayvideoimage:"play-32-32-0.png",

            navpreviewheight:60,

            timerheight:2,

            shownumbering:false,

            skin:"Gallery",

            textautohide:false,

            addgooglefonts:true,

            navshowplaypause:true,

            navshowplayvideo:true,

            navshowplaypausestandalonemarginx:8,

            navshowplaypausestandalonemarginy:8,

            navbuttonradius:0,

            navthumbnavigationarrowimageheight:32,

            navpreviewarrowheight:8,

            showshadow:false,

            navfeaturedarrowimagewidth:16,

            navpreviewwidth:120,

            googlefonts:"Inder",

            textpositionmarginright:24,

            bordercolor:"#e7e7e7",

            navthumbnavigationarrowimagewidth:32,

            navthumbtitlehovercss:"text-decoration:underline;",

            arrowwidth:32,

            texteffecteasing:"easeOutCubic",

            texteffect:"slide",

            navspacing:15,

            navarrowimage:"navarrows-28-28-0.png",

            ribbonimage:"ribbon_topleft-0.png",

            navwidth:120,

            showribbon:false,

            arrowtop:50,

            timeropacity:0.6,

            navthumbnavigationarrowimage:"carouselarrows-32-32-0.png",

            navshowplaypausestandalone:false,

            navpreviewbordercolor:"#ffffff",

            ribbonposition:"topleft",

            navthumbdescriptioncss:"display:block;position:relative;padding:2px 4px;text-align:left;font:normal 12px Arial,Helvetica,sans-serif;color:#333;",

            navborder:1,

            navthumbtitleheight:20,

            textpositionmargintop:24,

            navswitchonmouseover:false,

            playvideoimage:"playvideo-64-64-0.png",

            arrowimage:"arrows-32-32-0.png",

            textstyle:"none",

            playvideoimageheight:64,

            navfonthighlightcolor:"#666666",

            showbackgroundimage:false,

            navpreviewborder:4,

            navopacity:0.8,

            shadowcolor:"#aaaaaa",

            navbuttonshowbgimage:true,

            navbuttonbgimage:"navbuttonbgimage-28-28-0.png",

            textbgcss:"display:block; position:absolute; top:0px; left:0px; width:100%; height:100%; background-color:#fff; -webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius: 2px; opacity:0.7; filter:alpha(opacity=70);",

            playvideoimagewidth:64,

            bottomshadowimagewidth:110,

            showtimer:true,

            navradius:0,

            navshowpreview:false,

            navmarginy:16,

            navmarginx:16,

            navfeaturedarrowimage:"featuredarrow-16-8-0.png",

            navfeaturedarrowimageheight:8,

            navstyle:"thumbnails",

            textpositionmarginleft:24,

            descriptioncss:"display:block; position:relative; font:14px Inder,Arial,Tahoma,Helvetica,sans-serif; color:#333;",

            navplaypauseimage:"navplaypause-48-48-0.png",

            backgroundimagetop:-10,

            arrowstyle:"none",

            timercolor:"#ffffff",

            numberingformat:"%NUM/%TOTAL ",

            navfontsize:12,

            navhighlightcolor:"#333333",

            navimage:"bullet-24-24-5.png",

            navheight:80,

            navshowplaypausestandaloneautohide:true,

            navbuttoncolor:"",

            navshowarrow:false,

            navshowfeaturedarrow:false,

            titlecss:"display:block; position:relative; font: 16px Inder,Arial,Tahoma,Helvetica,sans-serif; color:#000;",

            ribbonimagey:0,

            ribbonimagex:0,

            navshowplaypausestandaloneposition:"bottomright",

            shadowsize:5,

            arrowhideonmouseleave:1000,

            navshowplaypausestandalonewidth:48,

            navshowplaypausestandaloneheight:48,

            backgroundimagewidth:120,

            navcolor:"#999999",

            navthumbtitlewidth:120,

            navpreviewposition:"top",

            arrowheight:32,

            arrowmargin:8,

            texteffectduration:1000,

            bottomshadowimage:"bottomshadow-110-95-4.png",

            border:1,

            timerposition:"bottom",

            navfontcolor:"#333333",

            navthumbnavigationstyle:"arrow",

            borderradius:0,

            navbuttonhighlightcolor:"",

            textpositionstatic:"bottom",

            navthumbstyle:"imageonly",

            textcss:"display:block; padding:8px 16px; text-align:left; ",

            navbordercolor:"#e7e7e7",

            navpreviewarrowimage:"previewarrow-16-8-0.png",

            showbottomshadow:false,

            navdirection:"horizontal",

            textpositionmarginstatic:0,

            backgroundimage:"",

            navposition:"bottom",

            navpreviewarrowwidth:16,

            bottomshadowimagetop:95,

            textpositiondynamic:"bottomleft",

            navshowbuttons:false,
            
            shownavcontrol:true,

            navthumbtitlecss:"display:block;position:relative;padding:2px 4px;text-align:left;font:bold 14px Arial,Helvetica,sans-serif;color:#333;",

            textpositionmarginbottom:24,

            slide: {

                duration:1000,

                easing:"easeOutCubic",

                checked:true

            },

            crossfade: {

                duration:1000,

                easing:"easeOutCubic",

                checked:true

            },

            fade: {

                duration:1000,

                easing:"easeOutCubic",

                checked:true

            },

            blocks: {

                columncount:5,

                checked:true,

                rowcount:5,

                effects:"topleft,bottomright,top,bottom,random",

                duration:1500,

                easing:"easeOutCubic"

            },

            blinds: {

                duration:2000,

                easing:"easeOutCubic",

                checked:true,

                slicecount:3

            },

            transition:"slide,crossfade,fade,blocks,blinds"
    },options);
    return this.amazingslider(config);
  };
}(jQuery));