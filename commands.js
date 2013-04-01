___.$(function($) {
    ___.fire = function(payload) {
        $('body').trigger({
            type: '___',
            payload: payload
        });
    };
    if (window.parent == window) {
        $('body').on('___', function(event) {
            console.log("performing task: ", event.payload);
        });
    }
}