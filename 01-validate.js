var pull = require('pull-stream')
var _state = require('./output.json')

var V = require('ssb-validate')
var U = require('./util')
var queue = _state.queue
var log = U('validate')
var state = V.initial()

var i=0

pull(
  pull.values(queue),
  pull.drain(function (data) {
    state = V.append(state, null, data.value)
    log(1, ++i % 10000 == 0)
  }, function () {
    log(null, true)
  })
)











