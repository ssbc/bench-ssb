var readline = require('readline');
var Table = require('cli-table')

module.exports = function (name) {
  var start
  var lastLogTime = start = Date.now()
  var runCount = 0, previousRunCount = 0
  var table = createTable()  
  var nextStatus = getStatusFn()
  nextStatus()

  return function (number, end) {
    runCount += number
    var currentTime = Date.now()

    if(end || currentTime > lastLogTime + 1000) {
      lastLogTime = currentTime
      var seconds = (currentTime-start)/1000
      table.push([
        seconds.toFixed(1),
        runCount,
        runCount-previousRunCount,
        (runCount/seconds).toFixed()
      ])
      nextStatus()
      previousRunCount = runCount
    }

    if(end) {
      clearLine()
      console.log(table.toString())
      var avgRate = runCount / seconds
      logBright(`Overall average execution rate: ${avgRate.toFixed()} per second`)
    }
  }
}

function createTable() {
  return new Table({
    head: [
           'Time (s)',
           '# Executions (total)', 
           '# Executions (per row)', 
           'Average Rate (#/s)',
          ]
  })
}

function getStatusFn() {
  var spinner = ['|', '/', '-', '\\']
  var ellipses = ['.', '..', '...']
  var i = 0

  return () => {
    clearLine()
    process.stdout.write(spinner[i % spinner.length] + ' Executing benchmark' + ellipses[i % ellipses.length])
    i++
  };
}

function clearLine() {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
}

function logBright(...params) {
  console.log('\x1b[1m', ...params)
  console.log('\x1b[0m', '') // Resets the color to normal.
}