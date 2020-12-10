import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../src/root';
import configureStore from '../src/redux/store/store';
import { createUser, loginUser, logoutUser } from '../src/util/session';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = undefined;

  if (window.currentUser) {
    preloadedState = {
      session: {
        currentUser: window.currentUser
      }
    };
  }

  window.createUser = createUser;
  window.loginUser = loginUser;
  window.logoutUser = logoutUser;

  const store = configureStore(preloadedState);

  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);

});



// createUser({
//   name: 'omar',
//   username: 'omarlittle',
//   email: 'omar@example.com',
//   password: 'thewire'
// })

// loginUser({
//   username: 'arnie85',
//   password: 'mrolympia85'
// }).then(success => console.log(success))