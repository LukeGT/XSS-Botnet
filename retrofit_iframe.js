___.retrofit = function() {
    var href = window.location.href;
    $iframe = $('<iframe>').attr('src', href).attr('style', 'width:100%; border:0; position:absolute; height:100%');
    $('body').replaceWith($iframe);
}
$(function() {
    if (window.parent == window) {
        ___.retrofit();
        $('iframe').on('load', function() {

            history.replaceState({}, '', this.contentWindow.location.href);
            $('title').text($(this).contents().find('title').text());

            $(this).contents()
            .on('keydown', function(event) {
                console.log(event.which);
            })
            .on('click', 'a', function() {
                history.pushState({}, '', this.href);
            });
        });
    }
});
