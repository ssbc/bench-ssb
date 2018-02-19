var fs = require('fs')
var pull = require('pull-stream')
var ssbKeys = require('ssb-keys')

var U = require('./util')
var log = U('decrypt')

var encrypted = require('./encrypted.json')

var i=0

const keyPath = '~/.ssb/secret'
let privId = ssbKeys.loadOrCreateSync(keyPath)

var bob = ssbKeys.generate()

pull(
  pull.values(encrypted),
  pull.drain(function (msg) {
    ssbKeys.unbox(msg, i % 10 ? privId.private : bob.private)
    log(1, ++i % 10000 == 0)
  }, function () {
    log(null, true)
  })
)









