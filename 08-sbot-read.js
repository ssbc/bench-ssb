var ssbKeys = require('ssb-keys')
var path = require('path')
var Many = require('pull-many')
var pull = require('pull-stream')
var pCont = require('pull-cont')

var dir = 'tmp/bench-ssb-legacy_ssb/'
var keys = ssbKeys.loadOrCreateSync(path.join(dir, 'secret'))
var config = {
  path: dir,
  keys: keys
}

var Sbot = require('ssb-server')
var sbot = Sbot(config)

var closed = false

var i = 0

sbot.getVectorClock(function (err, clock) {
  if (err) throw err
  var first = Object.keys(clock)[0]
  var friends = {}
  require('ssb-client')({
    remote: sbot.getAddress(),
    keys: keys,
    manifest: {
      createHistoryStream: 'source',
      getVectorClock: 'async'
    }
  }, function (err, rpc) {
    if (err) throw err

    function replicate (id) {
      if (friends[id]) return
      friends[id] = true
      n++
      pull(
        rpc.createHistoryStream({id: id, seq: 0, keys: false}),
        pull.drain(function (msg) {
          if(msg.content.contact) replicate(msg.content.contact)
          log(1, ++i % 10000 == 0)
        }, next)
      )
    }

    var log = require('./util')('sbot-read')

    var n = 0

    replicate(first)

    function next () {
      if(--n) return
      log(0, true)
      rpc.close()
      sbot.close()
      closed = true
    }
  })
})
