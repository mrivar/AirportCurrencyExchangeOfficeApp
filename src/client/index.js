import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom'
import Main from './Main';
import Header from './Header';
import "./css/login.css";

const HeaderWithRouter = withRouter(props => <Header {...props}/>);

class App extends React.Component{
  state = {
    login: false,
    password: ""
  }

  login = (password) => {
    // Hash password
    let hash = 0;
    /**
     * @see http://stackoverflow.com/q/7616461/940217
     * @return {number}
     */
    if (Array.prototype.reduce){
        hash = password.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
    } else {
      if (password.length === 0){
        hash
      }else{
        for (let i = 0; i < password.length; i++) {
            const character  = password.charCodeAt(i);
            hash  = ((hash<<5)-hash)+character;
            hash = hash & hash; // Convert to 32bit integer
        }
      }
    }

    // Check if password is correct
    if (hash === -1012813181) {
      this.setState({
        login: true 
      });
    }
  }

  render() {
    if (this.state.login === false) {
      return (
        <div id="login">
          <form onSubmit={this.login(this.state.password)}>
            <label>Password:</label><br />
            <input
              type="text"
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
            />
            <button>
              Log In
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <HeaderWithRouter />
          <Main />
        </div>
      );
    }
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>),
  document.getElementById('root')
);
