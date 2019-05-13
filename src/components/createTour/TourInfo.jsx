import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Map from '../maps/ChooseMap';

class TourInfo extends Component {
	state = {
		name: '',
		location: {},
		// costs: 0,
		// price: 0,
		// type: '',
		// time: '',
		// difficulty: '',
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

					{/* <div className="inputs">
						<label>Type of Tour</label>
						<select name="type" value={type} onChange={this.inputHandler} >
							<option value="choose">choose</option>
							<option value="city">City Tour</option>
							<option value="hike">Hike</option>
							<option value="scenic drive">Scenic Drive</option>
							<option value="indoors">Indoors</option>
							<option value="other">Other</option>
						</select>
					</div>

					<div className="inputs">
						<label>Duration (hours)</label>
						<input name='time' value={time} type="number" onChange={this.inputHandler} />
					</div>

					<div className="inputs">
						<label>Associated Costs</label>
						<input name='costs' value={costs} type="number" onChange={this.inputHandler} />
					</div>

					<div className="inputs">
						<label>Price of Tour</label>
						<input name='price' value={price} type="number" onChange={this.inputHandler} />
					</div>

					<div className="inputs">
						<label>Difficulty</label>
						<select name="difficulty" value={difficulty} onChange={this.inputHandler}>
							<option value="choose">choose</option>
							<option value="easy">Easy</option>
							<option value="normal">Normal</option>
							<option value="hard">Hard</option>
						</select>
					</div> */}
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