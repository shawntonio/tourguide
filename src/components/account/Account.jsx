import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import LoginForm from './LoginRegisterForm'
import Profile from './Profile'
import Axios from 'axios';
import {updateUser} from '../../store';

class Account extends Component {
	componentDidMount() {
		Axios.get('/auth/user').then(res => {
				const {login_id, username} = res.data
				this.props.updateUser(login_id, username)
		})
	}
	
	render() {
		return (
			<div>
				<header>
					<h3>Account</h3>
					<Link to="/">
						close
					</Link>
				
				</header>
				{
					this.props.username ? <Profile />
						:	<LoginForm />
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { username } = state
	return { username }
}

const mapDispatchToProps = {
	updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)