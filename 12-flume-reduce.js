var Flume = require('flumedb')
var OffsetLog = require('flumelog-offset')
var codec = require('flumecodec')
var Reduce = require('flumeview-reduce')
var pull = require('pull-stream')
var fs = require('fs')

fs.unlink('/tmp/bench-ssb-legacy_ssb/flume/test.json', function() {
  // , blockSize: 256 * 1024
  var offsetLog = OffsetLog('/tmp/bench-ssb-legacy_ssb/flume/log.offset', {codec: codec.json })

  var log = require('./util')('flume-reduce')
  var i = 0
  
  var db = Flume(offsetLog)
        .use('test', Reduce(
          1, // version
          (sum, val) => {
            log(1, ++i % 10000 == 0)
            return (sum || 0) + val.sequence
          }, // reducer
          function (data) { return data.value } // map
        ))

  db.test.get((err, sum) => {
    log(0, true)
  })
})
