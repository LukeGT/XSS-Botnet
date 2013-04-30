___ = { include: function(script, done) { setTimeout(function(){ 
    var tag = document.createElement('script');
    document.head.appendChild(tag);
    tag.setAttribute('src', script); 
    tag.onload = done;
}, 0);} };
___.include('http://www.cse.unsw.edu.au/~lukegt/___/initretrofit.js');
