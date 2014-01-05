# Test set up from http://stackoverflow.com/a/15464313/412627 and https://github.com/clubajax/mocha-bootstrap

chai = require('chai')
requirejs = require('requirejs')

# Chai
assert = chai.assert
should = chai.should()
expect = chai.expect


describe 'something', (done) ->

  ###
  Notes:
    beforeEach(...) runs executing necessary requirejs code to fetch exported vars
    and attaching it to the 'global' vars.

    This allows all it(...) test to have access to requirejs modules.
  ###

  # Test global var(s)
  SomeApp = undefined

  # 'setup' before each test
  beforeEach((done) ->

    requirejs.config
      baseUrl: './src'
      nodeRequire: require

    requirejs ["config", "main"], (config, main) ->

      # Attach to global var
      SomeApp = main

      # Tests will run after this is called
      done()
    )

  ################## Tests ##################

  describe "when given something", ->

    it "should do this", ->

      # chai API usage here
