import React, {Component} from 'react'
import auth from '../../auth/Auth'

export default class Account extends Component {

	login = () => {
		// this.props.auth.login();
	}

	logout = () => {
		// this.props.auth.logout();
	}

	componentDidMount() {
		// if (localStorage.getItem('isLoggedIn') === 'true') {
		// 	auth.renewSession();
		// }
	}

	render() {
		// const {isAuthenticated} = auth

		return (
			<div>
				account
				{/* {
					!isAuthenticated() && (
						<button onClick={this.login}>Log In</button>
					)
				}
				{
					isAuthenticated() && (
						<button onClick={this.logout}>Log Out</button>
					)
				} */}
			</div>
		)
	}
}