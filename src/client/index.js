import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from './redux/store';
import App from './App';
import "./css/login.css";

import Auth from './auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App auth={auth} handleAuthentication={handleAuthentication}/>
    </Router>
  </Provider>),
  document.getElementById('root')
);
