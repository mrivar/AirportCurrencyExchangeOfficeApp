import React, { Component } from "react";
import "./css/styles.css";
import "./css/admin.css";

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.updateConfig = this.updateConfig.bind(this);
    this.handleRefreshEveryInSecondsOnChange = this.handleRefreshEveryInSecondsOnChange.bind(this);
    this.handleCommissionPct = this.handleCommissionPct.bind(this);
    this.handleSurcharge = this.handleSurcharge.bind(this);
    this.handleMinCommission = this.handleMinCommission.bind(this);
    this.handleMarginPct = this.handleMarginPct.bind(this);

    let config = this.props.config;
    this.state = {
      refreshEveryInSeconds : config.refreshEveryInSeconds,
      commissionPct : config.commissionPct,
      surcharge : config.surcharge,
      minCommission : config.minCommission,
      marginPct : config.marginPct,
    }
  }

  handleRefreshEveryInSecondsOnChange(e) {
    this.setState({
      refreshEveryInSeconds: e.target.value
    });
  }

  handleCommissionPct(e) {
    this.setState({
      commissionPct: parseFloat(e.target.value)
    });
  }

  handleSurcharge(e) {
    this.setState({
      surcharge: parseFloat(e.target.value)
    });
  }

  handleMinCommission(e) {
    this.setState({
      minCommission: parseFloat(e.target.value)
    });
  }

  handleMarginPct(e) {
    this.setState({
      marginPct: parseFloat(e.target.value)
    });
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
          <h1>Settings</h1>
          <p>
            Refresh currency exchange rates every
            <input
              type="number"
              step="1"
              value={this.state.refreshEveryInSeconds}
              onChange={this.handleRefreshEveryInSecondsOnChange}
            />
            seconds
          </p>
          <section>
            <p>
              Commission
              <span className="settingsInput">
                <input
                  type="number"
                  step=".01"
                  value={this.state.commissionPct.toFixed(2)}
                  onChange={this.handleCommissionPct}
                />
                <span>%</span>
              </span>
            </p>
            <p>
              Surcharge
              <span className="settingsInput">
                <input
                  type="number"
                  step=".01"
                  value={this.state.surcharge.toFixed(2)}
                  onChange={this.handleSurcharge}
                />
                <span>$</span>
              </span>
            </p>
            <p>
              Minimal Commission
              <span className="settingsInput">
                <input
                  type="number"
                  step=".01"
                  value={this.state.minCommission.toFixed(2)}
                  onChange={this.handleMinCommission}
                />
                <span>$</span>
              </span>
            </p>
            <p>
              Buy/sell rate margin
              <span className="settingsInput">
                <input
                  type="number"
                  step=".01"
                  value={this.state.marginPct.toFixed(2)}
                  onChange={this.handleMarginPct}
                />
                <span>%</span>
              </span>
            </p>
            <button onClick={this.updateConfig}>
              Update
            </button>
          </section>
        </form>
      </div>
    );
  }
}