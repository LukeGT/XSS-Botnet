___.$(function($) {

    // Replace the page with an iframe at the same URL
    ___.retrofit = function() {
        var href = window.location.href;
        var $iframe = $('<iframe>').attr('src', href).attr('style', 'width:100%; border:0; position:absolute; height:100%');
        $('body').replaceWith($iframe);
    };

    // If this script is living in the top-level (not inside the iframe)
    if (top == window) {

        ___.retrofit();

        $('iframe').on('load', function() {
            history.replaceState({}, '', this.contentWindow.location.href);
            $('title').text($(this).contents().find('title').text());
        });

    } else {
        // cross-document messaging muckabout
        window.parent.postMessage('Waddup, cunt', 'sick one');
    }
});
