(function($) {
    ___.load = function() {
        return JSON.parse(localStorage.___ || {});
    };
    ___.save = function(newData) {
        var data = ___.load();
        $.extend(data, newData);
        localStorage.___ = JSON.stringify(data);
    };
    ___.delete = function() {
        var data = ___.load();
        [].slice.call(arguments).forEach(function(key) {
            delete data[key];
        });
        localStorage.___ = JSON.stringify(data);
    };
})(___.$);
