#!/usr/bin/env coffee

require "./lib/Barrett"
require "./lib/BigInt"
require "./lib/RSA"
request = require 'request'

# url = 'http://wagner.cse.unsw.edu.au:3977'
url = 'http://localhost:3977'

setMaxDigits(19);
hackerKey = new RSAKeyPair "5dd5ad3ab3e3eb5409c0ead832b7a21d", "5dd5ad3ab3e3eb5409c0ead832b7a21d", "907e4e9bdca8832febfa32d958dee42d"

process.stdin.resume()
process.stdin.setEncoding 'utf8'

process.stdout.write '> '

process.stdin.on 'data', (chunk) ->

  if chunk.match /^queue /

    func = chunk.replace 'queue ', ''
    console.log 'sending func:', func

    request.post
      uri: "#{url}/queue"
      json:
        data: encryptedString hackerKey, chunk.replace 'queue ', ''
    , (error, response, body) ->

      if error
        console.log "error occurred:", error, response
      else
        console.log "great success"

      process.stdout.write '> '

  else if chunk.match /^pull/

    request.get url: "#{url}/pullkey", json: {}, (error, response, body) ->
      return console.log "error getting key:", error, response if error

      key = decryptedString hackerKey, body.key
      console.log 'got key:', key

      request.get "#{url}/pull?key=#{key}", (error, response, body) ->
        return console.log "error getting results:", error, response if error

        console.log 'results:'
        console.log decryptedString hackerKey, body

        process.stdout.write '> '

  else
    console.log 'Non capisco, signore'
    process.stdout.write '> '