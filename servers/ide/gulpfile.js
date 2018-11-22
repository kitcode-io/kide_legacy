var Gulp = require("gulp");
var Gutil = require("gulp-util");
var Rimraf = require("gulp-rimraf");
var Less = require("gulp-less");
var Rev = require("gulp-rev");
var Inject = require("gulp-inject");
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

Gulp.task("build",[ "editor:inject"]);
