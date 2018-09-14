import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import CONFIG from './data/config.json';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    // Create currency dictionary & currency API list
    let currencies = CONFIG.currencies;
    let dict = {};
    let API_currencies = "";
    currencies.forEach((currency) => {
      dict[currency.name] = currency;
      dict[currency.name].balance = currency.initialBalance;
      API_currencies += `${currency.name},`;
    });
    CONFIG.API_currencies = API_currencies.slice(0, -1);
    CONFIG.API_timestamp  = new Date();

    // Bind functions
    this.updateCurrencyBalance = this.updateCurrencyBalance.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.updateExchangeRates = this.updateExchangeRates.bind(this);

    this.state = {
      config: CONFIG,
      currencies: dict
    };

    this.updateExchangeRates();
  }

  updateCurrencyBalance(key, balance) {
    let currencies = this.state.currencies;
    currencies[key].balance = balance;
    this.setState({
       currencies: currencies
    });
  }

  updateConfig(refreshEveryInSeconds, commissionPct, surcharge, minCommission, marginPct) {
    let config = this.state.config;
    config.refreshEveryInSeconds = refreshEveryInSeconds;
    config.commissionPct = commissionPct;
    config.surcharge     = surcharge;
    config.minCommission = minCommission;
    config.marginPct     = marginPct;
    this.setState({
       config: config
    });
  }

  updateExchangeRates() {
    let config = this.state.config;
    let currencies = this.state.currencies;
    fetch(`http://apilayer.net/api/live?access_key=${config.API_access_key}&currencies=${config.API_currencies}&source=${config.homeCurrency}`)
      .then((response) => response.json())
      .then(data => {

        // Update exchange rates through API
        Object.keys(currencies).map((key, index) => {
          let currency_json_name = `${config.homeCurrency}${key}`;
          currencies[key].currencyRate = data.quotes[currency_json_name];
        });

        config.API_timestamp = new Date(data.timestamp * 1000);

        // Update exchange rates in state
        this.setState({
          config: config,
          currencies: currencies
        });
      })
      .catch(error => console.warn(error));
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={() => (
            <HomePage
              config={this.state.config}
              currencies={this.state.currencies}
              updateCurrencyBalance={this.updateCurrencyBalance}
            />
          )}/>
          <Route exact path='/admin' render={() => (
            <AdminPage
              config={this.state.config}
              updateConfig={this.updateConfig}
            />
          )}/>
        </Switch>
      </main>
      
    );
  }
}