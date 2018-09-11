import React, { Component } from "react";
import "./styles.css";

export class CurrencyRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: props.currency.initialBalance
    };
  }

  render() {
    const currency = this.props.currency;
    const marginPct  = this.props.marginPct;
    const buyRate  = currency.fakeCurrencyRate * (1 + marginPct);
    const sellRate = currency.fakeCurrencyRate * (1 - marginPct);
    const name     = currency.name;
    const balance  = this.state.balance > currency.initialBalance*0.25 ?
      this.state.balance :
      <span style={{color: 'red'}}>
        {this.state.balance}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{buyRate}</td>
        <td>{sellRate}</td>
        <td>{balance}</td>
      </tr>
    );
  }
}

export class CurrencyTable extends React.Component {
  render() {
    const rows = this.props.rows;

    return (
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export class InformationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: props.currency.initialBalance
    };
  }

  render() {
    const name = this.props.currency.name;
    const balance = this.state.balance;

    return (
      <p>Exchange rate shown as per X. You have {balance} USD left.</p> 
    );
  }
}

export default class CurrencyTableContainer extends React.Component {
  render() {
    const config = this.props.config;
    const rows = [];
    const marginPct = this.props.config.marginPct;
    const homeCurrency = this.props.config.homeCurrency;
    let homeCurrencyInfo = {};

    config.currencies.forEach((currency) => {
      if (currency.name == homeCurrency) {
        homeCurrencyInfo = currency;
        return;
      }
      rows.push(
        <CurrencyRow
          currency={currency}
          marginPct={marginPct}
          key={currency.name} />
      );
    });

    return (
      <div id="currencyContainer">
        <InformationPanel currency={homeCurrencyInfo} />
        <CurrencyTable rows={rows} />
      </div>
    );
  }
}