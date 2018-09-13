import React, { Component } from "react";
import ExchangeModal from './ExchangeModal';
import "./css/styles.css";

export class CurrencyRow extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.state = {
      balance: props.currency.initialBalance.toFixed(2)
    };
  }

  openModal() {
    this.props.openModal(this.props.currency.name);
  }

  render() {
    const currency = this.props.currency;
    const marginPct= this.props.marginPct;
    const buyRate  = (currency.currencyRate * (1 + marginPct)).toFixed(4);
    const sellRate = (currency.currencyRate * (1 - marginPct)).toFixed(4);
    const name     = currency.name;
    const balance  = this.state.balance > currency.initialBalance*0.25 ?
      this.state.balance :
      <span style={{color: 'red'}}>
        {this.state.balance}
      </span>;

    return (
      <tr onClick={this.openModal}>
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
      <table id="currencyTable">
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
      balance: props.homeCurrency.initialBalance.toFixed(2)
    };
  }

  render() {
    const name = this.props.homeCurrency.name;
    const balance = this.state.balance;

    return (
      <p>Exchange rate shown as per X. You have {balance} {name} left.</p>
    );
  }
}

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.openModal  = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.config = this.props.config;
    this.state = {
      activateModal: false,
      modalCurrency: ''
    };
  }

  openModal(modalCurrency) {
    this.setState({
      activateModal: true,
      modalCurrency: modalCurrency
    });
  }

  closeModal() {
    this.setState({
      activateModal: false
    });
  }

  render() {
    const rows = [];
    const marginPct = this.config.marginPct;
    const homeCurrency = this.config.homeCurrency;
    let homeCurrencyInfo = {};

    this.config.currencies.forEach((currency) => {
      if (currency.name == homeCurrency) {
        homeCurrencyInfo = currency;
        return;
      }
      rows.push(
        <CurrencyRow
          currency={currency}
          marginPct={marginPct}
          openModal={this.openModal}
          key={currency.name} />
      );
    });

    return (
      <div id="currencyContainer">
        <ExchangeModal
          active={this.state.activateModal}
          closeModal={this.closeModal}
          config={this.config}
          modalCurrency={this.state.modalCurrency}
        />
        <InformationPanel homeCurrency={homeCurrencyInfo} />
        <CurrencyTable rows={rows} />
      </div>
    );
  }
}
