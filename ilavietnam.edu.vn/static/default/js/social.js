var share = {
    link: '',
    print: '',
    init: function() {
    	share.renderShare();

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
    }
    ,
    renderShare: function() {

        $('a.btn_facebook').click(function(e) {
            var url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(share.link);
            var newwindow = window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=450,width=710');
            if (window.focus) {
                newwindow.focus();
            }
            e.preventDefault();
        });


        $('a.btn_google').click(function(e) {
            var url = 'https://plus.google.com/share?url=' + encodeURI(share.link);
            var newwindow = window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=no,height=450,width=520');
            if (window.focus) {
                newwindow.focus();
            }
            e.preventDefault();
        });


        $('a.btn_twitter').click(function(e) {
            var url = 'https://twitter.com/share?url=' + encodeURI(share.link);
            var newwindow = window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=no,height=450,width=710');
            if (window.focus) {
                newwindow.focus();
            }
            e.preventDefault();
        });



        $('a.print-window').click(function(e) {
            var url = encodeURI( share.updateParam(share.link,'print','true'));
            var newwindow = window.open(url, '_blank', 'height=450,width=710');
            if (window.focus) {
                newwindow.focus();
            }
            e.preventDefault();
        });

        $('a.print-action').click(function(e) {
            window.print();
            return false;
        });
    }





}