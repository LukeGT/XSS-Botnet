___.$(function($) {

    var $css = $('<style>').text('* { cursor: progress !important }');

    ___.ajax = function(href) {
        $('head').append($css);
        $.ajax({
            url: href,
            success: function(data) {
                $css.remove();
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
                    $this.attr('href', "javascript:___.push('" + escape(href) + "')");
                }
            }
        });
    };

    ___.retrofit();

    window.onpopstate = function(event) {
        ___.ajax(window.location.href);
    };
});
