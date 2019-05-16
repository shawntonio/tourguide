import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUser } from '../../store';
import Tour from '../tours/tour/Tour';

class WorkBench extends Component {
	state = {
		tours: []
	}

	async componentDidMount() {
		await axios.get('/auth/user').then(res => {
			const { login_id, username } = res.data
			if (!login_id) {
				this.props.history.push(`/account?${this.props.history.location.pathname}`)
			} else {
				this.props.updateUser(login_id, username)
			}
		}).catch(err => console.log(err))

		if (this.props.login_id) {
			this.getTours()
		}
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
	}

	render() {
		const tours = this.state.tours.map(tour => (
			<Tour key={tour.id} tour={tour} deleteTour={this.deleteTour} />
		))

		return (
			<div>
				<h3>Tour Workbench</h3>
				<Link to='/'>Home <br /></Link>
				<Link to='/tour-info'>Create Tour</Link>
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