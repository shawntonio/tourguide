import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateUser } from '../../store';

class LoginRegisterForm extends Component {
	state = {
		username: '',
		password: '',
		firstname: '',
		lastname: '',
		email: '',
		showRegister: false
	}

	inputHandler = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	login = () => {
		const { username, password } = this.state
		Axios.post('/auth/login', { username, password })
			.then(res => {
				this.props.updateUser(res.data.login_id, username)
			}).catch(err => console.log(err))
	}

	register = () => {
		Axios.post('/auth/register', this.state)
			.then(res => {
				this.props.updateUser(res.data.login_id, this.state.username)
			}).catch(err => console.log(err))
	}

	toggleRegister = () => {
		this.setState({showRegister: true})
	}

	render() {
		const { username, password, firstname, lastname, email } = this.state
		return (
			<>
				<div className="login-form">
					<div className="inputs">
						<label htmlFor='username'>Username</label>
						<input name="username" id='username' value={username} onChange={this.inputHandler} type="text" />
					</div>

					<div className="inputs">
						<label htmlFor="password">Password</label>
						<input name="password" id='password' value={password} onChange={this.inputHandler} type="text" />
					</div>

					{!this.state.showRegister &&
						<div className="login-buttons">
							<button onClick={this.login}>Log In</button>
							<button onClick={this.toggleRegister}>Register</button>
						</div> 
					}
				</div>

				{this.state.showRegister && 
					<div className="register-form">
						<div className="inputs">
							<label htmlFor='firstname'>First Name</label>
							<input name="firstname" id='firstname' value={firstname} onChange={this.inputHandler} type="text" />
						</div>

						<div className="inputs">
							<label htmlFor='lastname'>Last Name</label>
							<input id='lastname' name="lastname" value={lastname} onChange={this.inputHandler} type="text" />
						</div>

						<div className="inputs">
							<label htmlFor='email'>Email</label>
							<input id='email' name="email" value={email} onChange={this.inputHandler} type="text" />
						</div>

						<button onClick={this.register}>Register</button>
					</div>
				}

			</>
		)
	}
}

const mapDispatchToProps = {
	updateUser
}

export default connect(null, mapDispatchToProps)(withRouter(LoginRegisterForm))