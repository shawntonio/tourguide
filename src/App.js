import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Tours from './components/tours/Tours';
import Account from './components/account/Account';
import CreateTour from './components/createTour/MyTours';
import TourInfo from './components/createTour/TourInfo';
import Content from './components/createTour/Content';
import Preview from './components/createTour/Preview';
// import auth from './auth/Auth';

function App() {
  
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Tours} />
        <Route path = '/account' component={Account} />
        <Route path = '/make-tour' component={CreateTour} />
        <Route path='/tour-info' component={TourInfo} />
				<Route path='/content' component={Content} />
				<Route path='/preview' component={Preview} />
      </Switch>
    </HashRouter>
  );
}

export default App;
