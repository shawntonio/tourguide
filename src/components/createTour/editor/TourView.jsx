import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ContentMap from '../../maps/ContentMap'
import EditorHeader from './EditorHeader'
import Recorder from '../recorder/Recorder'
import { setLocation } from '../../../store'

class TourView extends Component {

	constructor() {
		super()
		this.dirRef = React.createRef()
		this.nearByAudio = React.createRef()
		this.state = {
			tour: {},
			content: [],
			activeMarker: {},
			showInfoWindow: false,
			loadMap: false,
			addMarkerLatLng: null,
			prompt: 'Click map to add point of interest',
			legs: null,
			watchId: null,
			directions: '',
			legIteration: 0,
			stepIteration: 0,
			myLocation: null,
			played: null
		}
	}

	async componentDidMount() {
		const { id } = this.props.match.params

		axios.get(`/api/tour/${id}`).then(res => {
			this.setState({ tour: res.data })
		}).catch(err => console.log(err))

		this.getContent()

		const watchId = navigator.geolocation.watchPosition(this.geoSuccess, () => alert('position not available'), {
			enableHighAccuracy: true,
			maximumAge: 30000,
			timeout: 27000
		})

		this.setState({ watchId })
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.state.watchId)
	}

	componentDidUpdate(prevProps,prevState) {
		if (prevProps.loc.lat !== this.props.loc.lat) {
			const { legIteration, stepIteration, legs } = this.state
			const location = { lat: this.props.loc.lat, lng: this.props.loc.lng }
			const offset = 0.001

			//check if near poi
			this.state.content.forEach(poi => {
				if (this.props.location.search && poi.lat + offset > location.lat && poi.lat - offset < location.lat) {
					if (poi.lng + offset > location.lng && poi.lng - offset < location.lng) {
						if (poi.id !== this.state.played) {
							navigator.geolocation.clearWatch(this.state.watchId)
							this.nearByAudio.current.autoplay = true;
							this.nearByAudio.current.controls = true;
							this.nearByAudio.current.src = poi.url;
							this.nearByAudio.current.onended = () => navigator.geolocation.watchPosition(this.geoSuccess, () => alert('position not available'), {
								enableHighAccuracy: true,
								maximumAge: 30000,
								timeout: 27000
							})
							this.setState({played: poi.id})
						}
					}
				}
			})
			if (legs) {
				const currentStep = legs[legIteration].steps[stepIteration]

				//check if at end of step
				if (location.lat + offset > currentStep.end_point.lat() && 
				location.lat - offset < currentStep.end_point.lat()) {
					if (location.lng + offset > currentStep.end_point.lng() &&
					location.lng - offset < currentStep.end_point.lng()) {
						if (legs[legIteration].steps.length - 1 === stepIteration && legs.length - 1 === legIteration) {
							this.setState({ directions: 'Woo Hoo! You finished the tour' })
						} else if (legs[legIteration].steps.length - 1 === stepIteration) {
							this.setState({ legIteration: legIteration + 1 })
						} else {
							this.setState({ stepIteration: stepIteration + 1 })
						}
				}
				}
			}
		}
	}

	geoSuccess = position => {
		const { legIteration, stepIteration, legs } = this.state
		const location = { lat: position.coords.latitude, lng: position.coords.longitude }
		let currentStep
		if (legs) currentStep = legs[legIteration].steps[stepIteration]
		this.props.setLocation(location)
		if (legs) this.setState({ directions: currentStep.instructions })
	}

	getContent = () => {
		const { id } = this.props.match.params
		axios.get(`/api/content/${id}`).then(res => {
			this.setState({
				content: res.data,
				loadMap: true
			})
		})
	}

	setMarker = (marker, bool) => {
		this.setState({ activeMarker: marker, showInfoWindow: bool })
	}

	deleteContent = () => {
		axios.delete(`/api/content/${this.state.activeMarker.contentId}`)
			.then(() => {
				this.componentDidMount()
				this.setState({ activeMarker: {}, showInfoWindow: false })
			})
			.catch(err => console.log(err))
	}

	mapClicked = (latLng) => {
		this.setState({
			addMarkerLatLng: latLng,
			showInfoWindow: false,
			myLocation: null
		})
	}

	clearAddMarker = () => {
		this.setState({ addMarkerLatLng: null })
		this.getContent()
	}

	changePrompt = text => {
		this.setState({ prompt: text })
	}

	setLegs = legs => {
		this.setState({ legs })
	}

	findMyLocation = () => {
		this.setState({ myLocation: this.props.loc })
	}

	render() {
		const { id } = this.props.match.params
		const { user_id, name, id: tourId, lat, lng } = this.state.tour

		return (
			<div className="tour-view">

				<header style={{ marginBottom: '15px' }}>
					<div className="tour-view-title" >
						<i className="fas fa-chevron-left back" onClick={() => this.props.history.goBack()}></i>
						<h2>{name}</h2>
						{!this.props.location.search && <input type="text" name="search" id="" placeholder="search" className="map-search" />}
					</div>
					{this.state.showInfoWindow && this.props.login_id === user_id && !this.props.location.search && <EditorHeader
						activeMarker={this.state.activeMarker}
						deleteContent={this.deleteContent}
					/>}

					{!this.state.addMarkerLatLng && !this.state.showInfoWindow && !this.props.location.search && <p className='prompt'>{this.state.prompt}</p>}
					{this.props.location.search && <p dangerouslySetInnerHTML={{ __html: this.state.directions }} className='directions'></p>}

					<div className="header-audio">
						<audio ref={this.nearByAudio}></audio>
					</div>

					{this.state.addMarkerLatLng && <Recorder
						addMarkerLatLng={this.state.addMarkerLatLng}
						tourId={tourId}
						clearAddMarker={this.clearAddMarker}
						changePrompt={this.changePrompt}
						watchId={this.state.watchId}
					/>}

				</header>

				{this.state.loadMap && !this.props.location.search && <div className='map'><ContentMap
					id={id}
					setMarker={this.setMarker}
					mapClicked={this.mapClicked}
					startLocation={{ lat, lng }}
					{...this.state}
					myLocation={this.state.myLocation}
				/></div>}

				{this.state.loadMap && this.props.location.search && <div className='map'><ContentMap
					id={id}
					setMarker={this.setMarker}
					setLegs={this.setLegs}
					search
					startLocation={{ lat: this.props.loc.lat, lng: this.props.loc.lng }}
					{...this.state}
				/></div>}

				<i onClick={this.findMyLocation} id='find-my-location' className="fas fa-crosshairs fa-2x"></i>

			</div>
		)
	}
}

const mapStateToProps = state => {
	const { login_id, loc } = state
	return { login_id, loc }
}

const mapDispatchToState = {
	setLocation
}

export default connect(mapStateToProps, mapDispatchToState)(withRouter(TourView))