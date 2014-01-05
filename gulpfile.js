/* gulpfile.js - https://github.com/wearefractal/gulp */

var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');

var path = require('path');

var srcCoffeeDir = './coffee/';
var destDir = './src/';

// Emulate coffee -b -w -c -o ./src/ ./coffee
var gulpCoffee = function(coffeeFile) {

    // Mirror srcCoffeeDir dir structure to destDir
    //
    // From: srcCoffeeDir/[intermediate_dirs]/coffeeFile
    // To: destDir/[intermediate_dirs]/coffeeFile

    // __dirname/srcCoffeeDir/
    var normSrc = path.normalize(__dirname + '/' + srcCoffeeDir + '/');

    // __dirname/srcCoffeeDir/[intermediate_dirs]/coffeeFile
    var intermediate_dirs = path.relative(normSrc, path.dirname(coffeeFile));

    var normDestPath = path.normalize(destDir + '/' + intermediate_dirs + '/');
    var finalDestFilePath;

    gulp.src(coffeeFile)
        .pipe(coffee({bare: true}))
            .on('error', gutil.log)
            // Trigger system bell
            .on('error', gutil.beep)

        // Note: gulp.dest uses mkdirp.
        .pipe(gulp.dest(normDestPath))
            .on('data', function(file) {
                finalDestFilePath = path.normalize(normDestPath + '/' + path.basename(file.path));
            })
            .on('end', function() {

                var from = path.relative(__dirname, coffeeFile);
                var to = finalDestFilePath && path.relative(__dirname, finalDestFilePath);

                gutil.log("Compiled '" + from + "' to '" + to + "'");

            });
    return;

};

// The default task (called when you run `gulp`)
gulp.task('default', function() {

    var target = path.normalize(srcCoffeeDir + '/**/*.coffee');

    // Process all coffee files.
    gulp.src(target)
        .on('data', function(file) {
            gulpCoffee(file.path);
        });

    // Watch coffeescript files and compile them if they change
    gulp.watch(target, function(event) {
        gulpCoffee(event.path);
    });

});

gulp.task('build', function() {

    // Future...
});

gulp.task('requirejs', function() {

    // Future...
});
