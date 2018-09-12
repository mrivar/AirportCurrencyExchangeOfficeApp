import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, withRouter } from 'react-router-dom'
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import Header from './Header';
import CONFIG from "./data/config.json";


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' render={() => (
        <HomePage config={CONFIG} />
      )}/>
      <Route exact path='/admin' component={AdminPage} />
    </Switch>
  </main>
);

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
