const os = require('os');

exports.info = function() {
  return { platform: os.platform(),
           release: os.release(),
           architecture: os.arch,
           cpus: os.cpus().map(c => c.model),
           freemem: os.freemem(),
           totalmem: os.totalmem(),
           load: os.loadavg(),
           nodeversion: process.version
         }
}
