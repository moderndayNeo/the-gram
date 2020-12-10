import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../src/root';
import configureStore from '../src/redux/store/store';
import { createUser, loginUser, logoutUser } from '../src/util/session';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = undefined;

  if (window.currentUser) {
    preloadedState = {
      session: Object.values(window.currentUser)[0]
    };
  }
  
  const store = configureStore(preloadedState);


  window.createUser = createUser;
  window.loginUser = loginUser;
  window.logoutUser = logoutUser;
  window.getState = store.getState
  window.dispatch = store.dispatch

  
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

// logoutUser().then(res => console.log(res))