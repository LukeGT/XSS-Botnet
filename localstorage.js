// Utility functions for managing persistent state
(function($) {

    // Load state from localStorage
    ___.load = function() {
        return JSON.parse(localStorage.___ || "{}");
    };

    // Save some information into localStorage
    ___.save = function(newData) {
        var data = ___.load();
        $.extend(data, newData);
        localStorage.___ = JSON.stringify(data);
    };

    // Delete entries from localStorage
    ___.delete = function() {
        var data = ___.load();
        [].slice.call(arguments).forEach(function(key) {
            delete data[key];
        });
        localStorage.___ = JSON.stringify(data);
    };
})(___.$);
