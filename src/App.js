import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {connect } from 'react-redux';
import Axios from 'axios';
import {updateUser} from './store';

import Tours from './components/tours/Tours';

import Account from './components/account/Account';

import MyTours from './components/createTour/MyTours';
import TourInfo from './components/createTour/TourInfo';
import Content from './components/createTour/Content';
import Preview from './components/createTour/editor/Preview';
import Publish from './components/createTour/Publish';

class App extends Component {
  componentDidMount() {
    Axios.get('/auth/user').then(res => {
      const { login_id, username } = res.data
      this.props.updateUser(login_id, username)
    }).catch(err => console.log(err))
  }

  render() {

    return (
      
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Tours} />
            <Route path='/account' component={Account} />
            <Route path='/my-tours' component={MyTours} />
            <Route path='/tour-info' component={TourInfo} />
            <Route path='/content/:id/:count' component={Content} />
            <Route path='/preview/:id' component={Preview} />
            <Route path='/publish/:id' component={Publish} />
          </Switch>
        </HashRouter>
      
    );
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(null, mapDispatchToProps)(App);
