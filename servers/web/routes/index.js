var handlebars = require('handlebars');
var Path = require("path");
var fs = require('fs');

var dirname = '/project/';

handlebars.registerHelper('json', function(context) {
  var con = JSON.stringify(context);
  return con;
});

module.exports = function(options) {

  var routes = [{
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      var server = this.config.server;
      var param = request.params;
      var courseName = request.params.courseName;
      var context = {
        "url": {
          "run": ""
        }
      };

      reply.view("editor", context);

    }

  }, {
    method: 'GET',
    path: '/{path*}',
    config: {
      handler: {
        directory: {
          path: Path.join(__dirname, "../public")
        }
      }
    }
  }, {
    method: 'GET',
    path: '/getFiles',
    handler: function(request, reply) {

      var files = [];
      fs.readdir(dirname, function(err, filenames) {
        if (err) {
          console.log(err);
        }
        var fn = 0;
        filenames.forEach(function(filename) {
          fs.readFile(dirname + filename, 'utf-8', function(err, content) {
            fn++;
            if (err) {
              console.log(err);
            }
            var file = {
              active: false,
              contents: content,
              defination: "",
              filename: filename,
              type: "file"
            };
            if (filename == 'index.js') file.active = true;
            files.push(file);
            if (fn == filenames.length) reply(files);
          });
        });
      });
    }
  }, {
    method: 'POST',
    path: '/saveFile',
    handler: function(request, reply) {
      var files = request.payload.files;
      var fn = 0;
      files.forEach(function(file) {
        fs.writeFile(dirname + file.path, file.contents, function() {
          fn++;
          if (fn == files.length) reply("OK");
        });
      });
    }
  }, {
    method: 'GET',
    path: '/getInfo',
    handler: function(request, reply) {
      fs.readFile('/info.txt','utf8', function(err, content) {
        reply(content);
      });
    }
  }];

  return routes;
}
