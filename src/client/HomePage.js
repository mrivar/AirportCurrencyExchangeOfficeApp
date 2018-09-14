import React, { Component } from "react";
import ExchangeModal from './ExchangeModal';
import "./css/styles.css";

export class CurrencyRow extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.props.openModal(this.props.currency.name);
  }

  render() {
    const currency = this.props.currency;
    const marginPct= this.props.marginPct;
    const buyRate  = (currency.currencyRate * (1 + marginPct/100)).toFixed(4);
    const sellRate = (currency.currencyRate * (1 - marginPct/100)).toFixed(4);
    const name     = currency.name;
    const balance  = currency.balance > currency.initialBalance*0.25 ?
      currency.balance :
      <span style={{color: 'red'}}>
        {currency.balance}
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
  render() {
    const name = this.props.homeCurrencyInfo.name;
    const balance = this.props.homeCurrencyInfo.balance;

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
    this.state = {
      activateModal: false,
      modalCurrency: 'USD'
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
    const currencies = this.props.currencies;
    const marginPct  = this.props.config.marginPct;
    const homeCurrency = this.props.config.homeCurrency;
    let homeCurrencyInfo = {};

    Object.keys(currencies).map((key, index) => {
      let currency = currencies[key];
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
          config={this.props.config}
          modalCurrency={this.state.modalCurrency}
          modalCurrencyBalance={currencies[this.state.modalCurrency].balance}
          modalCurrencySymbol={currencies[this.state.modalCurrency].symbol}
          homeCurrency={homeCurrency}
          homeCurrencyBalance={homeCurrencyInfo.balance}
          updateCurrencyBalance={this.props.updateCurrencyBalance}
        />
        <InformationPanel homeCurrencyInfo={homeCurrencyInfo} />
        <CurrencyTable rows={rows} />
      </div>
    );
  }
}
