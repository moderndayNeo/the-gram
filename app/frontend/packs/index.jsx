import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../src/root';
import configureStore from '../src/redux/store/store';
import { createUser } from '../src/util/session';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = undefined;

  if (window.currentUser) {
    preloadedState = {
      entities: {
        users: {},
        posts: {},
        comments: {},
        likes: {}
      },
      session: window.currentUser,
      errors: {},
    };
  }

  const store = configureStore(preloadedState);

  window.createUser = createUser;
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);

});
