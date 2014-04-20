XSS-Botnet
==========

A proof-of-concept for a browser-based XSS-deliverable botnet which does not exploit browser vulnerabilities but instead sticks to the standards.  

See the slides here:
https://slides.com/luketsekouras/xss-botnet

Most of this project is written in Javascript (you need node), some in coffeescript.  

The `cc` folder is code for the command centre, just run `app.js`.  There is an additional tool at `cc/commander.coffee` used to connect to and use the command centre.  

The `shite` folder contains code for a demo site that was used during presentations.  

In the root directory lies various `*.js` files which constitute the client-side code.  The entry point is either `init_ajax.js` or `init_iframe.js`, depending on what technique you wish to use.  

