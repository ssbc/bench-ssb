var ssbKeys = require('ssb-keys')
var path = require('path')
var Many = require('pull-many')
var pull = require('pull-stream')
var pCont = require('pull-cont')
var rmrf = require('rimraf')

var dir = '/tmp/bench-ssb-legacy_ssb/'
var keys = ssbKeys.loadOrCreateSync(path.join(dir, 'secret'))
var config = {
  path: dir,
  keys: keys
}

var dir2 = '/tmp/bench-ssb-legacy_ssb2/'
rmrf.sync(dir2)
var keys2 = ssbKeys.loadOrCreateSync(path.join(dir, 'secret'))


var Sbot = require('ssb-server')
var sbot = Sbot(config)
var sbot2 = Sbot({ path: dir2, keys: keys2 })

var closed = false
var i = 0

sbot.getVectorClock(function (err, clock) {
  var log = require('./util')('remote-legacy-replicate-write')

  var first = Object.keys(clock)[0]
  var friends = {}
  var n = 0

  require('ssb-client')({
    remote: sbot.getAddress(),
    keys: keys,
    manifest: {
      createHistoryStream: 'source',
      getVectorClock: 'async'
    }
  }, function (err, rpc) {
    if(err) throw err

    function replicate (id) {
      if(friends[id]) return
      friends[id] = true
      n++
      pull(
        rpc.createHistoryStream({id: id, seq: 0, keys: false}),
        pull.through(function (msg) {
          log(1, ++i % 10000 == 0)
          if(msg.content.contact) replicate(msg.content.contact)
        }),
        sbot2.createWriteStream(next)
      )
    }

    replicate(first)

    function next () {
      if(--n) return
      log(0, true)
      rpc.close()
      sbot.close()
      sbot2.close()
      closed = true
    }
  })
})
