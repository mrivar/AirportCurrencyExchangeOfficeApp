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
        <h1>Airport Currency Exchange Office</h1>
        <section>
          <HeaderButton buttonName="Home" />
          <HeaderButton buttonName="Admin" />
          <HeaderLogo />
        </section>
        <svg width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none" >
          <polygon points="100,0 100,40 5,100 0,70" />
        </svg>
      </div>
    )
  }
}