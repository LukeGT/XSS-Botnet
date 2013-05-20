#!/usr/bin/env coffee

require "./lib/Barrett"
require "./lib/BigInt"
require "./lib/RSA"

request = require 'request'
coffee = require 'coffee-script'
$ = require 'jquery'

global.url = 'http://wagner.cse.unsw.edu.au:3977'

global.queue = (args...) ->

  func = null
  repeat = 1
  conditions = {}

  if args.length == 1
    [func] = args
  else if args.length == 2
    [repeat, func] = args
  else if args.length == 3
    [repeat, conditions, func] = args

  console.log 'args:', repeat, conditions, func

  promise = $.Deferred()

  request.post
    uri: "#{url}/queue"
    json:
      data: encryptedString hackerKey, func.toString()
      repeat: repeat
      conditions: conditions

  , (error, response, body) ->

    if error || response.statusCode == 400
      console.log "error occurred:", response.statusCode, error, response.body
      promise.reject()
    else
      console.log "great success"
      promise.resolve()

  return promise

global.pull = ->

  promise = $.Deferred()

  request.get url: "#{url}/pullkey", json: {}, (error, response, body) ->

    if error || response.statusCode == 400
      promise.reject()
      return console.log "error getting key:", response.statusCode, error, response.body

    key = decryptedString hackerKey, body.key
    console.log 'got key:', key

    request.get "#{url}/pull?key=#{key}", (error, response, body) ->

      if error || response.statusCode == 400
        promise.reject()
        return console.log "error getting results:", response.statusCode, error, response.body

      console.log 'results:'
      console.log decryptedString hackerKey, body
      promise.resolve()

  return promise

setMaxDigits(19);
hackerKey = new RSAKeyPair "5dd5ad3ab3e3eb5409c0ead832b7a21d", "5dd5ad3ab3e3eb5409c0ead832b7a21d", "907e4e9bdca8832febfa32d958dee42d"

#require('./node_modules/coffee-script/lib/coffee-script/command').run()

process.stdin.resume()
process.stdin.setEncoding 'utf8'

process.stdout.write '> '

process.stdin.on 'data', (chunk) ->

  (coffee.eval chunk).always ->
    process.stdout.write '> '