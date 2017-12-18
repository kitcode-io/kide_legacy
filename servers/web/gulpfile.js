var Gulp = require("gulp");
var Gutil = require("gulp-util");
var Rimraf = require("gulp-rimraf");
var Less = require("gulp-less");
var Rev = require("gulp-rev");
var Inject = require("gulp-inject");
var Watchify = require("watchify");
var Source = require("vinyl-source-stream");
var Sequence = require("run-sequence");
var browserify = require('browserify');

////////////////////////////////////////////////////////////////////////////////

Gulp.task("editor:styles:clean", function () {
  return Gulp.src([ "public/editor/*.css" ], { read: true })
    .pipe(Rimraf());
});

Gulp.task("editor:scripts:clean", function () {
  return Gulp.src([ "public/editor/*.js" ], { read: true })
    .pipe(Rimraf());
});

Gulp.task("editor:styles:build", [ "editor:styles:clean" ], function () {
  return Gulp.src([ "assets/css/apps/editor.less" ])
    .pipe(Less({
      paths: [ ".", __dirname + "assets/css" ]
    }))
    .pipe(Rev())
    .pipe(Gulp.dest("public/editor"));
});

Gulp.task("editor:scripts:build", [ "editor:scripts:clean" ], function () {

    // Single entry point to browserify 
    /*Gulp.src('./assets/js/apps/editor.js')
        .pipe(browserify({
      transform: ['coffeeify'],
      extensions: ['.coffee']
        }))
        .pipe(Gulp.dest('./public/editor'))*/

  var bundler = browserify({
    entries: [
      "./assets/js/apps/editor.js"
    ]
  });
  
  bundler.transform("coffeeify");
  bundler.transform("brfs");
  
  bundler.on("update", rebundle);
  
  return rebundle();
  
  function rebundle () {
    return bundler.bundle()
      .on("error", function (e) {
	Gutil.log("Bundling error", e.message);
      })
      .pipe(Source("editor.js"))
      //.pipe(Rename(function (path) {
      //  path.basename += "-" + Genid(8, "", "abcdefghijklmnopqrstuvwxyz0123456789");
      //}))
      .pipe(Rev())
      .pipe(Gulp.dest("public/editor"));
  }
});

Gulp.task("editor:inject",["editor:styles:build","editor:scripts:build"], function () {
  return Gulp.src("views/editor.html")
    .pipe(Inject(Gulp.src([ "public/editor/*.js", "public/editor/*.css" ], { read: false }), {
      ignorePath: "/public",
      addRootSlash: true
    }))
    .pipe(Gulp.dest("views"));
});

Gulp.task("editor:watch", function () {
  Sequence([ "editor:styles:build", "editor:scripts:build" ]);
  
  Gulp.watch([ "public/editor/**/*.css", "public/editor/**/*.js" ], [ "editor:inject" ]);

  Gulp.watch([ "assets/css/**/*.css", "assets/css/**/*.less" ], [ "editor:styles:build" ]);
});


////////////////////////////////////////////////////////////////////////////////

Gulp.task("landing:styles:clean", function () {
  return Gulp.src([ "public/landing/*.css" ], { read: true })
    .pipe(Rimraf());
});

Gulp.task("landing:scripts:clean", function () {
  return Gulp.src([ "public/landing/*.js" ], { read: true })
    .pipe(Rimraf());
});

Gulp.task("landing:styles:build", [ "landing:styles:clean" ], function () {
  return Gulp.src([ "assets/css/apps/landing.less" ])
    .pipe(Less({
      paths: [ ".", __dirname + "assets/css" ]
    }))
     .pipe(Rev())
    .pipe(Gulp.dest("public/landing"));
});

Gulp.task("landing:scripts:build", [ "landing:scripts:clean" ], function () {
  var bundler = browserify({
    entries: [
      "./assets/js/apps/landing.js"
    ]
  });
  
  bundler.transform("coffeeify");
  bundler.transform("brfs");
  
  bundler.on("update", rebundle);
  
  return rebundle();
  
  function rebundle () {
    return bundler.bundle()
      .on("error", function (e) {
        Gutil.log("Bundling error", e.message);
      })
      .pipe(Source("landing.js"))
      .pipe(Rev())
      .pipe(Gulp.dest("public/landing"));
  }
});

Gulp.task("landing:inject",[ "landing:styles:build","landing:scripts:build" ], function () {
  return Gulp.src("views/landing.html")
    .pipe(Inject(Gulp.src([ "public/landing/*.js", "public/landing/*.css" ], { read: false }), {
      ignorePath: "/public",
      addRootSlash: true
    }))
    .pipe(Inject(Gulp.src("public/config.json"), {
      transform: function (filepath, file) {
        return '<script>angular.module("plunker.service.config", []).value("config",JSON.parse(atob("' + file.contents.toString("base64") + '")));</script>';
      }
    }))
    .pipe(Gulp.dest("views"));
});

Gulp.task("landing:watch", function () {
  Sequence([ "landing:styles:build", "landing:scripts:build" ]);
  
  Gulp.watch([ "public/landing/**/*.css", "public/landing/**/*.js" ], [ "landing:inject" ]);

  Gulp.watch([ "assets/css/**/*.css", "assets/css/**/*.less" ], [ "landing:styles:build" ]);
});


////////////////////////////////////////////////////////////////////////////////

Gulp.task("profile:styles:clean", function () {
  return Gulp.src([ "public/profile/*.css" ], { read: true })
    .pipe(Rimraf());
});

Gulp.task("profile:scripts:clean", function () {
  return Gulp.src([ "public/profile/*.js" ], { read: true })
    .pipe(Rimraf());
});

Gulp.task("profile:styles:build", [ "profile:styles:clean" ], function () {
  return Gulp.src([ "assets/css/apps/profile.less" ])
    .pipe(Less({
      paths: [ ".", __dirname + "assets/css" ]
    }))
     .pipe(Rev())
    .pipe(Gulp.dest("public/profile"));
});

Gulp.task("profile:scripts:build", [ "profile:scripts:clean" ], function () {
  var bundler = browserify({
    entries: [
      "./assets/js/apps/profile.js"
    ]
  });
  
  bundler.transform("coffeeify");
  bundler.transform("brfs");
  
  bundler.on("update", rebundle);
  
  return rebundle();
  
  function rebundle () {
    return bundler.bundle()
      .on("error", function (e) {
        Gutil.log("Bundling error", e.message);
      })
      .pipe(Source("profile.js"))
      .pipe(Rev())
      .pipe(Gulp.dest("public/profile"));
  }
});

Gulp.task("profile:inject",[ "profile:styles:build"/*,"profile:scripts:build"*/ ], function () {
  return Gulp.src("views/profile.html")
    .pipe(Inject(Gulp.src([ /*"public/profile/*.js",*/ "public/profile/*.css" ], { read: false }), {
      ignorePath: "/public",
      addRootSlash: true
    }))
    .pipe(Inject(Gulp.src("public/config.json"), {
      transform: function (filepath, file) {
        return '<script>angular.module("plunker.service.config", []).value("config",JSON.parse(atob("' + file.contents.toString("base64") + '")));</script>';
      }
    }))
    .pipe(Gulp.dest("views"));
});



////////////////////////////////////////////////////////////////////////////////
Gulp.task("default", ["editor:watch", "landing:watch"]);
Gulp.task("inject",["landing:inject", "editor:inject"]);
