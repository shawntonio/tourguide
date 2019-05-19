import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ContentMap from '../maps/ContentMap';

class TourInfo extends Component {
	state = {
		name: '',
		location: null,
		addMarkerLatLng: null,
		showAddMarker: false
	}

	componentDidMount() {
		!this.props.username && this.props.history.replace(`/account?${this.props.history.location.pathname}`)
	}

	inputHandler = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	mapClicked = (latLng) => {
		this.setState({
			addMarkerLatLng: latLng,
			showAddMarker: true
		})
	}

	createTourHandler = (e) => {
		e.preventDefault()

		const location = {
			lat: this.state.addMarkerLatLng.lat(),
			lng: this.state.addMarkerLatLng.lng()
		}
		const {name} = this.state

		axios.post('/api/tours', {name, location}).then(() => {
			this.props.history.push('/workbench')
		}).catch(err => console.log(err))
	}

	render() {
		const { name } = this.state
		return (
			<div>
				<h1>Create a Tour</h1>
				<form onSubmit={this.createTourHandler} className='create-tour-form'>
					<div className="inputs">
						<label>Tour Name:</label>
						<input name='name' value={name} type="text" onChange={this.inputHandler} />
					</div>

					<label htmlFor="">Choose Starting Location</label>

					<button>Create Tour</button>
				</form>

				{this.props.loc.lat && <ContentMap 
					tour={{...this.props.loc}} 
					activeMarker={{}} 
					content={[]}
					addMarkerLatLng={this.state.addMarkerLatLng} 
					showAddMarker={this.state.showAddMarker} 
					mapClicked={this.mapClicked}
				/>}

			</div>
		)
	}
}

const mapStateToProps = state => {
	const { username, loc } = state
	return { username, loc }
}

export default connect(mapStateToProps)(withRouter(TourInfo))