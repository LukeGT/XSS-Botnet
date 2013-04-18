
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

app.get('/queue', queue.get);
app.post('/queue', queue.post);

app.get('/results', results.get);
app.post('/results', results.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
