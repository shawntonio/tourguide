import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Profile from './Profile'

class Account extends Component {

	render() {
		console.log(this.props.username)
		return (
			<div>
				<header>
					Account
				</header>
				{
					this.props.username ? <Profile />
					: (
						<div>
							<button>Login</button>
							<button>Register</button>
						</div>
					)
				}

				<Switch>
					<Route path="/account/login" component={LoginForm} />
					<Route path="/account/register" component={RegisterForm} />
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {username} = state
	return { username }
}

export default connect(mapStateToProps)(Account)