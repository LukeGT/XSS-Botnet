___.$(function($) {

    ___.ajax = function(href) {
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
        ___.ajax(href);
    };

    ___.retrofit = function() {
        $('a').each(function() {
            var $this = $(this);
            var href = $this.attr('href');
            if (href) {
                if (href.match(/^(https?:)?\/\//)) {
                    $this.attr('target', '_blank');
                } else {
                    $this.attr('href', "javascript:___.push('" + href + "')");
                }
            }
        });
    };

    ___.retrofit();

    window.onpopstate = function(event) {
        ___.ajax(window.location.href);
    };
});
