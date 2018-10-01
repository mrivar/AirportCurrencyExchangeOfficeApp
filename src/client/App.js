import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { updateExchangeRates, updateExchangeRatesFailed } from "./redux/actions/actions";
import Header from './Header';
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import CONFIG from './data/config.json';

import Callback from './Callback';
import { handleAuthentication } from './auth';
import history from './history';

const HeaderWithRouter = withRouter(props => <Header {...props}/>);

const mapStateToProps = state => {
  return {
    refreshEveryInSeconds: state.adminConfigReducer.refreshEveryInSeconds,
    API_access_key: state.currenciesReducer.API_access_key,
    API_currencies: state.currenciesReducer.API_currencies,
    homeCurrency: state.currenciesReducer.homeCurrency,
    currencies: state.currenciesReducer.currencies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateExchangeRates: (currencies, success, API_timestamp) => dispatch(updateExchangeRates(currencies, success, API_timestamp)),
    updateExchangeRatesFailed: () => dispatch(updateExchangeRatesFailed())
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this._timerInterval = null;
  }

  login = () => {
    this.props.auth.login();
  }

  componentDidMount() {
    this.updateExchangeRates();

    const refreshEveryInSeconds = this.props.refreshEveryInSeconds;
    if (refreshEveryInSeconds > 0) {
      this._timerInterval = setInterval(this.updateExchangeRates, refreshEveryInSeconds * 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this._timerInterval);
  }

  updateTimerInterval = (refreshEveryInSeconds) => {
    clearInterval(this._timerInterval);
    if (refreshEveryInSeconds > 0) {
      this._timerInterval = setInterval(this.updateExchangeRates, refreshEveryInSeconds * 1000);
    }
  }

  updateExchangeRates = () => {
    const currencies = this.props.currencies;
    const API_access_key = this.props.API_access_key;
    const API_currencies = this.props.API_currencies;
    const homeCurrency = this.props.homeCurrency;
    fetch(`http://apilayer.net/api/live?access_key=${API_access_key}&currencies=${API_currencies}&source=${homeCurrency}`)
      .then((response) => response.json())
      .then(data => {

        // Update exchange rates through API
        Object.keys(currencies).map((key, index) => {
          const currency_json_name = `${homeCurrency}${key}`;
          const oldCurrencyRate = currencies[key].currencyRate;
          currencies[key].currencyRate = 1/data.quotes[currency_json_name];

          // Add stochastic randomness if currency exchange rate stays the same
          if(oldCurrencyRate === currencies[key].currencyRate){
            // Random number between -2% and 2%
            let randomness = Math.floor((Math.random() * 2) + 1)/100;
            randomness    *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

            currencies[key].currencyRate *= (1 + randomness);
          }
        });

        //API_timestamp = new Date(data.timestamp * 1000);
        // Last exchange rate update should be the one above. As we are adding stochastic randomness we use this exact moment.
        // Update exchange rates in state
        this.props.updateExchangeRates(currencies, true, new Date());
      })
      .catch(error => {
        console.warn(error);
        this.props.updateExchangeRatesFailed();
      });
  }


  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <HeaderWithRouter />
        <main>
        {
          isAuthenticated()
          ?
            <Switch history={history}>
              <Route exact path='/' render={() => (
                <HomePage />
              )}/>
              <Route exact path='/admin' render={() => (
                <AdminPage
                  updateTimerInterval={this.updateTimerInterval}
                />
              )}/>
              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
              }}/>
            </Switch>
          :
            <Switch history={history}>
              <Route exact path='/' render={() => (
                <button onclick={this.login()}>Log In</button>
              )}/>
              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
              }}/>
            </Switch>
          }
        </main>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));