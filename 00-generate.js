var fs = require('fs')
var V = require('ssb-validate')
var U = require('./util')

var state = V.initial()

var ssbKeys = require('ssb-keys')
var peers = []
for(var i = 0; i < 1000; i++)
  peers.push(ssbKeys.generate())

var log = U('generate')

function contact(a, b, j) {
  var msg = V.create(state.feeds[a.id], a, null, {
    type: 'contact', contact: b.id, following: true
  }, Date.now()+j)
  state = V.append(state, null, msg)
}

contact(peers[0], peers[1], 0)

for(var j = 0; j < 100000; j++) {
  var r = Math.random()
  var l = ~~(peers.length*r)
  var peer = peers[l]
  if(Math.random()<0.1) {
    var msg = V.create(state.feeds[peer.id], peer, null, {type: 'random', random: r}, Date.now()+j)
    state = V.append(state, null, msg)
  }
  else {
    var _l = ~~(Math.random()*(~~(r*3)+1)*(peers.length/3))
    var _peer = peers[_l]
    contact(peer, _peer, j)
  }
  log(1)
}

log(0, true)

fs.writeFileSync('output.json', JSON.stringify(state))


