var Glue = require('glue');
var Config = require("./config.json");


var manifest = {
    connections: [{
        port: Config.server.web.port,
        labels: ['web'],
    }],
    registrations: [{
            plugin: {
                register: './servers/web',
                options: {
                    config: Config
                }
            },
            options: {
                select: ['web']
            }
        }
    ]
};

var options = {
    relativeTo: __dirname,
};

Glue.compose(manifest, options, function(err, server) {
    if (err) {
        throw err;
    }

    server.start(function() {
        console.log('Hapi days!');
    });
});
