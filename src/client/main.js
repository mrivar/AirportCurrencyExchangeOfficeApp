import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyTableContainer from './HomePage';
import CONFIG from "./data/config.json";

ReactDOM.render(
	<CurrencyTableContainer config={CONFIG}/>,
	document.getElementById('currencyContainer')
);
