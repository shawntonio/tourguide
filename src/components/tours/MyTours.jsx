import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToursHeader from './toursHeader/ToursHeader';
import Tour from './tour/Tour';
import {updateUser} from '../../store';

class MyTours extends Component {

	state = {
		tours: []
	}

	async componentDidMount() {
		const { login_id } = this.props
		if (!login_id) {
			Axios.get('/auth/user').then(res => {
				const { login_id, username } = res.data
				if (!login_id) {
					this.props.history.push(`/account?${this.props.history.location.pathname}`)
				} else {
					this.props.updateUser(login_id, username)
				}
			}).catch(err => console.log(err))
		} else {
			Axios.get(`/api/paid`).then(res => {
				this.setState({
					tours: res.data
				})
			}).catch(err => console.log(err))
		}
	}

	render() {
		const tours = this.state.tours.map(tour => (
			<Tour key={tour.id} tour={tour} bought />
		))
		return (
			<div>
				<ToursHeader />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyTours))