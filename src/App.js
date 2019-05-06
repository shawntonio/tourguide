import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Tours from './components/tours/Tours';
import Account from './components/account/Account';
// import auth from './auth/Auth';

function App() {
  
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Tours} />
        <Route path = '/account' component={Account} />
        {/* <Route path = '/make-tour' component={CreateTour} /> */}
      </Switch>
    </HashRouter>
  );
}

export default App;
