var fs = require('fs')
var U = require('./util')
var log = U('json-parse')

var f = fs.readFileSync('./output.json')
JSON.parse(f)
log(1, true)
