coffeescript-seed-project
=========================

Seed git repo for coffeescript-based projects. Just clone and code.

Inspired by projects like [ultimate-seed](https://github.com/pilwon/ultimate-seed) and [angular-seed](https://github.com/angular/angular-seed). Unlike these seeds, this seed aims to be as generic and light as possible without catering to a partular application niche (e.g. angularjs-based apps).

With this seed, you should be able to:

1. Develop in CoffeeScript
2. Transcompile to JavaScript
3. Test in CoffeeScript (or JavaScript)
4. Build in JavaScript

Cycle steps one through three, before finally getting to step four. Build and repeat as necessary.

Included
========

* [CoffeeScript](http://coffeescript.org/) - syntatic sugar
* browserify - browser compatible require() the node.js way
* [mocha](https://github.com/visionmedia/mocha) + [chai.js](http://chaijs.com/) = test framework + assertion framework
* [istanbul](https://github.com/gotwarlost/istanbul) - JS code coverage
* [travis-ci](https://travis-ci.org/) - continuous integration service for testing
* [node-coveralls](https://github.com/cainus/node-coveralls) - lcov posting to [coveralls.io](https://coveralls.io) for public code coverage analysis
* [gulp](http://gulpjs.com/) - build system
    * [gulp-coffee](https://github.com/wearefractal/gulp-coffee) - transcompile JS to CoffeeScript
    * [gulp-util](https://github.com/gulpjs/gulp-util) - utility belt for gulpfile.js
    * gulp-plumber
    * gulp-watch




Set up
======

1. Clone this git repo. Run `npm install` to download `devDependencies`.

2.  Personalize `LICENSE`, `package.json`, and this `README` file as you see fit for your project.

    See [npm docs](https://npmjs.org/doc/json.html) for more on `package.json`.

## travis-ci

Customize `.travis.yml` to your liking (e.g node envs). See [travis-ci docs](http://about.travis-ci.org/docs/user/languages/javascript-with-nodejs/).

Note that the `script:` attribute is particularly important. This tells travis-ci what to run in the command-line.

travis-ci would execute the following: `npm run test-travis`

**Note:** mocha running in travis-ci uses `-R spec` (or `--reporter spec`) option which will override any such setting in the `./test/mocha.opts` file.

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

##

Development Workflow
====================

1.  Run `gulp`.

    This runs gulp.js and executes contents of `gulpfile.js`, which compiles any and all the CoffeeScript files (with extension `.coffee`) under the **./coffee/** folder. Afterwards gulp would watch any CoffeeScript files and compile them individually as they're changed.

    All CoffeeScript files would be compiled to the **./src/** directory in the same directory structure as they're placed in the **./coffee/** folder.

    **Note:** This emulates the following command: `coffee -b -w -c -o ./src/ ./coffee`

2.  Add/edit CoffeeScript source files within `./coffee/` folder.

    CoffeeScript code are typically structured in an [AMD fashion](http://requirejs.org/docs/whyamd.html) using requirejs to better organize the project.

    This seed doesn't enforce this style, but it's encouraged.

    **Note:** `requirejs` is made available in node.js for convenience.

    More info:
    * [requirejs docs](http://requirejs.org/docs/api.html)
    * [Asynchronous Module Definition API](https://github.com/amdjs/amdjs-api/wiki/AMD)


## Testing

1. Write tests in CoffeeScript within the `./test/` folder.

2.  Run test(s): `npm test` ( or `mocha`, but `npm test` is recommended)

    **Note:** `npm test` indirectly uses mocha via instanbul.

3.  Code coverage report: `npm test --coverage`

    This generates HTML code coverage report within `./coverage/` folder.

See [mocha docs](https://github.com/visionmedia/mocha), [chai.js style guide](http://chaijs.com/guide/), and [chai.js API docs](http://chaijs.com/api/).

Since chai.js is included, you're free to use BDD/TDD style.

### AMD testing (requirejs)

If the project is structured as AMD modules for use by require.js (or some AMD loader), special care is needed to be able to load AMD modules for mocha.

Fortunately, the file `./test/test.coffee` contains all the boilerplate code needed to be able to load and test AMD modules. Feel free to copy and complete.

In short, mocha support for [async code](http://visionmedia.github.io/mocha/#asynchronous-code) along with beforeEach hook makes AMD testing possible.


## Code Coverage

Code coverage is provided by [instanbul](https://github.com/gotwarlost/istanbul). It will analyze your JavaScript code from `./src/` folder against tests within `./test/`, and report which parts of your code in source files **are not referenced** in the mocha tests.


Run `npm test --coverage` for instanbul to generate the HTML report within `./coverage/` folder.

### coveralls.io

Refer to earlier parts of this document under "Set Up", to be able to publish LCOV reports to coveralls.io for public code coverage from a local environment. It's not really useful since there are local code-coverage report generation.

There is a separate test/code-coverage command for travis-ci (`npm run test-travis`), which is useful for pushing LCOV reports to coveralls.io during a travis-ci test.

Build
=====



TBA

To Do
=====

* Be able to remove RequireJS dependency for node.js projects without compromising project structure.

* Consider using gulp-mocha in tandem with gulp-watch.

* Port to javascript-seed-project

License
=======

Public domain. See LICENSE.

**Note:** Replace LICENSE with your project's license; also change license attribute in package.json.
