import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Map from '../maps/ChooseMap';

class TourInfo extends Component {
	state = {
		name: '',
		location: {}
	}

	componentDidMount() {
		!this.props.username && this.props.history.replace(`/account?${this.props.history.location.pathname}`)
	}

	clickLocation = (location) => {
		this.setState({ location })
	}

	inputHandler = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	createTourHandler = (e) => {
		e.preventDefault()
		axios.post('/api/tours', this.state).then(() => {
			this.props.history.push('/my-tours')
		}).catch(err => console.log(err))
		
	}

	render() {
		const { name } = this.state
		return (
			<div>
				<h1>Create a Tour</h1>
				<form onSubmit={this.createTourHandler}>
					<div className="inputs">
						<label>Tour Name:</label>
						<input name='name' value={name} type="text" onChange={this.inputHandler} />
					</div>

					<Map clickLocation={this.clickLocation} currentLocation={this.state.location} />

					<button>Create Tour</button>
				</form>

			</div>
		)
	}
}

const mapStateToProps = state => {
	const {username} = state
	return {username}
}

export default connect(mapStateToProps)(withRouter(TourInfo))