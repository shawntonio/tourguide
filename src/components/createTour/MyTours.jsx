import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUser } from '../../store';

class MyTours extends Component {
	state = {
		tours: []
	}
	
	componentDidMount() {
		axios.get('/auth/user').then(res => {
			const { login_id, username } = res.data
			if (!login_id) {
				this.props.history.push('/account')
			} else {
				this.props.updateUser(login_id, username)
			}
		})
		axios.get('/api/tours/user').then(res => {
			this.setState({
				tours: res.data
			})
		})
	}

	render() {
		const tours = this.state.tours.map(tour => (
			<h4>{tour.name}</h4>
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

const mapDispatchToProps = {
	updateUser
}

export default connect(null, mapDispatchToProps)(withRouter(MyTours))