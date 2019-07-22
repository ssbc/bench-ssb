var ssbKeys = require('ssb-keys')
var path = require('path')
var pull = require('pull-stream')
var rmrf = require('rimraf')

var dir = '/tmp/bench-ssb-legacy_ssb/'
var keys = ssbKeys.loadOrCreateSync(path.join(dir, 'secret'))
var config = {
  path: dir,
  keys: keys,
  friends: {hops: 10},
  replicate: {legacy: false}
}

var dir2 = '/tmp/bench-ssb-legacy_ssb2/'
rmrf.sync(dir2)

var keys2 = ssbKeys.loadOrCreateSync(path.join(dir2, 'secret'))

var Sbot = require('ssb-server')
    .use(require('ssb-replicate'))
    .use(require('ssb-friends'))
    .use(require('ssb-ebt'))

var sbot = Sbot(config)
var sbot2 = Sbot({
  path: dir2, keys: keys2,
  friends: {hops: 10},
  replicate: {legacy: false}
})

var closed = false

var i = 0

sbot.getVectorClock(function (err, clock) {
  var log = require('./util')('remote-ebt-replicate')

  var first = Object.keys(clock)[0]
  var clockLength = Object.values(clock).reduce((a,b) => a+b, 0)

  sbot2.post(function (data) {
    log(1, ++i % 10000 == 0)
    if (--clockLength <= 0) {
      sbot.close()
      sbot2.close()
    }
  })

  sbot2.publish({
    type:'contact',
    contact: sbot.id,
    following: true
  }, function () {})

  sbot2.connect(sbot.getAddress(), function (err, sbot) {
    if (err) throw err
    console.log(err, sbot.id)
  })
})
