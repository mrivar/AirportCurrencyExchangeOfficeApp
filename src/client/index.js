import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom'
import Main from './Main';
import Header from './Header';

const HeaderWithRouter = withRouter(props => <Header {...props}/>);

const App = () => (
  <div>
    <HeaderWithRouter />
    <Main />
  </div>
);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>),
  document.getElementById('root')
);
