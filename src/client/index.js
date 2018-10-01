import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import store from './redux/store';
import App from './App';
import "./css/login.css";

import auth from './auth';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App auth={auth} />
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
