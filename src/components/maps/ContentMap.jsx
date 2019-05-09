import React, { Component } from 'react';
import { Marker, Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
// import {FaMapMarkerAlt} from 'react-icons/fa';


class ContentMap extends Component {
	state = {
		tour: {},
		content: []
	}

	componentDidMount() {
		const { id } = this.props
		axios.get(`/api/tour/${id}`).then(res => {
			this.setState({ tour: res.data })
		}).catch(err => console.log(err))

		axios.get(`/api/content/${id}`).then(res => {
			this.setState({ content: res.data })
		})
	}

	render() {
		const { lat, lng } = this.state.tour

		const contentMarker = this.state.content.map(marker => {
			const {lat, lng} = marker
			return (
				<Marker
					position={{lat, lng}}
				/>
			)
		})
		return (
			<Map
				google={this.props.google}
				zoom={17}
				style={{ height: '100%', width: '100%' }}
				center={{ lat, lng }}
			>

				<Marker
					position={{ lat, lng }}
				/>

				{contentMarker}

			</Map>
		)
	}
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_KEY })(ContentMap)