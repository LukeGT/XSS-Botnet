___.$(function($) {
    ___.fire = function(payload) {
        $(document).trigger({
            type: '___',
            payload: payload
        });
    };
    if (window.parent == window) {
        $(document).on('___', function(event) {
            var payload = event.payload;
            payload.task.call(this, function(result) {
                $.ajax({
                    url: payload.return,
                    type: "POST",
                    data: {
                        key: payload.key,
                        result: result
                    }
                });
            });
        });
    }
});