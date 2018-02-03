var Minimal = require('secure-scuttlebutt/minimal')
var data = require('./output.json')

var db = Minimal('/tmp/bench-ssb-minimal_'+Date.now()+'/', {})
db.ready.set(true)

var log = require('./util')('minimal')

var pull = require('pull-stream')
var paramap = require('pull-paramap')

pull(
  pull.values(data.queue),
  paramap(function(msg, cb) {
    db.queue(msg, function (err, data) {
      log(1)
      if(err) done(err === true ? null : err)
      cb()
    })
  }, 1),
  pull.collect(function() {
    db.flush(done)
  })
)

function done (err) {
  if(err) throw err
  log(0, true)
}
