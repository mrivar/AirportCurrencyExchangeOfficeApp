import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyTableContainer from './HomePage';
import Header from './Header';
import CONFIG from "./data/config.json";

ReactDOM.render(
  <Header />,
  document.getElementById('header')
);

ReactDOM.render(
  <CurrencyTableContainer config={CONFIG}/>,
  document.getElementById('currencyContainer')
);
