// @flow

// 3rd-party imports

import React from 'react';
import ReactDOM from 'react-dom';

// local imports

import App from '~/app';

// tests

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
