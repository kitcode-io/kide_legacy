var Glue = require('glue');
var Config = require("./config/config.json");

var manifest = {
  connections: [{
    port: Config.server.ide.port,
    labels: ['ide'],
  }],
  registrations: [{
    plugin: {
      register: './servers/ide',
      options: {
        config: Config
      }
    },
    options: {
      select: ['ide']
    }
  }]
};

var options = {
  relativeTo: __dirname,
};

Glue.compose(manifest, options, function(err, server) {
  if (err) {
    throw err;
  }
  server.start(function(err) {
    if (err) throw err;
    console.log('Hapi days!');
  });
});
