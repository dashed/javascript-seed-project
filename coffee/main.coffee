
class SomeApp

    constructor: ()->
        return

# module.exports = SomeApp

shout = require('./shout')

beep = ()->
    console.log(shout('beep'))

module.exports = beep
