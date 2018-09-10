import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyTable from './HomePage';
import CONFIG from "./data/config.json";

ReactDOM.render(
	<CurrencyTable config={CONFIG}/>,
	document.getElementById('currencyContainer')
);
