// @flow

// 3rd-party imports

import React from 'react';
import ReactDOM from 'react-dom';

// local imports

import App from '~/app';

// mount app

const mount = document.getElementById('root');

if (mount) {
  ReactDOM.render(<App />, mount);
}
