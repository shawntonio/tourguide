import React, {Component} from 'react'
import axios from 'axios'
import Map from '../maps/Map'
require('dotenv').config()
const {REACT_APP_GOOGLE_KEY} = process.env

export default class TourInfo extends Component {
	state = {
		showMap: false,
		name: '',
		location: {},
		costs: null,
		price: null,
		type: '',
		time: '',
		difficulty: '',
		// live: false
	}


	componentDidMount() {
		axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${REACT_APP_GOOGLE_KEY}`)
		.then(res => {
			this.setState({
				location: res.data.location
			})
		})
		.catch(err => console.log(err))

	}


	inputHandler = (e) => {
		const {name, value} = e.target
		this.setState({
			[name]: value
		})
	}

	geolocate = () => {
		axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${REACT_APP_GOOGLE_KEY}`)
		.then(res => {
			this.setState({
				location: res.data.location
			})
		})
		.catch(err => console.log(err))
	}

	showMap = () => {
		this.setState({
			showMap: true
		})
	}

	render() {
		const {name, costs, price, type, time, difficulty} = this.state
		return (
			<div>
				<h1>Create a Tour</h1>

				<form>
					<div className="inputs">
						<h4>Tour Name:</h4>
						<input name='name' value={name} type="text" onChange={this.inputHandler}/>
					</div>

					<div className="inputs">
						<h4>Type of Tour</h4>
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
						<h4>Duration</h4>
						<input name='time' value={time} type="text" onChange={this.inputHandler}/>
					</div>

					<div className="inputs">
						<h4>Associated Costs</h4>
						<input name='costs' value={costs} type="number" onChange={this.inputHandler}/>
					</div>

					<div className="inputs">
						<h4>Price of Tour</h4>
						<input name='price' value={price} type="number" onChange={this.inputHandler}/>
					</div>

					<div className="inputs">
						<h4>Difficulty</h4>
						<select name="difficulty" value={difficulty} onChange={this.inputHandler}>
							<option value="choose">choose</option>
							<option value="easy">Easy</option>
							<option value="normal">Normal</option>
							<option value="hard">Hard</option>
						</select>
					</div>

					<div className="inputs">
						<h4>Starting Location</h4>
						<div>
							<input type="radio" name="location"/>
							<label>Use Current Location</label>
						</div>

						<div>
							<input onClick={this.showMap} type="radio" name="location" />
							<label>Choose from map</label>
						</div>
					</div>
					{this.state.showMap && <Map currentLocation={this.state.location} gKey={REACT_APP_GOOGLE_KEY} />}
					
					
				</form>
				
			</div>
		)
	}
}