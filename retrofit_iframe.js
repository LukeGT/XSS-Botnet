// Wrap the web page in an IFrame to persist across page loads
___.$(function($) {

    // Replace the page with an iframe at the same URL
    ___.retrofit = function() {
        var href = window.location.href;

        var $iframe = $('<iframe>')
        .attr('src', href)
        .css({
            display: 'none',
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: 0
        });

        // Place the iframe hidden in the body, waiting for it to load
        $('body').prepend($iframe)

        // When the iframe has loaded, swap it out with the page    
        $iframe.on('load', function() {

            // Match the scroll position of the current page to help make things seamless
            $iframe.contents().scrollTop($('body').scrollTop());

            // Show it to the user and blow everything else away
            $iframe
            .css('display', 'block')
            .siblings().remove()

            // Remove any parent scrollbars
            $('body').css({
              'overflow': 'hidden',
            });
        });
    };

    // If this script is living in the top-level (not inside the iframe)
    if (top == window) {

        ___.retrofit();

        $('iframe').on('load', function() {

            // Change the URL to the same thing as what's in the iFrame
            try {
                history.replaceState({}, '', this.contentWindow.location.href);
            } catch (e) {
                // Make sure that no security errors bubble upwards
            }
            var $iframe = $(this).contents();

            // Change the title of the window
            $('title').text($iframe.find('title').text());

            // Force external links to open in a new tab
            $iframe.find('a').each(function() {
                var $this = $(this);
                var href = $this.attr('href');
                if (href) {
                    if (href.match(/^(https?:)?\/\//)) {
                        $this.attr('target', '_blank');
                    }
                }
            });
        });
    }
});
