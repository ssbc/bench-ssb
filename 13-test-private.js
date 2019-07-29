var V = require('ssb-validate')
var U = require('./util')

var state = V.initial()

var ssbKeys = require('ssb-keys')

var self = ssbKeys.generate()
var peers = []
for(var i = 0; i < 1000; i++)
  peers.push(ssbKeys.generate())

var log = U('generate-private')

var messages = []

for (var j = 0; j < 10*1000; ++j) {
  var r = Math.random()
  var l = ~~(peers.length*r)
  var peer = peers[l]
  if(Math.random()<0.1) {
    // message for self
    messages.push(ssbKeys.box({type: 'random', random: r}, [self.public, peer.public]))
  }
  else
  {
    messages.push(ssbKeys.box({type: 'random', random: r}, [peer.public]))
  }
  log(1)
}

log(0, true)

var log2 = U('parse-private')

for (var k = 0; k < messages.length; ++k) {
  var value = ssbKeys.unbox(messages[k], self.private)
  log2(1)
}

log2(0, true)


