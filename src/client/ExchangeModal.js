import React, { Component } from "react";

export class ExchangeModalTable extends React.Component {
  render() {
    const exchangeRate = this.props.exchangeRate;
    const subtotal = this.props.subtotal;
    const commission = this.props.commission;
    const total = subtotal + commission;

    return (
      <table>
        <tbody>
          <tr>
            <td>Exchange rate</td>
            <td>{exchangeRate}</td>
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
  render() {
    const active = this.props.active ? 'active' : '';

    return (
      <div id="lightbox" className={active}>
        <div className="auxiliarModal" onClick={this.props.closeModal}></div>
        <div className="modal">

          <div className="modalHead">
            <p>Buy EUR</p>
            <p onClick={this.props.closeModal}>x</p>
          </div>

          <div className="modalInput">
            <span>€</span>
            <input 
              type="number"
              placeholder="100"
            />
            <span>.00</span>
          </div>

          <ExchangeModalTable exchangeRate={1} subtotal={1} commission={1} />

          <div className="modalTail">
            <button>Buy</button>
            <button onClick={this.props.closeModal}>Cancel</button>
          </div>

        </div>
      </div>
    );
  }
}