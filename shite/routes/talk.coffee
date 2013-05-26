fs = require 'fs'
util = require '../util'

validateTalk = (talk) ->
  talk.replace /<(?!\/?(img|a)[^\w])/gi, '&lt;'

exports.get = (req, res) ->

  talkFile = 'data/talk/' + util.imageToURL req.params.image

  fs.exists talkFile, (exists) ->

    talks = []
    render = -> res.render 'talk',
      title: 'Talk Happi Foto!',
      active: 'none',
      image: unescape(req.params.image),
      talks: talks

    if exists

      fs.readFile talkFile, (err, data) ->

        if err
          console.error
        else
          for talk in data.toString().split '\n' when talk.length
            talks.push validateTalk talk

        render()

    else

      fs.open talkFile, 'w', (err) ->
        render()

exports.post = (req, res) ->

  talkFile = 'data/talk/' + util.imageToURL req.params.image
  fs.appendFile talkFile, req.body.talk + '\n'
  res.redirect req.path
