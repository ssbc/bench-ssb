
var Minimal = require('secure-scuttlebutt/minimal')
var data = require('./output.json')

var db = Minimal('/tmp/bench-ssb-minimal_'+Date.now()+'/', {})
db.ready.set(true)

var log = require('./util')('minimal')

var pull = require('pull-stream')

pull(
  pull.values(data.queue),
  function (read) {
    read(null, function next (err, msg) {
      if(err === true) db.flush(done)
      else if(err) done(err)
      else {
        db.queue(msg, function (err, data) {
          log(1)
          if(err) done(err === true ? null : err)
          else read(null, next)
        })
      }
    })
  }
)

function done (err) {
  if(err) throw err
  log(0, true)
}




