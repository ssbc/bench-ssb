if (process.argv.length < 3)
{
  console.error("not script provided")
  process.exit(1)
}

var c = require('chloride')
c.events.on('sodium-browserify:wasm loaded', function() {
  require("./" + process.argv[2])
})
