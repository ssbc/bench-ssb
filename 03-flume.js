
var Flume = require('flumedb')
var OffsetLog = require('flumelog-offset')

var AsyncWrite = require('async-write')
var pull = require('pull-stream')
var V = require('ssb-validate')

var db = Flume(OffsetLog('/tmp/bench-ssb-flume_'+Date.now()+'/log.offset', {blockSize: 1024*16, codec: require('flumecodec/json')}))

var queue = AsyncWrite(function write (buffer, cb) {
  db.append(buffer, cb)
}, function reduce (buffer, msg) {
  buffer = buffer || []
  buffer.push({
    key: V.id(msg),
    value: msg,
    timestamp: Date.now()
  })
  return buffer
}, function (b) {
  return b && b.length < 1000
},
function (b) {
  return b&& !b.length
}, 10)

var state = require('./output.json')

var log = require('./util')('flume')

pull(
  pull.values(state.queue),
  function (read) {
    read(null, function next (err, msg) {
      if(err) done(err === true ? null : err)
      else queue(msg, function (err) {
          log(1)
          if(err) done(err === true ? null : err)
          else read(null, next)
        })
    })
  }
)

function done (err) {
  if(err) throw err
  log(0, true)
}

