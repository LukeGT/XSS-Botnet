// Allow easy bootstrapping of scripts. 'done' is called once the script has loaded, allowing dependency chaining. 
___ = { include: function(script, done) {
    var tag = document.createElement('script');
    document.head.appendChild(tag);
    tag.setAttribute('src', script);
    tag.onload = function() {
        document.head.removeChild(tag);
        if (done) done();
    }
} };
___.include('//www.cse.unsw.edu.au/~lukegt/___/initretrofit_iframe.js');
