var pull = require('pull-stream')
var Many = require('pull-many')

var createSsb = require('secret-stack')(require('ssb-config'))
  .use(require('ssb-db'))
var db = createSsb({ path: '/tmp/bench-ssb-legacy_ssb/' })

var i = 0

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
      log(1, ++i % 10000 == 0)
    }, function () {
      log(0, true)
      db.close()
    })
  )
})




