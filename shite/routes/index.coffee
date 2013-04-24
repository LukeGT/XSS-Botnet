# GET home page.

exports.index = (req, res) ->
  res.render 'index', title: 'Happi Foto Home!', active: 'Home'