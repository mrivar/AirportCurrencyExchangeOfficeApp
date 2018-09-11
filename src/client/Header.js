import React, { Component } from "react";
import "./header.css";

export class HeaderButton extends React.Component {
  render() {
    const buttonName = this.props.buttonName;

    return (
      <button>
        {buttonName}
      </button>
    )
  }
}

export class HeaderLogo extends React.Component {
  render() {
    return (
      <img src={require('./images/logo.jpg')} />
    )
  }
}

export default class Header extends React.Component {
  render() {
    return(
      <div id="headerContainer">
        <p>Airport Currency Exchange Office App</p>
        <section>
          <HeaderButton buttonName="Home" />
          <HeaderButton buttonName="Admin" />
          <HeaderLogo />
        </section>
      </div>
    )
  }
}