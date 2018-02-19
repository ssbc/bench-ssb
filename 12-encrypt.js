var fs = require('fs')
var pull = require('pull-stream')
var _state = require('./output.json')
var ssbKeys = require('ssb-keys')

var U = require('./util')
var queue = _state.queue
var log = U('encrypt')

var i=0

const keyPath = '~/.ssb/secret'
let privId = ssbKeys.loadOrCreateSync(keyPath)

let encrypted = []

pull(
  pull.values(queue),
  pull.take(10000),
  pull.drain(function (msg) {
    let encryptedMsg = ssbKeys.box(msg.content, [privId.public])
    encrypted.push(encryptedMsg)
    log(1, ++i % 10000 == 0)
  }, function () {
    log(null, true)
  })
)

fs.writeFileSync('encrypted.json', JSON.stringify(encrypted))









