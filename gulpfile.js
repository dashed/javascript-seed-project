/*jshint node:true */
/* gulpfile.js - https://github.com/gulpjs/gulp */

var
/** node.js **/
path = require('path'),
fs = require('fs'),

/** Gulp and plugins **/
gulp = require('gulp'),
gutil = require('gulp-util'),
watch = require('gulp-watch'),
plumber = require('gulp-plumber'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
mocha = require('gulp-mocha'),

/** utility **/
through = require('through2').obj,

/** webpack **/
webpack = require('webpack'),
webpackconfig = require('./webpack.config'),

/** Config **/
distDir = './dist/',
distTargetFile = 'myawesomeproject.js',

/** Environment Vars **/
R = 0,
ENV_SWITCH = void 0,

// Env list
DEV_ENV = R++,
PROD_ENV = R++;


/** Utility Functions **/

// Transformation function on gulp.src depending on env
var getGlob = function(glob_target) {
  var src = gulp.src(glob_target)

  switch(ENV_SWITCH) {
    case DEV_ENV:

      // watch files and re-emit them downstream on change (or some file event)
      opts.glob = glob_target;

      return watch(opts)
                .pipe(plumber())
                .pipe(through());

    case PROD_ENV:
      return src.pipe(plumber())
                .pipe(gutil.noop());

    default:
      throw new Error('Invalid Env');
  }
};

/* Sub-tasks */
gulp.task('set-dev', function() {
    ENV_SWITCH = DEV_ENV;
});

gulp.task('set-prod', function() {
    ENV_SWITCH = PROD_ENV;
});


gulp.task('mocha', function() {

    var mocha_opts = {};

    try {
        var opts = fs.readFileSync('test/mocha.opts', 'utf8')
            .trim()
            .split(/\s+/);

        opts.forEach(function(val, indx, arry) {
            if (/^-.+?/.test(val)) {
                val = val.replace(/^-+(.+?)/, "$1");
                mocha_opts[val] = arry[indx + 1];
            }
        });

    } catch (err) {
      // ignore
    }

    return watch({ glob: 'test/**/*.js', read:false }, function(files) {

        files
            .pipe(mocha(mocha_opts))
                .on('error', function(err) {
                    if (!/tests? failed/.test(err.stack)) {
                        console.log(err.stack);
                    }
                });
    });

});


gulp.task('dist-minify', function() {

    return getGlob(distDir + '/' + distTargetFile)
        .pipe(rename({ suffix: '.min'}))
        .pipe(uglify({ outSourceMap: true }))
        .pipe(gulp.dest(distDir));
});

gulp.task('webpack', function(callback) {

    webpack(webpackconfig, function(err, stats) {

        if(err) throw new gutil.PluginError("webpack", err);

        gutil.log("[webpack]", stats.toString({
            // output options
        }));

    });

    callback();

});

/* High-level tasks */
/* Compose sub-tasks to orchestrate something to be done */

/* Development task */
gulp.task('dev', ['set-dev', 'webpack', 'mocha'], function() {
    // Run webpack based on config from webpack.config.js
});


gulp.task('prod', ['set-prod', 'dist-minify'], function() {
    // Minify file and generate dist source map file.
});


// The default task (called when you run `gulp`)
gulp.task('default', ['dev'], function() {
    // Run dev task by default
});

