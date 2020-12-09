import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../src/root';
import configureStore from '../src/redux/store/store';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  // pass the current user into the store here

  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);

});
