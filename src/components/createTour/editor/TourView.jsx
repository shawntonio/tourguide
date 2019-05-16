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
		addMarkerLatLng: null
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
			showAddMarker: true
		})
	}

	clearAddMarker = () => {
		this.setState({ addMarkerLatLng: null })
		this.getContent()
	}

	render() {
		const { id } = this.props.match.params
		const { user_id, name, id: tourId } = this.state.tour

		return (
			<div style={{ height: '100vh', width: '100vw' }}>

				<header style={{ marginBottom: '15px' }}>
					<h2>{name}</h2>
					{this.state.showInfoWindow && this.props.login_id === user_id && <EditorHeader 
						activeMarker={this.state.activeMarker} 
						deleteContent={this.deleteContent} 
					/>}

					{this.state.addMarkerLatLng && <Recorder 
						addMarkerLatLng={this.state.addMarkerLatLng}
						tourId={tourId} 
						clearAddMarker={this.clearAddMarker} 
					 />}

				</header>

				{this.state.loadMap && <ContentMap 
					id={id} 
					setMarker={this.setMarker} 
					mapClicked={this.mapClicked} 
					{...this.state} 
				/>}

			</div>
		)
	}
}

const mapStateToProps = state => {
	const { login_id } = state
	return { login_id }
}

export default connect(mapStateToProps)(withRouter(TourView))