import React, { Component, PureComponent } from "react";
import ExchangeModal from './ExchangeModal';
import "./css/styles.css";

export class CurrencyRow extends React.Component {

  openModal = () => {
    this.props.openModal(this.props.currency.name);
  }

  render() {
    const success = this.props.success;
    const currency = this.props.currency;
    const marginPct= this.props.marginPct;
    let buyRate  = <span style={{color: 'red'}}>ERR</span>;
    let sellRate = <span style={{color: 'red'}}>ERR</span>;
    if (success === true) {
      buyRate  = (currency.currencyRate * (1 + marginPct/100)).toFixed(4);
      sellRate = (currency.currencyRate * (1 - marginPct/100)).toFixed(4);
    }
    const name     = currency.name;
    const balance  = currency.balance > currency.initialBalance*0.25 ?
      currency.balance.toFixed(2) :
      <span style={{color: 'red'}}>
        {currency.balance.toFixed(2)}
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

export class InformationPanel extends React.PureComponent {
  render() {
    const success = this.props.success;
    if (success === true) {
      const name = this.props.homeCurrencyName;
      const balance = this.props.homeCurrencyBalance.toFixed(2);
      let API_timestamp = this.props.API_timestamp;

      // Translate timestamp to legible date
      API_timestamp = `${API_timestamp.getFullYear()}/${API_timestamp.getMonth()+1}/${API_timestamp.getDate()} ${API_timestamp.getHours()}:${API_timestamp.getMinutes()< 10 ? '0' : ''}${API_timestamp.getMinutes()}:${API_timestamp.getSeconds()< 10 ? '0' : ''}${API_timestamp.getSeconds()}`

      return (
        <p>Exchange rate shown as per {API_timestamp}. You have {balance} {name} left.</p>
      );
    }else{
      return (
        <p style={{color : 'red'}}>There was an error while retrieving the currencies exchange rates.<br />
        Transactions are not allowed while we solve this problem.</p>
      );
    }
  }
}

export default class HomePage extends React.Component {
  state = {
    activateModal: false,
    modalCurrency: 'USD'
  }

  openModal = (modalCurrency) => {
    this.setState({
      activateModal: true,
      modalCurrency: modalCurrency
    });
  }

  closeModal = () => {
    this.setState({
      activateModal: false
    });
  }

  render() {
    const rows = [];
    const config = this.props.config;
    const currencies = this.props.currencies;
    const marginPct  = config.marginPct;
    const homeCurrency = config.homeCurrency;
    let homeCurrencyInfo = {};

    Object.keys(currencies).map((key, index) => {
      const currency = currencies[key];
      if (currency.name === homeCurrency) {
        homeCurrencyInfo = currency;
        return;
      }
      rows.push(
        <CurrencyRow
          currency={currency}
          marginPct={marginPct}
          openModal={this.openModal}
          success={config.success}
          key={currency.name} />
      );
    });

    return (
      <div id="currencyContainer">
        <ExchangeModal
          active={this.state.activateModal}
          closeModal={this.closeModal}
          config={config}
          modalCurrency={this.state.modalCurrency}
          modalCurrencyBalance={currencies[this.state.modalCurrency].balance}
          modalCurrencySymbol={currencies[this.state.modalCurrency].symbol}
          modalCurrencyRate={currencies[this.state.modalCurrency].currencyRate}
          homeCurrency={homeCurrency}
          homeCurrencyBalance={homeCurrencyInfo.balance}
          updateCurrencyBalance={this.props.updateCurrencyBalance}
        />
        <InformationPanel
          homeCurrencyName={homeCurrencyInfo.name}
          homeCurrencyBalance={homeCurrencyInfo.balance}
          API_timestamp={config.API_timestamp}
          success={config.success}
        />
        <CurrencyTable rows={rows} />
      </div>
    );
  }
}
