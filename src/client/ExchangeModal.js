import React, { Component } from "react";

export class ExchangeModalTable extends React.Component {
  render() {
    const exchangeRate = this.props.exchangeRate;
    const subtotal = this.props.subtotal;
    const commission = this.props.commission;
    const total = this.props.total;

    return (
      <table>
        <tbody>
          <tr>
            <td>Exchange rate</td>
            <td>{exchangeRate.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Subtotal</td>
            <td>{subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Commission</td>
            <td>{commission.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default class ExchangeModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleBuyOrSell = this.handleBuyOrSell.bind(this)
    this.buyOrSellCurrency = this.buyOrSellCurrency.bind(this)
    this.state = {
      quantity: 100,
      buyOrSell: 'Buy'
    };
  }

  handleQuantityChange(e) {
    this.setState({
      quantity: e.target.value
    });
  }

  handleBuyOrSell() {
    let buyOrSell = this.state.buyOrSell;
    if (buyOrSell == 'Buy')       buyOrSell = 'Sell';
    else if (buyOrSell == 'Sell') buyOrSell = 'Buy';

    this.setState({
      buyOrSell: buyOrSell
    });
  }

  buyOrSellCurrency(total) {
    const modalCurrency = this.props.modalCurrency;
    const homeCurrency  = this.props.homeCurrency;
    const buyOrSell = this.state.buyOrSell;

    let modalCurrencyBalance = this.props.modalCurrencyBalance;
    let homeCurrencyBalance  = this.props.homeCurrencyBalance;

    if (buyOrSell == 'Buy'){
      modalCurrencyBalance -= this.state.quantity;
      homeCurrencyBalance  -= total;
    }else if (buyOrSell == 'Sell'){
      modalCurrencyBalance += this.state.quantity;
      homeCurrencyBalance  += total;
    }

    if(modalCurrencyBalance < 0) {
      alert(`We run out of ${modalCurrency}. Unfortunately this transaction is not possible.`);
      return;
    }else if(homeCurrencyBalance < 0) {
      alert(`You run out of ${homeCurrency}. Unfortunately this transaction is not possible.`);
      return;
    }

    this.props.updateCurrencyBalance(modalCurrency, modalCurrencyBalance);
    this.props.updateCurrencyBalance(homeCurrency, homeCurrencyBalance);
    this.props.closeModal();
  }

  render() {
    const active = this.props.active ? 'active' : '';
    const buyOrSell = this.state.buyOrSell;
    const config = this.props.config;
    const modalCurrency = this.props.modalCurrency;
    const marginPct= config.marginPct;
    let exchangeRate = this.props.modalCurrencyRate;

    if (buyOrSell == 'Buy')       exchangeRate *= 1 + marginPct/100;
    else if (buyOrSell == 'Sell') exchangeRate *= 1 - marginPct/100;

    const subtotal = exchangeRate * this.state.quantity;
    const commission = Math.max(subtotal*config.commissionPct/100 + config.surcharge, config.minCommission);
    const total = subtotal + commission;

    return (
      <div id="lightbox" className={active}>
        <div className="auxiliarModal" onClick={this.props.closeModal}></div>
        <div className="modal">

          <div className="modalHead">
            <p>{buyOrSell} {modalCurrency}</p>
            <p onClick={this.props.closeModal}>x</p>
          </div>

          <div className="modalInput">
            <span>{this.props.modalCurrencySymbol}</span>
            <input 
              type="number"
              placeholder="100"
              value={this.state.quantity}
              onChange={this.handleQuantityChange}
            />
            <span>.00</span>
          </div>

          <ExchangeModalTable
            exchangeRate={exchangeRate}
            subtotal={subtotal}
            commission={commission}
            total={total}
          />

          <div className="modalTail">
            <button onClick={(e) => this.buyOrSellCurrency(total, e)}>{buyOrSell}</button>
            <button onClick={this.props.closeModal}>Cancel</button>
            <div className="changeTwoOptions">
              <span id="bg" className={buyOrSell}></span>
              <span>Buy</span>
              <p onClick={this.handleBuyOrSell}>⇋</p>
              <span>Sell</span>
            </div>
          </div>

        </div>
      </div>
    );
  }
}