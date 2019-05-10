import React, { Component } from 'react';
import { Marker, Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
// import {FaMapMarkerAlt} from 'react-icons/fa';


class ContentMap extends Component {
	constructor(props) {
		super(props)

		this.mapRef = React.createRef()

		this.state = {
			tour: {},
			content: [],
			activeMarker: {},
			showInfoWindow: false,
			directionsDisplay: null
		}
	}

	async componentDidMount() {
		const { id } = this.props
		axios.get(`/api/tour/${id}`).then(res => {
			this.setState({ tour: res.data })
		}).catch(err => console.log(err))

		await axios.get(`/api/content/${id}`).then(res => {
			this.setState({ content: res.data })
		})

		if (this.state.content[0]) {
			// axios.post(`/api/route`, {content: this.state.content})
			// .then(res => {
				

			// })
			
			const directionsService = await new this.props.google.maps.DirectionsService()
			const directionsDisplay = await new this.props.google.maps.DirectionsRenderer()

			directionsDisplay.setMap(this.mapRef.current.map)
			console.log(this.mapRef.current.map)

			const {lat, lng} = this.state.tour
			const {lat: latd, lng: lngd} = this.state.content[this.state.content.length - 1]
			const origin = await new this.props.google.maps.LatLng(lat, lng)
			const destination = await new this.props.google.maps.LatLng(latd, lngd)
			console.log(origin.lat())
			const request = {
				origin,
				destination,
				travelMode: 'DRIVING'
			}

			directionsService.route(request, (result, status) => {
				console.log(status)
				if (status == 'OK') {
					console.log(directionsDisplay)
					console.log(result)
					directionsDisplay.setDirections(result)
				}
			})
		}
	}

	deleteContent = (id) => {
		axios.delete(`/api/content/${id}`)
		.then(() => this.componentDidMount())
	}

	mapClicked = (mapProps, map, clickEvent) => {
		console.log(mapProps, map, clickEvent)
		
	}

	markerClick = (props, marker, e) => {
		console.log(props, marker, e)
		this.setState({
			activeMarker: marker,
			showInfoWindow: true
		})
	}

	render() {
		const { lat, lng } = this.state.tour

		const contentMarker = this.state.content.map(marker => {
			const { lat, lng } = marker
			return (
				<Marker
					key={marker.id}
					position={{ lat, lng }}
					onClick={this.markerClick}
					title={`POI: ${marker.order_pos}`}
					name={marker.url}
				/>
			)
		})
		const contentList = this.state.content.map(item => {

			return (
				<li key={item.id}>POI {item.order_pos}:<button onClick={() => this.deleteContent(item.id)}>delete</button></li>
			)
		})
		return (
			<>
				<ul>{contentList}</ul>
				<Map
					google={this.props.google}
					zoom={17}
					style={{ height: '100%', width: '100%' }}
					center={{ lat, lng }}
					// disableDefaultUI={true}
					onClick={this.mapClicked}
					ref={this.mapRef}
				>

					<Marker
						position={{ lat, lng }}
					/>

					<Marker 
						visible={this.state.showInputMarker}
						postion={this.state.inputMarkerPos}
					/>

					{contentMarker}

					<InfoWindow 
						marker={this.state.activeMarker}
						visible={this.state.showInfoWindow}
					>
						<audio controls src={this.state.activeMarker.name}></audio>
					</InfoWindow>

				</Map>
			</>
		)
	}
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_KEY })(ContentMap)