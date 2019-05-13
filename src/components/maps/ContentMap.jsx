import React, { Component } from 'react';
import { Marker, Map, InfoWindow, GoogleApiWrapper, Polyline } from 'google-maps-react';

class ContentMap extends Component {
	constructor(props) {
		super(props)

		this.mapRef = React.createRef()

		this.state = {
			directionsDisplay: null,
			polyline: null
		}
	}

	async componentDidMount() {
		const directionsService = await new this.props.google.maps.DirectionsService()

		console.log(this.mapRef.current.map)

		const { lat, lng } = this.props.tour
		const { lat: latd, lng: lngd } = this.props.content[this.props.content.length - 1]
		const origin = await new this.props.google.maps.LatLng(lat, lng)
		const destination = await new this.props.google.maps.LatLng(latd, lngd)

		const wayPoints = this.props.content.slice(0, this.props.content.length - 1).map(content => {
			const { lat, lng } = content
			const location = new this.props.google.maps.LatLng(lat, lng)
			return { location }
		})

		const request = {
			origin,
			destination,
			travelMode: 'WALKING',
			waypoints: wayPoints,
			optimizeWaypoints: true
		}

		directionsService.route(request, (result, status) => {
			console.log(status)
			if (status === 'OK') {
				console.log(result)
				this.setState({ polyline: result.routes[0].overview_path })
			}
		})
	}

	mapClicked = (mapProps, map, clickEvent) => {

	}

	markerClick = (props, marker) => {
		this.props.setMarker(marker, true)
	}

	clearActiveMarker = () => {
		this.props.setMarker({}, false)
	}

	render() {
		const { lat, lng } = this.props.tour

		const contentMarker = this.props.content.map((marker, index) => {
			const { lat, lng } = marker
			return (
				<Marker
					key={marker.id}
					contentId={marker.id}
					position={{ lat, lng }}
					onClick={this.markerClick}
					title={`POI: ${index + 1}`}
					name={marker.url}
				/>
			)
		})

		return (
			<Map
				google={this.props.google}
				zoom={17}
				style={{ height: '90%', width: '100%' }}
				center={{ lat, lng }}
				disableDefaultUI={true}
				// onClick={this.mapClicked}
				ref={this.mapRef}
			>

				<Marker
					position={{ lat, lng }}
				/>

				{contentMarker}

				<InfoWindow
					marker={this.props.activeMarker}
					visible={this.props.showInfoWindow}
					onClose={this.clearActiveMarker}
				>
					<audio controls src={this.props.activeMarker.name}></audio>
				</InfoWindow>

				<Polyline
					path={this.state.polyline}
					strokeColor="#0000FF"
					strokeOpacity={0.8}
					strokeWeight={3} />

			</Map>
		)
	}
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_KEY })(ContentMap)