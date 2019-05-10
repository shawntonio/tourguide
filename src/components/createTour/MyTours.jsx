import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUser } from '../../store';
import Tour from '../tours/Tour';

class MyTours extends Component {
	state = {
		tours: []
	}
	
	async componentDidMount() {
		await axios.get('/auth/user').then(res => {
			const { login_id, username } = res.data
			if (!login_id) {
				this.props.history.push('/account')
			} else {
				this.props.updateUser(login_id, username)
			}
		}).catch(err => console.log(err))

		if (this.props.login_id) {
			axios.get(`/api/tours/${this.props.login_id}`).then(res => {
				this.setState({
					tours: res.data
				})
			}).catch(err => console.log(err))
		}
	}

	render() {
		const tours = this.state.tours.map(tour => (
			<Tour key={tour.id} tour={tour} />
		))
		
		return (
			<div>
				<h3>My Tours</h3>
				<Link to='/tour-info'>Create Tour</Link>
				{tours}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {login_id} = state
	return {login_id}
}

const mapDispatchToProps = {
	updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyTours))