import React, { Component } from 'react';
import './App.scss';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import { StripeProvider } from 'react-stripe-elements';

import { updateUser, setLocation } from './store';
import Account from './components/account/Account';
import Workbench from './components/createTour/workbench/Workbench';
import CreateTour from './components/createTour/CreateTour';
import TourView from './components/createTour/editor/TourView';
import Publish from './components/createTour/publish/Publish';
import LocalTours from './components/tours/localTours/LocalTours';
import Buy from './components/tours/buy/Buy';
import MyTours from './components/tours/MyTours';

class App extends Component {
  componentDidMount() {
    Axios.get('/auth/user').then(res => {
      const { login_id, username } = res.data
      this.props.updateUser(login_id, username)
    }).catch(err => console.log(err))

    const options = {
      timeout: 27000
    }


    if ("geolocation" in navigator) {
      
      navigator.geolocation.getCurrentPosition(position => {
        this.props.setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }, err => console.log(`${err.code}`), options)
    } else {
      alert('geolocaiton not available')
    }

  }

  render() {

    return (

      <StripeProvider apiKey={process.env.REACT_APP_STRIPE}>
        <HashRouter>
          <Switch>
            <Route exact path='/' component={LocalTours} />
            <Route path='/buy/:id' component={Buy} />
            <Route path='/my-tours' component={MyTours} />

            <Route path='/account' component={Account} />
            <Route path='/workbench' component={Workbench} />
            <Route path='/tour-info' component={CreateTour} />
            <Route path='/tour-view/:id' component={TourView} />
            <Route path='/publish/:id' component={Publish} />
          </Switch>
        </HashRouter>
      </StripeProvider>

    );
  }
}

const mapDispatchToProps = {
  updateUser,
  setLocation
}

export default connect(null, mapDispatchToProps)(App);
