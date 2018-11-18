var SSB = require('secure-scuttlebutt')
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
  contact: data.queue[0].author,
  following: true
}, function () {})

function isFunction (f) {
  return 'function' === typeof f
}

function isObject(o) {
  return o && 'object' == typeof o
}

function since () {
  var ssb = db
  var plugs = {}
  var sync = true
  for(var k in ssb) {
    if(ssb[k] && isObject(ssb[k]) && isFunction(ssb[k].since)) {
      plugs[k] = ssb[k].since.value
      sync = sync && (plugs[k] === ssb.since.value)
    }
  }
  return {
    since: ssb.since.value,
    plugins: plugs,
    sync: sync,
  }
}


pull(
  pull.values(data.queue),
  pull.through(function () {
    log(1, ++i % 10000 == 0)
  }),
  db.createWriteStream(function (err) {
    if(err) throw err
    console.error(since())
    log(0, true)
  })
)







