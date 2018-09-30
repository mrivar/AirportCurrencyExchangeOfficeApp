import React, { Component } from "react";
import { connect } from "react-redux";
import { changeAdminConfig } from "./redux/actions/actions";
import "./css/admin.css";

class AdminInput extends React.Component {
  render() {
    return(
      <p>
        {this.props.inputName}
        <span className="settingsInput">
          <input
            type="number"
            step=".1"
            min="0"
            value={this.props.inputValue}
            onChange={this.props.handleChange}
          />
          <span>{this.props.inputSymbol}</span>
        </span>
      </p>
    )
  }
}

const mapStateToProps = state => {
  return {
    refreshEveryInSeconds: state.adminConfigReducer.refreshEveryInSeconds,
    commissionPct: state.adminConfigReducer.commissionPct,
    surcharge: state.adminConfigReducer.surcharge,
    minCommission: state.adminConfigReducer.minCommission,
    marginPct: state.adminConfigReducer.marginPct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeAdminConfig: (refreshEveryInSeconds, commissionPct, surcharge, minCommission, marginPct) => dispatch(
      changeAdminConfig(refreshEveryInSeconds, commissionPct, surcharge, minCommission, marginPct)
    )
  };
};

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshEveryInSeconds : this.props.refreshEveryInSeconds,
      commissionPct : this.props.commissionPct,
      surcharge : this.props.surcharge,
      minCommission : this.props.minCommission,
      marginPct : this.props.marginPct
    }
  }

  updateConfig = (e) => {
    e.preventDefault();
    this.props.changeAdminConfig(
      this.state.refreshEveryInSeconds,
      this.state.commissionPct,
      this.state.surcharge,
      this.state.minCommission,
      this.state.marginPct
    );

    this.props.updateTimerInterval(this.state.refreshEveryInSeconds);
  }

  render() {
    return(
      <div className="mainContainer">
        <form>
          <h1><i className="icomoon-settings"></i>Settings</h1>
          <p className="refreshInput">
            Refresh currency exchange rates every
            <input
              type="number"
              step="1"
              min="0"
              value={this.state.refreshEveryInSeconds}
              onChange={e => this.setState({refreshEveryInSeconds: e.target.value})}
            />
            seconds
          </p>
          <section>
            <AdminInput
              inputName="Commission"
              inputValue={this.state.commissionPct.toFixed(2)}
              handleChange={e => this.setState({commissionPct: parseFloat(e.target.value)})}
              inputSymbol="%"
            />
            <AdminInput
              inputName="Surcharge"
              inputValue={this.state.surcharge.toFixed(2)}
              handleChange={e => this.setState({surcharge: parseFloat(e.target.value)})}
              inputSymbol="$"
            />
            <AdminInput
              inputName="Minimal Commission"
              inputValue={this.state.minCommission.toFixed(2)}
              handleChange={e => this.setState({minCommission: parseFloat(e.target.value)})}
              inputSymbol="$"
            />
            <AdminInput
              inputName="Buy/sell rate margin"
              inputValue={this.state.marginPct.toFixed(2)}
              handleChange={e => this.setState({marginPct: parseFloat(e.target.value)})}
              inputSymbol="%"
            />
            <button onClick={this.updateConfig}>
              Update
            </button>
          </section>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);