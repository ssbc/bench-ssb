
var _state = require('./output.json')

var V = require('ssb-validate')
var U = require('./util')
var queue = _state.queue
var log = U('validate')
var state = V.initial()
while(queue.length) {
//  state = V.append(state, null, queue.shift())
  var msg = queue.shift()
  JSON.stringify(msg, null, 2)
  log(1)
}
log(null, true)



