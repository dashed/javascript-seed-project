// https://github.com/timarney/react-app-rewired

// 3rd-party imports

const { injectBabelPlugin } = require('react-app-rewired');

// overrides

module.exports = function override(config, env) {
  // https://github.com/tleunen/babel-plugin-module-resolver

  config = injectBabelPlugin(
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~': './src'
        }
      }
    ],
    config
  );

  return config;
};
