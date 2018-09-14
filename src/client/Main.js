import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import CONFIG from './data/config.json';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    // create currency dictionary
    let currencies = CONFIG.currencies;
    let dict = {};
    currencies.forEach((currency) => {
      dict[currency.name] = currency;
      dict[currency.name].balance = currency.initialBalance;
    });

    this.updateCurrencyBalance = this.updateCurrencyBalance.bind(this);
    this.updateConfig = this.updateConfig.bind(this);

    this.state = {
      config: CONFIG,
      currencies: dict
    };
  }

  updateCurrencyBalance(key, balance) {
    let currencies = this.state.currencies;
    currencies[key].balance = balance;
    this.setState({
       currencies: currencies
    });
  }

  updateConfig(refreshEveryInSeconds, commission, surcharge, minCommission, marginPct) {
    let config = this.state.config;
    config.refreshEveryInSeconds = refreshEveryInSeconds;
    config.commission    = commission;
    config.surcharge     = surcharge;
    config.minCommission = minCommission;
    config.marginPct     = marginPct;
    this.setState({
       config: config
    });
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