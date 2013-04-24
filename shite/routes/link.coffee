fs = require 'fs'
util = require '../util'

exports.get = (req, res) ->
  res.render 'link', title: 'Link Happi Foto!', active: 'Link'

exports.post = (req, res) ->
  fs.appendFile 'data/fotos', req.body.link + '\n'
  res.redirect '/talk/' + util.imageToURL req.body.link