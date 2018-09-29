import React, { PureComponent, Component } from "react";
import { connect } from "react-redux";

class ExchangeModalTable extends React.PureComponent {
  render() {
    const {exchangeRate, subtotal, commission, total} = this.props;

    return (
      <table>
        <tbody>
          <tr>
            <td>Exchange rate</td>
            <td>{exchangeRate.toFixed(3)}</td>
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

const mapStateToProps = state => {
  return {
    commissionPct: state.adminConfigReducer.commissionPct,
    surcharge: state.adminConfigReducer.surcharge,
    minCommission: state.adminConfigReducer.minCommission,
    marginPct: state.adminConfigReducer.marginPct
  };
};

class ExchangeModal extends React.Component {
  state = {
    quantity: 100,
    isBuying: true
  }

  buyOrSellCurrency = (total) => {
    const success = this.props.config.success;
    if (success === false) {
      alert('There was an error while retrieving the currencies exchange rates. Transactions are not allowed while we solve this problem.');
    }else{
      const modalCurrency = this.props.modalCurrency;
      const homeCurrency  = this.props.homeCurrency;
      const isBuying = this.state.isBuying;

      let modalCurrencyBalance = this.props.modalCurrencyBalance;
      let homeCurrencyBalance  = this.props.homeCurrencyBalance;

      if (isBuying){
        modalCurrencyBalance += parseFloat(this.state.quantity);
        homeCurrencyBalance  -= total;
      }else{
        modalCurrencyBalance -= parseFloat(this.state.quantity);
        homeCurrencyBalance  += total;
      }

      if(modalCurrencyBalance < 0) {
        alert(`We run out of ${modalCurrency}. Unfortunately this transaction is not possible.`);
        return;
      }else if(homeCurrencyBalance < 0) {
        alert(`You do not have enough ${homeCurrency} to complete this transaction.`);
        return;
      }

      this.props.updateCurrencyBalance(modalCurrency, modalCurrencyBalance);
      this.props.updateCurrencyBalance(homeCurrency, homeCurrencyBalance);
      this.props.closeModal();
    }
  }

  render() {
    const active = this.props.active ? 'active' : '';
    const isBuying = this.state.isBuying;
    const buyOrSell = isBuying ? 'Buy' : 'Sell';
    const {modalCurrency,marginPct,commissionPct,surcharge,minCommission,modalCurrencySymbol,closeModal} = this.props;

    let exchangeRate = this.props.modalCurrencyRate;

    if (isBuying) exchangeRate *= 1 + marginPct/100;
    else          exchangeRate *= 1 - marginPct/100;

    const subtotal = exchangeRate * this.state.quantity;
    const commission = Math.max(subtotal*commissionPct/100 + surcharge, minCommission);
    const total = subtotal + commission;

    return (
      <div id="lightbox" className={active}>
        <div className="auxiliarModal" onClick={closeModal}></div>
        <div className="modal">

          <div className="modalHead">
            <p>{buyOrSell} {modalCurrency}</p>
            <p onClick={closeModal}>x</p>
          </div>

          <div className="modalInput">
            <span>{modalCurrencySymbol}</span>
            <input 
              type="number"
              placeholder="100"
              value={this.state.quantity}
              onChange={e => this.setState({quantity: e.target.value})}
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
            <button onClick={closeModal}>Cancel</button>
            <div className="changeTwoOptions">
              <span id="bg" className={buyOrSell}></span>
              <span>Buy</span>
              <p onClick={(e) => this.setState(prevState => ({isBuying: !prevState.isBuying}))}>⇋</p>
              <span>Sell</span>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ExchangeModal);