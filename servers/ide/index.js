var handlebars = require('handlebars');
var Vision = require("vision");
var Inert = require('inert');
var routes = require('./routes');

exports.register = function(plugin, options, next) {
    var context = {
        config: options.config,
        local: options.config.expose,
    };


    handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });

    plugin.register([Inert, Vision], function(err) {
        if (err) throw err;
        plugin.views({
            engines: {
                html: handlebars
            },
            relativeTo: __dirname,
            path: 'views',
        });

        plugin.bind(context);
        plugin.route(routes);

    });

    return next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
