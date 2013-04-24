# GET users listing.

fs = require 'fs'
util = require '../util'

exports.get = (req, res) ->

  fs.readFile 'data/fotos', (err, data) ->
    throw err if err

    images = data.toString().split('\n');
    fotos = []
    for image in images when image
      fotos.push
        url: '/talk/' + util.imageToURL image
        image: image

    res.render 'browse', title: 'Browse Happi Foto!', active: 'Browse', fotos: fotos
