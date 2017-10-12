var fs = require('fs')
var V = require('ssb-validate')
var U = require('./util')

var state = V.initial()

var ssbKeys = require('ssb-keys')
var peers = []
for(var i = 0; i < 1000; i++)
  peers.push(ssbKeys.generate())

var log = U('generate')
for(var j = 0; j < 100000; j++) {
  var r = Math.random()
  var peer = peers[~~(peers.length*r)]
  var msg = V.create(state.feeds[peer.id], peer, null, {type: 'random', random: r}, Date.now()+j)
  state = V.append(state, null, msg)
  log(1)
}

log(0, true)

fs.writeFileSync('output.json', JSON.stringify(state))




