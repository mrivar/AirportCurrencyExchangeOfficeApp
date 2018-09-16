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

    this.state = {
      config: CONFIG,
      currencies: dict,
      timer: null
    };

    this.updateExchangeRates();
  }

  updateCurrencyBalance = (key, balance) => {
    let currencies = this.state.currencies;
    currencies[key].balance = balance;
    this.setState({
       currencies: currencies
    });
  }

  updateConfig = (refreshEveryInSeconds, commissionPct, surcharge, minCommission, marginPct) => {
    let config = this.state.config;
    if(refreshEveryInSeconds >= 0) config.refreshEveryInSeconds = refreshEveryInSeconds;
    if(commissionPct >= 0)         config.commissionPct = commissionPct;
    if(surcharge >= 0)             config.surcharge     = surcharge;
    if(minCommission >= 0)         config.minCommission = minCommission;
    if(marginPct >= 0)             config.marginPct     = marginPct;
    clearInterval(this.state.timer);
    if (refreshEveryInSeconds > 0) {
      let timer = setInterval(this.updateExchangeRates, refreshEveryInSeconds * 1000);
      this.setState({
         config: config,
         timer: timer
      });
    }
  }

  updateExchangeRates = () => {
    let config = this.state.config;
    let currencies = this.state.currencies;
    fetch(`http://apilayer.net/api/live?access_key=${config.API_access_key}&currencies=${config.API_currencies}&source=${config.homeCurrency}`)
      .then((response) => response.json())
      .then(data => {

        // Update exchange rates through API
        Object.keys(currencies).map((key, index) => {
          let currency_json_name = `${config.homeCurrency}${key}`;
          let oldCurrencyRate = currencies[key].currencyRate;
          currencies[key].currencyRate = 1/data.quotes[currency_json_name];

          // Add stochastic randomness if currency exchange rate stays the same
          if(oldCurrencyRate == currencies[key].currencyRate){
            // Random number between -2% and 2%
            let randomness = Math.floor((Math.random() * 2) + 1)/100;
            randomness    *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

            currencies[key].currencyRate *= (1 + randomness);
          }
        });

        //config.API_timestamp = new Date(data.timestamp * 1000);
        // Last exchange rate update should be the one above. As we are adding stochastic randomness we use this exact moment.
        config.API_timestamp = new Date();

        // Update exchange rates in state
        config.success = true;
        this.setState({
          config: config,
          currencies: currencies
        });
      })
      .catch(error => {
        console.warn(error);
        config.success = false;
        this.setState({
          config: config
        });
      });
  }

  componentDidMount() {
    const refreshEveryInSeconds = this.state.config.refreshEveryInSeconds;
    if (refreshEveryInSeconds > 0) {
      let timer = setInterval(this.updateExchangeRates, refreshEveryInSeconds * 1000);
      this.setState({
        timer: timer
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
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