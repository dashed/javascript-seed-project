coffeescript-seed-project
=========================

Seed git repo for coffeescript-based projects. Just clone and code.

Inspired by projects like [ultimate-seed](https://github.com/pilwon/ultimate-seed) and [angular-seed](https://github.com/angular/angular-seed). Unlike these seeds, this seed aims to be as generic and light as possible without catering to a partular application niche (e.g. angularjs-based apps).

Included
========

* [CoffeeScript](http://coffeescript.org/) - syntatic sugar
* [RequireJS](http://requirejs.org/) - JavaScript file and module loader
* [Gulp](http://gulpjs.com/) - build system
* [mocha](https://github.com/visionmedia/mocha) + [chai.js](http://chaijs.com/) = test framework + assertion framework
* [istanbul](https://github.com/gotwarlost/istanbul) - JS code coverage
* [travis-ci](https://travis-ci.org/) - continuous integration service for testing
* [node-coveralls](https://github.com/cainus/node-coveralls) - lcov posting to [coveralls.io](https://coveralls.io) for public code coverage analysis



Set up
======

1. Clone this git repo. Run `npm install` to download `devDependencies`.

2.  Personalize `LICENSE`, `package.json`, and this `README` file as you see fit for your project.

    See [npm docs](https://npmjs.org/doc/json.html) for more on `package.json`.

## travis-ci

Customize `.travis.yml` to your liking (e.g node envs). See [travis-ci docs](http://about.travis-ci.org/docs/user/languages/javascript-with-nodejs/).

Note that the `script:` attribute is particularly important. This tells travis-ci what to run in the command-line.

travis-ci would execute the following: `npm run test-travis`

## coveralls.io

Like Travis-CI, Coveralls.io has its own dotfile: `.coveralls.yml`

Though not required, it's useful to trigger the coveralls code coverage service from the local environment.

To use it:

1. Rename `.coveralls.yml_default` to `.coveralls.yml`

2. Replace `REPO_TOKEN_HERE` within `.coveralls.yml` with the actual repo token from [coveralls.io](https://coveralls.io).

3. To trigger coveralls code coverage task, run `npm run test-travis`

**Note:** The option `repo_token` (found on your repository's page on Coveralls) is used to specify which project on Coveralls your local source code project maps to. This is only needed for private repos and should be kept secret -- **anyone could use it to submit coverage data on your repo's behalf**!

See [coveralls.io docs](https://coveralls.io/docs/supported_continuous_integration).

## .gitignore

Minorly customized from [Node.gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore) provided by GitHub.

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

2. Run test(s): `npm test` ( or `mocha`, but `npm test` is recommended)

3.  Run instanbul: `npm test --coverage`

    This generates HTML code coverage report within `./coverage/` folder.

See [mocha docs](https://github.com/visionmedia/mocha), [chai.js style guide](http://chaijs.com/guide/), and [chai.js API docs](http://chaijs.com/api/).

## Code Coverage

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
