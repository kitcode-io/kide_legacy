const gulp = require('gulp');
const git = require('gulp-git');
const shelljs = require('shelljs');
const argv = require('yargs').argv;

gulp.task('binary', function() {
    let target = 'linux';
    if (argv.linux) target = 'linux';
    else if (argv.macos) target = 'macos';
    else {
        if (process.platform == 'darwin') target = 'macos';
        else if (process.platform == 'linux') target = 'linux';
        else throw new Error('os not supported! mention --macos or --linux');
    }
    shelljs.exec('git clone git@gitlab.com:kitcode/port-detector.git && cd port-detector && npm install && cd ..', function(err) {
        if (err) throw err;
        shelljs.exec('./node_modules/.bin/pkg -t node4-' + target + '-x64 port-detector/lib/index.js', function(err) {
            if (err) throw err;
            shelljs.exec('rm -rf port-detector');
        });
    });
});

gulp.task('docker', function() {
    shelljs.exec('docker build -t kide:dev .', function(err) {
        if (err) throw err;
	shelljs.exec("rm index");
    });
});

gulp.task('start:kide', function() {
    shelljs.exec('docker run -d kide:dev bash start.sh 12345 local');
});
