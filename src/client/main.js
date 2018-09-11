import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import CurrencyTableContainer from './HomePage';
import AdminPage from './AdminPage';
import Header from './Header';
import CONFIG from "./data/config.json";


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' render={(props) => (
        <CurrencyTableContainer config={CONFIG} />
      )}/>
      <Route exact path='/admin' component={AdminPage} />
    </Switch>
  </main>
);

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>),
  document.getElementById('root')
);
