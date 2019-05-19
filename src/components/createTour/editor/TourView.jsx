import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ContentMap from '../../maps/ContentMap'
import EditorHeader from './EditorHeader'
import Recorder from '../recorder/Recorder'

class TourView extends Component {

	state = {
		tour: {},
		content: [],
		activeMarker: {},
		showInfoWindow: false,
		loadMap: false,
		addMarkerLatLng: null,
		prompt: 'Click map to add point of interest',
		legs: {}
	}

	async componentDidMount() {
		const { id } = this.props.match.params

		axios.get(`/api/tour/${id}`).then(res => {
			this.setState({ tour: res.data })
		}).catch(err => console.log(err))

		this.getContent()
	}

	getContent= () => {
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
				console.log('hit')
				this.componentDidMount()
				this.setState({ activeMarker: {}, showInfoWindow: false })
			})
			.catch(err => console.log(err))
	}

	mapClicked = (latLng) => {
		this.setState({
			addMarkerLatLng: latLng,
			showInfoWindow: false
		})
	}

	clearAddMarker = () => {
		this.setState({ addMarkerLatLng: null })
		this.getContent()
	}

	changePrompt = text => {
		this.setState({prompt: text})
	}

	setLegs = legs => {
		this.setState({legs})
	}

	render() {
		const { id } = this.props.match.params
		const { user_id, name, id: tourId, lat, lng } = this.state.tour

		return (
			<div className="tour-view">

				<header style={{ marginBottom: '15px' }}>
					<div className="tour-view-title" >
						<i className="fas fa-chevron-left" onClick={() => this.props.history.goBack()}></i>
						<h2>{name}</h2>
						<input type="text" name="search" id="" placeholder="search" className="map-search" />
					</div>
					{this.state.showInfoWindow && this.props.login_id === user_id && <EditorHeader 
						activeMarker={this.state.activeMarker} 
						deleteContent={this.deleteContent} 
					/>}

					{!this.state.addMarkerLatLng && !this.state.showInfoWindow && !this.props.location.search && <p className='prompt'>{this.state.prompt}</p>}

					{this.state.addMarkerLatLng && <Recorder 
						addMarkerLatLng={this.state.addMarkerLatLng}
						tourId={tourId} 
						clearAddMarker={this.clearAddMarker}
						changePrompt={this.changePrompt} 
					 />}

				</header>

				{this.state.loadMap && !this.props.location.search && <div className='map'><ContentMap
				id={id}
				setMarker={this.setMarker}
				mapClicked={this.mapClicked}
				startLocation={{lat, lng}}
				{...this.state}
				/></div>}

				{this.state.loadMap && this.props.location.search && <div className='map'><ContentMap
				id={id}
				setMarker={this.setMarker}
				setLegs={this.setLegs}
				search
				startLocation={{lat: this.props.loc.lat, lng: this.props.loc.lng}}
				{...this.state}
				/></div>}

			</div>
		)
	}
}

const mapStateToProps = state => {
	const { login_id, loc } = state
	return { login_id, loc }
}

export default connect(mapStateToProps)(withRouter(TourView))