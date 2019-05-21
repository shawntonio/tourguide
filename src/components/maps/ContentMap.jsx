import React, { Component } from 'react';
import { Marker, Map, InfoWindow, GoogleApiWrapper, Polyline } from 'google-maps-react';
import pin from './map-pin-solid.svg';
import profile from './user-circle-regular.svg'

class ContentMap extends Component {
	constructor(props) {
		super(props)

		this.mapRef = React.createRef()

		this.state = {
			directionsDisplay: null,
			polyline: []
		}
		this.getPolyline = this.getPolyline.bind(this)
	}

	componentDidMount() {
		if (this.props.content[0]) this.getPolyline()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.content.length !== this.props.content.length) {
			this.getPolyline()
		}
	}

	async getPolyline() {
		const directionsService = await new this.props.google.maps.DirectionsService()
			
		const { lat, lng } = this.props.startLocation
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
			if (status === 'OK') {
				this.setState({ polyline: result.routes[0].overview_path })
				this.props.search && this.setLegs(result.routes[0].legs)
			} else if (status === 'ZERO_RESULTS' && this.props.startLocation.lat) {
				window.location.reload()
			}
		})
	}

	setLegs = legs => {
		this.props.setLegs(legs)
	}

	mapClicked = (mapProps, map, clickEvent) => {
		if (this.props.mapClicked) this.props.mapClicked(clickEvent.latLng)
	}

	markerClick = (props, marker) => {
		this.props.setMarker(marker, true)
	}

	clearActiveMarker = () => {
		this.props.setMarker({}, false)
	}

	render() {
		const { lat, lng } = this.props.startLocation
		const {addMarkerLatLng} = this.props

		if (this.props.content) {
			var contentMarker = this.props.content.map((marker, index) => {
				const { lat, lng } = marker
				return (
					<Marker
						key={marker.id}
						contentId={marker.id}
						position={{ lat, lng }}
						onClick={this.markerClick}
						title={`POI: ${index + 1}`}
						name={marker.url}
						icon={{
							url: pin,
							anchor: new this.props.google.maps.Point(20,40),
							scaledSize: new this.props.google.maps.Size(40,40) 
						}}
					/>
				)
			})
		}

		return (
			<Map
				google={this.props.google}
				zoom={17}
				style={{ height: '100%', width: '100%' }}
				initialCenter={{ lat, lng }}
				disableDefaultUI={true}
				onClick={this.mapClicked}
				ref={this.mapRef}
			>
				{this.props.content[0] && !this.props.search && <Marker
					position={{ lat, lng }}
				/>}
				{this.props.content[0] && this.props.search && <Marker
					position={{ lat, lng }}
					icon={{
						url: profile,
						anchor: new this.props.google.maps.Point(15,15),
						scaledSize: new this.props.google.maps.Size(30,30) 
					}}
				/>}
				

				{addMarkerLatLng && <Marker 
					name={'addContent'}
					position={{ lat: addMarkerLatLng.lat(), lng: addMarkerLatLng.lng()}}
					icon={{
						url: pin,
						anchor: new this.props.google.maps.Point(20,40),
						scaledSize: new this.props.google.maps.Size(40,40) 
					}}
				/> }

				{contentMarker}

				<InfoWindow
					marker={this.props.activeMarker}
					visible={this.props.showInfoWindow}
					onClose={this.clearActiveMarker}
				>
					<audio className='audio-info-window' controls src={this.props.activeMarker.name}></audio>
				</InfoWindow>

				<Polyline
					path={this.state.polyline}
					strokeColor="#12135A"
					strokeOpacity={0.8}
					strokeWeight={3}
				/>

			</Map>
		)
	}
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_KEY })(ContentMap)