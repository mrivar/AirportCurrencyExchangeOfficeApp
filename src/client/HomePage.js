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
    let marginPct  = this.props.marginPct;
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

export default class CurrencyTable extends React.Component {
  render() {
    const rows = [];
    let marginPct = this.props.config.marginPct;

    this.props.config.currencies.forEach((currency) => {
      rows.push(
        <CurrencyRow
          currency={currency}
          marginPct={marginPct}
          key={currency.name} />
      );
    });

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
