import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import {StripeProvider} from 'react-stripe-elements';

import { updateUser } from './store';
import Tours from './components/tours/Tours';
import Account from './components/account/Account';
import MyTours from './components/createTour/WorkBench';
import TourInfo from './components/createTour/TourInfo';
import Content from './components/createTour/Content';
import TourView from './components/createTour/editor/TourView';
import Publish from './components/createTour/Publish';
import LocalTours from './components/tours/LocalTours';
import Buy from './components/tours/Buy';
// import FromFollowed from './FromFollowed'

class App extends Component {
  componentDidMount() {
    Axios.get('/auth/user').then(res => {
      const { login_id, username } = res.data
      this.props.updateUser(login_id, username)
    }).catch(err => console.log(err))
  }

  render() {

    return (

      <StripeProvider apiKey={process.env.REACT_APP_STRIPE}>
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Tours} />
            <Route path='/local-tours' component={LocalTours} />
						<Route path='/buy/:id' component={Buy} />
            {/* <Route path='/from-followed' component={FromFollowed} /> */}

            <Route path='/account' component={Account} />
            <Route path='/my-tours' component={MyTours} />
            <Route path='/tour-info' component={TourInfo} />
            <Route path='/content/:id/:count' component={Content} />
            <Route path='/tour-view/:id' component={TourView} />
            <Route path='/publish/:id' component={Publish} />
          </Switch>
        </HashRouter>
      </StripeProvider>

    );
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(null, mapDispatchToProps)(App);
