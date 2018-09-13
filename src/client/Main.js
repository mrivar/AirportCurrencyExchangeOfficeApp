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
    });
    this.state = {
      config: CONFIG,
      currencies: dict
    };
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={() => (
            <HomePage
              config={this.state.config}
              currencies={this.state.currencies}
            />
          )}/>
          <Route exact path='/admin' render={() => (
            <AdminPage config={this.state.config} />
          )}/>
        </Switch>
      </main>
      
    );
  }
}