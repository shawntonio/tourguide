import React, {Component} from 'react';
import Axios from 'axios';

import ToursHeader from './toursHeader/ToursHeader';
import Tour from './Tour';

class MyTours extends Component {

	state = {
		tours: []
	}

	componentDidMount() {
		Axios.get(`/api/paid`).then(res => {
			this.setState({
				tours: res.data
			})
		}).catch(err => console.log(err))
	}

	render() {
		const tours = this.state.tours.map(tour => (
			<Tour key={tour.id} tour={tour} bought/>
		))
		return (
			<div>
				<ToursHeader />
				{tours}
			</div>
		)
	}
}

export default MyTours