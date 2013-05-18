___.$(function($) {

    ___.load = function(href) {
        $('body').css({ cursor: 'progress' });
        $.ajax({
            url: href,
            success: function(data) {
                $('body').css({ cursor: '' });
                $('html')[0].innerHTML = data.replace(/^\s*<\s*html\s*>/i, '').replace(/<\/\s*html\s*>\s*$/i, '');
                ___.retrofit();
            }
        });
    };

    ___.push = function(href) {
        history.pushState({}, '', href);
        ___.load(href);
    };

    ___.retrofit = function() {
        $('a').each(function() {
            var $this = $(this);
            var href = $this.attr('href');
            if (href) {
                if (href.match(/^http/)) {
                    return;
                }
                $this.attr('href', "javascript:___.push('" + href + "')");
            }
        });
    };

    ___.retrofit();

    window.onpopstate = function(event) {
        ___.load(window.location.href);
    };
});