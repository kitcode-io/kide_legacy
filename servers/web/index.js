var Hoek = require("hoek");
var Url = require("url");
var Fs = require("fs");
var Genid = require("genid");
var LRU = require("lru-cache");
var handlebars = require('handlebars');
var _ = require("lodash");
var Vision = require("vision");
var Inert = require('inert');
var Request = require('request');
var Routes = require('./routes');
var Auth = require("./auth");

exports.register = function(plugin, options, next) {
    var io = require('socket.io')(plugin.listener);

    var context = {
        config: options.config,
        local: options.config.expose,
    };


    handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });

    plugin.register([require('bell'), Inert, Vision, require('hapi-auth-cookie')], function(err) {

        plugin.views({
            engines: {
                html: handlebars
            },
            relativeTo: __dirname,
            path: 'views',
            partialsPath: "views/partials",
            helpersPath: "views/helpers",
        });

        io.sockets.on('connection', function(socket) {
            socket.on('connected', function() {
                console.log('new connection');
            });
        });


        Auth(plugin, options, next);

        plugin.bind(context);
        plugin.route(Routes(options));

    });

    return next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
