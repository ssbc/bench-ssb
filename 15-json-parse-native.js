var fs = require('fs')
var U = require('./util')
var log = U('json-parse-native')

var parse = require('./binding.node').parse_legacy_buffer
var f = fs.readFileSync('./output.json')
var result = parse(f)
log(1, true)
