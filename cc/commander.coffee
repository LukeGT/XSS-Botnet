#!/usr/bin/env coffee

require "./lib/Barrett"
require "./lib/BigInt"
require "./lib/RSA"

request = require 'request'
coffee = require 'coffee-script'
$ = require 'jquery'

global.url = 'http://wagner.cse.unsw.edu.au:3977'

global.queue = (func) ->

  promise = $.Deferred()

  request.post
    uri: "#{url}/queue"
    json:
      data: encryptedString hackerKey, func.toString()

  , (error, response, body) ->

    if error
      console.log "error occurred:", error, response
      promise.reject()
    else
      console.log "great success"
      promise.resolve()

  return promise

global.pull = ->

  promise = $.Deferred()

  request.get url: "#{url}/pullkey", json: {}, (error, response, body) ->

    if error
      promise.reject()
      return console.log "error getting key:", error, response

    key = decryptedString hackerKey, body.key
    console.log 'got key:', key

    request.get "#{url}/pull?key=#{key}", (error, response, body) ->
      if error
        promise.reject()
        return console.log "error getting results:", error, response

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