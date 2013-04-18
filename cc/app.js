
/**
 * Module dependencies.
 */

var express = require('express')
  , queue = require('./routes/queue')
  , results = require('./routes/results')
  , http = require('http')
  , path = require('path');

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

app.get('/queue', function(req, res){
    res.send("get queue");
});

app.post('/queue', function(req, res){
    res.send("post queue");
});

app.get('/results', function(req, res){
    res.send("get results");
});

app.post('/results', function(req, res){
    res.send("post results");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
