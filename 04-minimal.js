var Minimal = require('ssb-db/minimal')
var data = require('./output.json')
var rmrf = require('rimraf')

var dir = 'tmp/bench-ssb-minimal_'+Date.now()+'/'
var db = Minimal(dir, {})
db.ready.set(true)

var log = require('./util')('minimal')

var pull = require('pull-stream')
var paramap = require('pull-paramap')

var i = 0

pull(
  pull.values(data.queue),
  paramap(function(msg, cb) {
    db.queue(msg.value, function (err, data) {
      log(1, ++i % 10000 == 0)
      if(err) done(err === true ? null : err)
      cb()
    })
  }, 1),
  pull.collect(function() {
    db.flush(done)
  })
)

function done (err) {
  rmrf.sync(dir)
  if(err) throw err
  log(0, true)
}
