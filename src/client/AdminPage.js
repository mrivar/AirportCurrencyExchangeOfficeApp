import React, { Component } from "react";
import "./css/styles.css";
import "./css/admin.css";

export class AdminInput extends React.Component {
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

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    let config = this.props.config;
    this.state = {
      refreshEveryInSeconds : config.refreshEveryInSeconds,
      commissionPct : config.commissionPct,
      surcharge : config.surcharge,
      minCommission : config.minCommission,
      marginPct : config.marginPct,
    }
  }

  updateConfig(e){
    e.preventDefault();
    this.props.updateConfig(
      this.state.refreshEveryInSeconds,
      this.state.commissionPct,
      this.state.surcharge,
      this.state.minCommission,
      this.state.marginPct
    );
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