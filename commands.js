___.$(function($) {
    ___.fire = function(payload) {
        $(document).trigger({
            type: '___',
            payload: payload
        });
    };
    if (window.parent == window) {
        $(document).on('___', function(event) {
            console.log("performing task: ", event.payload);
        });
    }
});