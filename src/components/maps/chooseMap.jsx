import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const {REACT_APP_GOOGLE_KEY} = process.env;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class ChooseMap extends Component {
  state = {
    location: this.props.currentLocation,
    showMap: false
  }

  componentDidMount() {
		axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${REACT_APP_GOOGLE_KEY}`).then(res => {
      this.props.clickLocation(res.data.location)
		}).catch(err => console.log(err))
	}

  _onClick = ({ x, y, lat, lng }) => {
    this.props.clickLocation({ lat, lng })
  }

  showMap = () => {
		this.setState({showMap: true})
  }
  
  hideMap = () => {
		this.setState({showMap: false})
		this.componentDidMount()
	}

  render() {
    const { currentLocation: loc } = this.props
    return (
      <div>
        <div className="inputs">
          <label>Choose Location</label>
          <div>
            <input onClick={this.hideMap} type="radio" name="location" />
            <label>Use Current Location</label>
          </div>

          <div>
            <input onClick={this.showMap} type="radio" name="location" />
            <label>Choose from map</label>
          </div>
        </div>

        {this.state.showMap && (
          <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
              onClick={this._onClick}
              bootstrapURLKeys={{ key: REACT_APP_GOOGLE_KEY }}
              center={loc}
              defaultZoom={17}

            >
              <AnyReactComponent
                lat={loc.lat}
                lng={loc.lng}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        )}
      </div>
    );
  }
}

export default ChooseMap;