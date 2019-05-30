var _state = require('./output.json')

var bipf = require('bipf')
var U = require('./util')
var queue = _state.queue
var log = U('json')
var i=0

function encode (string) {
  var b = Buffer.alloc(bipf.encodingLength(string))
  bipf.encode(string, b, 0)
  return b
}

for (let i = 0; i < queue.length; ++i) {
  encode(queue[i])
  log(1, i % 10000 == 0)
}

log(null, true)



