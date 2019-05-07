import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Tours from './components/tours/Tours';
import Account from './components/account/Account';
import MyTours from './components/createTour/MyTours';
import TourInfo from './components/createTour/TourInfo';
import Content from './components/createTour/Content';
import Preview from './components/createTour/Preview';
import store from './store';

function App() {
  
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Tours} />
          <Route path = '/account' component={Account} />
          <Route path = '/my-tours' component={MyTours} />
          <Route path='/tour-info' component={TourInfo} />
          <Route path='/content' component={Content} />
          <Route path='/preview' component={Preview} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
