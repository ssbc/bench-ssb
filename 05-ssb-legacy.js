
var SSB = require('secure-scuttlebutt')
var data = require('./output.json')

var db = SSB(null, {}, null, '/tmp/bench-ssb-legacy_'+Date.now()+'/')
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
//  function (read) {
//    read(null, function next (err, msg) {
//      if(err === true) db.flush(done)
//      else if(err) done(err)
//      else {
//        db.queue(msg, function (err, data) {
//          log(1)
//          if(err) done(err === true ? null : err)
//          else read(null, next)
//        })
//      }
//    })
//  }
)






