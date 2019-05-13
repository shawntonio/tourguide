import React, {Component} from 'react';
import Axios from 'axios';

import Tour from './Tour';


export default class LocalTours extends Component {
	state = {
		tours: [],
		lat: 0,
		lng: 0
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(position => {
			console.log(position.coords.latitude)
			this.setState({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			})
			Axios.get(`/api/tours?lat=${this.state.lat}&lng=${this.state.lng}`).then(res => {
				console.log(this.state.lat, this.state.lng)
				this.setState({tours: res.data})
			})
		}, err => console.log(err))

	}

	render(){
		const tours = this.state.tours.map(tour => (
			<Tour key={tour.id} tour={tour}/>
		))
		return(
			<div>
				{tours}
			</div>
		)
	}
}