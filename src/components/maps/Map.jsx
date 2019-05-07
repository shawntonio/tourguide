import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
	state = {
		location: this.props.currentLocation
  }
 
  _onClick = ({x, y, lat, lng}) => {
    // this.setState({location: {lat, lng}})
    this.props.clickLocation({lat, lng})
  }
 
  render() {
    const {currentLocation: loc} = this.props
    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          onClick={this._onClick}
          bootstrapURLKeys={{ key: this.props.gKey }}
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
    );
  }
}
 
export default SimpleMap;