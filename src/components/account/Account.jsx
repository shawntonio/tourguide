import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import LoginForm from './LoginRegisterForm'
import Profile from './Profile'

class Account extends Component {

	
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

export default connect(mapStateToProps)(Account)