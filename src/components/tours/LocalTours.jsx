import React, {Component} from 'react';
import Axios from 'axios';

import Tour from './Tour';
import ToursHeader from './ToursHeader';

export default class LocalTours extends Component {
	state = {
		tours: [],
		lat: 0,
		lng: 0
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(position => {
			this.setState({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			})
			Axios.get(`/api/tours?lat=${this.state.lat}&lng=${this.state.lng}`).then(res => {
				this.setState({tours: res.data})
			})
		}, err => console.log(err))

	}

	render(){
		const tours = this.state.tours.map(tour => (
			<Tour key={tour.id} tour={tour} buyable/>
		))
		return(
			<div>
				<ToursHeader />
				{tours}
			</div>
		)
	}
}