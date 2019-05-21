import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUser } from '../../../store';
import Tour from '../../tours/tour/Tour';

class WorkBench extends Component {
	state = {
		tours: []
	}

	async componentDidMount() {
		!this.props.login_id ? this.props.history.replace(`/account?${this.props.history.location.pathname}`)
		: this.getTours()
	}

	getTours = () => {
		axios.get(`/api/tours/${this.props.login_id}`).then(res => {
			this.setState({
				tours: res.data
			})
		}).catch(err => console.log(err))
	}

	deleteTour = (id) => {
		axios.delete(`/api/tour/${id}`)
			.then(() => this.getTours())
			.catch(err => alert('Someone had paid for this tour. You cannot delete it.'))
	}

	render() {
		const tours = this.state.tours.map(tour => (
			<Tour key={tour.id} tour={tour} deleteTour={this.deleteTour} getTours={this.getTours} />
		))

		return (
			<div>
				<header className="workbench-header">
					<i className="fas fa-chevron-left" onClick={() => this.props.history.push('/')}></i>
					<h2>Tour Workbench</h2>
					<Link className='link' to='/tour-info'>New Tour</Link>
				</header>
				<div className="tours">
					{tours}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { login_id } = state
	return { login_id }
}

const mapDispatchToProps = {
	updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WorkBench))