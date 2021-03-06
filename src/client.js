import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Game from './components/Game';

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);
