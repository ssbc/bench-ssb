var SSB = require('secure-scuttlebutt')
var data = require('./output.json')

var rmrf = require('rimraf')

var dir = '/tmp/bench-ssb-legacy_ssb/'
rmrf.sync(dir)

var db = SSB(null, {}, null, dir)
db.ready.set(true)

var log = require('./util')('legacy')

var pull = require('pull-stream')

pull(
  pull.values(data.queue),
  pull.through(function () {
    log(1)
  }),
  db.createWriteStream(function (err) {
    if(err) throw err
    log(0, true)
  })
)


