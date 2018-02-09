
var _state = require('./output.json')

var V = require('ssb-validate')
var U = require('./util')
var queue = _state.queue
var log = U('json')
var state = V.initial()
var i=0

while(queue.length) {
//  state = V.append(state, null, queue.shift())
  var msg = queue.shift()
  JSON.stringify(msg, null, 2)
  log(1, ++i % 10000 == 0)
}
log(null, true)



