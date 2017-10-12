var pull = require('pull-stream')
var _state = require('./output.json')

var V = require('ssb-validate')
var U = require('./util')
var queue = _state.queue
var log = U('validate')
var state = V.initial()

//queue.forEach(function (msg) {
//this one is mysteriously only half as fast as any other type of loop?
/*
while(queue.length) {
  var msg = queue.shift()
  state = V.append(state, null, msg)
  log(1)
}
*/


for(var i = 0; i < queue.length; i++) {
  var msg = queue[i]
  state = V.append(state, null, msg)
  log(1)
}
log(null, true)


