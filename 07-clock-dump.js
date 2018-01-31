var SSB = require('secure-scuttlebutt')
var Paramap = require('pull-paramap')
var pull = require('pull-stream')
var Many = require('pull-many')
var db = SSB(null, {}, null, '/tmp/bench-ssb-legacy_ssb/')
db.ready.set(true)

var a = []

db.getVectorClock(function (err, clock) {
  var log = require('./util')('clock-dump')

  pull(
    Many(Object.keys(clock).map(function (key) {
      var i = 1
      return function (abort, cb) {
        if(abort) return cb(abort)
        db.getAtSequence([key, ++i], function (err, value) {
          if(err) cb(true)
          else cb(null, value)
        })
      }
    })),
    pull.drain(function (msg) {
      log(1)
    }, function () {
      log(0, true)
    })
  )

})




