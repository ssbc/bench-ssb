var _state = require('./output.json')

var cbor = require('borc')
var U = require('./util')
var queue = _state.queue
var log = U('json')
var i=0

for (let i = 0; i < queue.length; ++i) {
  cbor.encode(queue[i])
  log(1, i % 10000 == 0)
}

log(null, true)



