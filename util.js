
module.exports = function (name) {
  var start
  var ts = start = Date.now()
  var total = 0, _total = 0
  console.log("name, total, total-_total, total/seconds, seconds")
  return function (number, end) {
    total += number
    var _ts = Date.now()
    if(end || _ts > ts + 1000) {
      ts = _ts
      var seconds = (_ts-start)/1000
      console.log([name, total, total-_total, total/seconds, seconds].join(', '))
      _total = total
    }
  }
}

