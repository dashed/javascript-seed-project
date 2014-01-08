var SomeApp, beep, shout;

SomeApp = (function() {
  function SomeApp() {
    return;
  }

  return SomeApp;

})();

shout = require('./shout');

beep = function() {
  return console.log(shout('beep'));
};

module.exports = beep;
