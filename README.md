javascript-seed-project
=========================

[![Dependency Status](https://david-dm.org/dashed/javascript-seed-project.png)](https://david-dm.org/dashed/javascript-seed-project)

Seed git repo for JavaScript-based projects. Just clone and code.

Inspired by projects like [ultimate-seed](https://github.com/pilwon/ultimate-seed) and [angular-seed](https://github.com/angular/angular-seed). Unlike these seeds, this seed aims to be as generic and light as possible without catering to a partular application niche (e.g. angularjs-based apps).

With this seed, you should be able to:

1. Develop in JavaScript
2. Test in JavaScript
3. Build and bundle to JavaScript

Cycle steps one through three. Repeat as necessary.

**Note:** Ported from [coffeescript-seed-project](https://github.com/Dashed/coffeescript-seed-project)

Included
========

* vanilla JS
* [webpack](https://github.com/webpack/webpack) - bundler for modules to be compatible for browser
* [mocha](https://github.com/visionmedia/mocha) + [chai.js](http://chaijs.com/) = test framework + assertion framework
* [istanbul](https://github.com/gotwarlost/istanbul) - JS code coverage
* [travis-ci](https://travis-ci.org/) - continuous integration service for testing
* [node-coveralls](https://github.com/cainus/node-coveralls) - LCOV posting to [coveralls.io](https://coveralls.io) for public code coverage analysis
* [gulp](http://gulpjs.com/) - build system
    * [through2](https://github.com/rvagg/through2) - through stream wrapper
    * [gulp-util](https://github.com/gulpjs/gulp-util) - utility belt for gulpfile.js
    * [gulp-plumber](https://github.com/floatdrop/gulp-plumber) - monkey-patch Stream.pipe
    * [gulp-watch](https://github.com/floatdrop/gulp-watch) - pipe-able gulp.watch()
    * [gulp-rename](https://github.com/hparra/gulp-rename) - rename files
    * [gulp-uglify](https://github.com/terinjokes/gulp-uglify) - minify



Set up
======

1. Clone this git repo. Run `npm install` to download `devDependencies`.

2.  Personalize the following files for your project:
    - `LICENSE`
    - `package.json`
    - `CHANGELOG.md`
    - `README.md`

    See [npm docs](https://npmjs.org/doc/json.html) for more on customizing `package.json`.

## gulp

Customize `gulpfile.js` as necessary. See [gulp docs](https://github.com/gulpjs/gulp).

## webpack

Customize `webpack.config.js` as necessary. Configuration are pretty much like command-line args to webpack.

Through the config, webpack will compile an unoptimized build via an entry file and place it within the `./dist/` folder.

Preset:

* `entry` - file to start bundling from
* `output.filename` - name of the unoptimized compiled file
* `output.library` - name of exported library (e.g. `MyAwesomeProject()`)
* `output.libraryTarget` - exporting library to global scope. In this case, preset to [`umd`](https://github.com/ForbesLindesay/umd) (Universal Module Definition), which enables library to be exported to browser, CommonJS,

See [webpack docs](https://github.com/webpack/docs).

## travis-ci

Customize `.travis.yml` to your liking (e.g node envs). See [travis-ci docs](http://about.travis-ci.org/docs/user/languages/javascript-with-nodejs/).

Note that the `script:` attribute is particularly important. This tells travis-ci what to run in the command-line.

travis-ci would execute the following: `npm run test-travis`

**Note:** mocha running in travis-ci uses `-R spec` (or `--reporter spec`) option which will override any such setting in the `./test/mocha.opts` file.

**Note:** Whitelisting is used to allow only the `master` branch to be tested. See [travis docs](http://docs.travis-ci.com/user/build-configuration/#White--or-blacklisting-branches).

## coveralls.io

Like Travis-CI, Coveralls.io has its own dotfile: `.coveralls.yml`

Though not required, it's useful to trigger the coveralls code coverage service from the local environment.

To use it:

1. Rename `.coveralls.yml_default` to `.coveralls.yml`

2. Replace `REPO_TOKEN_HERE` within `.coveralls.yml` with the actual repo token from [coveralls.io](https://coveralls.io).

3. To trigger coveralls code coverage task, run `npm run test-travis`

**Note:** The option `repo_token` (found on your repository's page on Coveralls) is used to specify which project on Coveralls your local source code project maps to. This is only needed for private repos and should be kept secret -- **anyone could use it to submit coverage data on your repo's behalf**! For your convenience, `.coveralls.yml` is already in `.gitignore`.

See [coveralls.io docs](https://coveralls.io/docs/supported_continuous_integration).

## mocha.opts

Mocha will attempt to load `./test/mocha.opts`, which contain command-line options. These are concatenate to Mocha command-line args as its running (via `process.argv`). Note that Mocha command-line args will take precedence.

Personalize `./test/mocha.opts` as you see fit.

Type `mocha -h` for possible options.

## .gitignore

Minorly customized from [Node.gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore) provided by GitHub.


Development Workflow
====================

1.  Run `gulp`.

    This runs gulp.js, and processes the default task defined within `gulpfile.js`, which, by default, runs the **dev** task.

    The dev task, in principle, runs webpack which then watch and compile the target file as configured within `webpack.config.js`. Compiled file(s) are placed within the **./dist/** folder.

    webpack supports code-splitting, which is useful for large projects. See [webpack docs](http://webpack.github.io/docs/code-splitting.html).

  **Note:** Compiled file(s) is/are not optimized (e.g uglify). This is deferred to `gulp prod`.

2.  Add/edit JavaScript source files within `./src/` folder.

    You may structure your project in whatever module definition (AMD, CommonJS, etc) that [webpack](https://github.com/webpack/webpack) supports.

**Note:** Optionally run webpack via, `npm run webpack`, to watch and bundle as necessary.

## Testing

### Automated

`gulp-mocha` is used to watch and automatically run tests within the `./test/` folder.

### Manual

1. Write tests in JavaScript within the `./test/` folder.

2.  Run test(s): `npm test` ( or `mocha`, but `npm test` is recommended)

    **Note:** `npm test` indirectly uses mocha via instanbul.

3.  Code coverage report: `npm test --coverage`

    This generates HTML code coverage report within `./coverage/` folder.

See [mocha docs](https://github.com/visionmedia/mocha), [chai.js style guide](http://chaijs.com/guide/), and [chai.js API docs](http://chaijs.com/api/).

Since chai.js is included, you have the flexibility to use BDD/TDD style.

If you prefer to write tests in CoffeeScript, feel free to edit `./test/mocha.opts`. See [coffeescript-seed-project](https://github.com/Dashed/coffeescript-seed-project) for set up example.


## Code Coverage

Code coverage is provided by [instanbul](https://github.com/gotwarlost/istanbul). It will analyze your JavaScript code from `./src/` folder against tests within `./test/`, and report which parts of your code in source files **are not referenced** in the mocha tests.


Run `npm test --coverage` for instanbul to generate the HTML report within `./coverage/` folder.

### coveralls.io

Refer to earlier parts of this document under "Set Up", to be able to publish LCOV reports to coveralls.io for public code coverage from a local environment. It's not really useful since there are local code-coverage report generation.

There is a separate test/code-coverage command for travis-ci (`npm run test-travis`), which is useful for pushing LCOV reports to coveralls.io during a travis-ci test.

Source map file(s)
==================

Source map file(s) are generated during both **dev** and **prod** tasks within gulp.

In **dev** task, webpack generates the associated source map file(s).

In **prod** task, uglifyjs2 generates the associated source map file(s).

Build
=====

1.  Run `gulp prod` to build the distributable.

    This places a minified js file in `./dist/` folder.

    The associated distributable source map file(s) is/are generated.


License
=======

Public domain. See LICENSE.

**Note:** Replace LICENSE with your project's license; also change license attribute in package.json.
