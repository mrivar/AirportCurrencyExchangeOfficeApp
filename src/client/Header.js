import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./css/header.css";

export class HeaderButton extends React.Component {
  render() {
    const buttonName = this.props.buttonName;
    const url = this.props.url;
    const active = this.props.currentPath == url ? 'active' : '';

    return (
      <Link to={url}>
        <button className={active}>
          {buttonName}
        </button>
      </Link>
    )
  }
}

export class HeaderLogo extends React.Component {
  render() {
    return (
      <img src={require('./images/logo.png')} />
    )
  }
}

export default class Header extends React.Component {
  render() {
    const currentPath = this.props.location.pathname;

    return(
      <header role="heading">
        <div id="headerContainer">
          <h1>Airport Currency Exchange Office</h1>
          <section>
            <HeaderButton buttonName="Home" url="/" currentPath={currentPath} />
            <HeaderButton buttonName="Admin" url="/admin" currentPath={currentPath} />
            <HeaderLogo />
          </section>
          <svg width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none" >
            <polygon points="100,0 100,40 5,100 0,65" />
          </svg>
        </div>
      </header>
    )
  }
}