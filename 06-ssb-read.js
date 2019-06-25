var Paramap = require('pull-paramap')
var pull = require('pull-stream')

var createSsb = require('ssb-db/create')
var db = createSsb('tmp/bench-ssb-legacy_ssb/', {}, require('ssb-keys').generate())

var i = 0

pull(
  db.time.read({keys: true, values: false, gt: 0}),
  pull.collect(function (err, ary) {
    ary.sort(function () { return Math.random() - 0.5 })
    var log = require('./util')('random-read')
    pull(
      pull.count(100000-1),
      pull.map(function () {
        //return ary[~~( (1/(r*100000))*100000 )]
        return ary[~~(Math.pow(Math.random(), 10)*ary.length)]
      }),
      pull.filter(Boolean),
      Paramap(function (k, cb) {
        db.get(k.seq, cb)
      }, 100),
      pull.drain(function (msg) {
        log(1, ++i % 10000 == 0)
      }, function () {
        log(0, true)
      })
    )
  })
)

