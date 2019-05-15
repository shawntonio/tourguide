import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

import LoginForm from './LoginRegisterForm'
import Profile from './Profile'
import {updateUser} from '../../store';

class Account extends Component {
	
	previousPageReturn = () => {
		const {search} = this.props.history.location
		search && this.props.history.replace(`${search.slice(1)}`)
	}

	render() {
		return (
			<div>
				<header>
					<h3>Account</h3>
					<Link to="/">
						<i className="fa fa-times" aria-hidden="true"></i>
					</Link>
				
				</header>
				{
					this.props.username ? <Profile previousPageReturn={this.previousPageReturn} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Account))