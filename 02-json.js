var _state = require('./output.json')

var U = require('./util')
var queue = _state.queue
var log = U('json')
var i=0

for (let i = 0; i < queue.length; ++i) {
  JSON.stringify(queue[i], null, 2)
  log(1, i % 10000 == 0)
}

log(null, true)



