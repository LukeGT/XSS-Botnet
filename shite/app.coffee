# Module dependencies.

express = require 'express'
routes = require './routes'
browse = require './routes/browse'
link = require './routes/link'
talk = require './routes/talk'
http = require 'http'
path = require 'path'
stylus = require 'stylus'

app = express()

# all environments
app.set 'port', process.env.PORT || 3000
app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'

app.use express.favicon()
app.use express.logger 'dev'
app.use express.bodyParser()
app.use express.methodOverride()
app.use app.router
app.use stylus.middleware __dirname + '/public'
app.use express.static path.join __dirname, 'public'

# development only
if 'development' == app.get 'env'
  app.use express.errorHandler()

app.get '/', routes.index
app.get '/browse', browse.get
app.get '/link', link.get
app.post '/link', link.post
app.get '/talk/:image', talk.get
app.post '/talk/:image', talk.post

http.createServer(app).listen app.get('port'), ->
  console.log 'Express server listening on port ' + app.get 'port'
