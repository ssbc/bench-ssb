var SSB = require('ssb-db')
var data = require('./output.json')
var ssbKeys = require('ssb-keys')
var path = require('path')
var rmrf = require('rimraf')

var dir = '/tmp/bench-ssb-legacy_ssb/'
rmrf.sync(dir)

var keys = ssbKeys.loadOrCreateSync(path.join(dir, 'secret'))

var db = SSB(null, {}, null, dir)
db.ready.set(true)

var feed = db.createFeed(keys)

var log = require('./util')('legacy')

var pull = require('pull-stream')

var i = 0

feed.publish({
  type: 'contact',
  contact: data.queue[0].value.author,
  following: true
}, function () {})

pull(
  pull.values(data.queue),
  pull.map(function(msg) { return msg.value }),
  pull.through(function (msg) {
    log(1, ++i % 10000 == 0)
  }),
  db.createWriteStream(function (err) {
    if(err) throw err
    log(0, true)
  })
)


