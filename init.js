___ = {};
___.include = function(script) { setTimeout(function(){ 
    var tag = document.createElement('script');
    document.head.appendChild(tag);
    tag.setAttribute('src', script); 
}, 0);}; 
window.onload = function() { ___.include('http://www.cse.unsw.edu.au/~lukegt/___/initretrofit.js'); };
if (document.readyState == 'complete') { window.onload() };
