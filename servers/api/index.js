var mongoose = require('mongoose');
var models = require("./models/all-models");
var fs = require('fs');
var filter_file = require("./filter_file");

exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/course/{id*}',
    handler: function(request, reply) {
     
    if(!request.params.id){   
        models.Course.find({}, function(err, items) {
          reply(items);   
        });
    } else {
       models.Course.find({"_id": mongoose.Types.ObjectId(request.params.id)}, function(err , items ){
	  reply(items);
	});
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/coursefile/{course_id}',
    handler: function(request, reply) {
        models.CourseFile.find({"course_id": mongoose.Types.ObjectId(request.params.course_id)},function(err , data){
	   reply(data);
	});
    }
  });	
    server.route({
    method: 'GET',
    path: '/getFiles/{course_name}/{template_name}',
    handler: function(request , reply){
	var coursefile = request.params.course_name;
	var templatename = request.params.template_name;
        var program = coursefile+".java";
        var file_content = fs.readFileSync(__dirname + '/../run/runner/'+coursefile+'/SrcTemplate/'+templatename+'/'+program, 'utf8');
        file_content = filter_file(file_content);

	var files = [{ 
		type : "file",
		filename : request.params.course_name + ".java",
		contents : file_content, 
		active   : true
	}]
	reply(files);


	}	

   });;
  return next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
