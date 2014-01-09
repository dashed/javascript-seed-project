/* gulpfile.js - https://github.com/gulpjs/gulp */

var path = require('path');

var gulp = require('gulp');
var through = require('through');

// Gulp plugins
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var watch = require('gulp-watch'); // Replaces gulp.watch
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var through = require("through");


/** Config **/
var srcCoffeeDir = './coffee/';
var destDir = './src/';

var distDir = './dist/';
var distFile = 'myawesomeproject.js';

/** Environment Vars **/
var R = 0;
var ENV_SWITCH = void 0;

// Env list
var DEV_ENV = R++;
var PROD_ENV = R++;


/** Utility Functions **/

// Transformation function on gulp.src depending on env
var getGlob = function(glob_target) {
  var src = gulp.src(glob_target)

  switch(ENV_SWITCH) {
    case DEV_ENV:

      // watch files and re-emit them downstream on change (or some file event)
      return src.pipe(watch())
                .pipe(plumber())
                .pipe(gutil.noop());

    case PROD_ENV:
      return src.pipe(plumber())
                .pipe(gutil.noop());

    default:
      throw new Error('Invalid Env');
  }
};

/* Sub-tasks */
gulp.task('coffee', function() {

    var target = path.normalize(srcCoffeeDir + '/**/*.coffee');

    getGlob(target)
        .on('data', function(file){
            file.coffee_path = file.path;
        })
        .pipe(coffee({bare: true}))
            .on('error', gutil.beep)
        .pipe(gulp.dest(destDir))
            .on('data', function(file) {

                var to = path.normalize(destDir + '/' + path.relative(__dirname + '/' + srcCoffeeDir, file.path));
                finalDestFilePath = path.normalize(destDir + '/' + path.basename(file.path));

                var from = path.relative(__dirname, file.coffee_path);

                gutil.log("Compiled '" + from + "' to '" + to + "'");

            });
});

gulp.task('dist-minify', function() {

    getGlob(distDir + '/' + distFile)
        .pipe(uglify())
        .pipe(rename(function(dir, base, ext) {
            return base + '.min' + ext;
        }))
        .pipe(gulp.dest(distDir))
});

/* High-level tasks */
/* Compose sub-tasks to orchestrate something to be done */

/* Development task */
gulp.task('dev', function() {

    ENV_SWITCH = DEV_ENV;

    /**
    1. watch coffeescript files
    2. compile to js
    3. put them in src folder
    **/
    gulp.run('coffee');

});


gulp.task('prod', function() {

    ENV_SWITCH = PROD_ENV;

    gulp.run('dist-minify');

});


// The default task (called when you run `gulp`)
gulp.task('default', function() {

    gulp.run('dev');

});

