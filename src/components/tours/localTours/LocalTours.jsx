import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import Tour from '../tour/Tour';
import ToursHeader from '../toursHeader/ToursHeader';
import { setLocation } from '../../../store';

class LocalTours extends Component {
	state = {
		tours: [],
		loading: false
	}

	componentDidMount() {
		if (!this.state.tours[0]) {
			this.setState({loading: true})
		}
		if (this.props.loc.lat) {
			Axios.get(`/api/tours?lat=${this.props.loc.lat}&lng=${this.props.loc.lng}`)
				.then(res => {
					this.setState({ loading: false, tours: res.data })
				})
		}

	}

	componentDidUpdate(prevProps) {
		if (this.props.loc !== prevProps.loc) {
			Axios.get(`/api/tours?lat=${this.props.loc.lat}&lng=${this.props.loc.lng}`)
				.then(res => {
					this.setState({ loading: false, tours: res.data })
				})
		}
	}

	render() {
		const tours = this.state.tours.map(tour => (
			<Tour key={tour.id} tour={tour} buyable />
		))
		return (
			<div>
				<ToursHeader />
				<div className='tours'>
					{tours}
					{this.state.loading && <ReactLoading id='loader' type={'spokes'} color={'#12135A'} />}
				</div>
			</div>
		)
	}
}
const mapStateToProps = state => {
	const { loc } = state
	return { loc }
}

const mapDispatchToProps = {
	setLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalTours)