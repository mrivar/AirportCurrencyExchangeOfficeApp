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
    this.state = {
      quantity: 100
    };
  }

  handleQuantityChange(e) {
    this.setState({
      quantity: e.target.value
    });
  }

  render() {
    const active = this.props.active ? 'active' : '';
    const config = this.props.config;
    const modalCurrency = this.props.modalCurrency;
    let exchangeRate = 0;
    config.currencies.forEach((currency) => {
      if(currency.name == modalCurrency){
        exchangeRate = currency.currencyRate;
        return;
      }
    });
    const subtotal = exchangeRate * this.state.quantity;
    const commission = Math.max(subtotal*config.comissionPct + config.surcharge, config.minCommission);
    const total = subtotal + commission;

    return (
      <div id="lightbox" className={active}>
        <div className="auxiliarModal" onClick={this.props.closeModal}></div>
        <div className="modal">

          <div className="modalHead">
            <p>Buy {modalCurrency}</p>
            <p onClick={this.props.closeModal}>x</p>
          </div>

          <div className="modalInput">
            <span>€</span>
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
            <button>Buy</button>
            <button onClick={this.props.closeModal}>Cancel</button>
          </div>

        </div>
      </div>
    );
  }
}