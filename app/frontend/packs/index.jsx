import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../src/root';
import configureStore from '../src/redux/store/store';
import { axiosGetRequest, axiosPostRequest, axiosPutRequest, axiosDeleteRequest } from '../src/util/axios_requests';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.createUser = createUser;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.axiosGetRequest = axiosGetRequest;
  window.axiosPostRequest = axiosPostRequest;
  window.axiosPutRequest = axiosPutRequest;
  window.axiosDeleteRequest = axiosDeleteRequest;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);

});
