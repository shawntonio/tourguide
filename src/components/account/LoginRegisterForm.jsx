import React, {Component} from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import {updateUser} from '../../store';

class LoginRegisterForm extends Component {
	state = {
		username: '',
		password: '',
		firstname: '',
		lastname: '',
		email: ''
	}

	inputHandler = (e) => {
		const {name, value} = e.target
		this.setState({[name]: value})
	}

	login = () => {
		const {username, password} = this.state
		Axios.post('/auth/login', {username, password})
		.then(res => {
			this.props.updateUser(res.data.login_id, username)
			// this.props.history.push('/account')
		}).catch(err => console.log(err))
	}

	register = () => {
		Axios.post('/auth/register', this.state)
		.then(res => {
			this.props.updateUser(res.data.login_id, this.state.username)	
		}).catch(err => console.log(err))
	}

	render() {
		const {username, password, firstname, lastname, email} = this.state
		return (
			<>
			 <div className="inputs">
			 	<label>Username</label>
				 <input name="username" value={username} onChange={this.inputHandler} type="text"/>
			 </div>

			 <div className="inputs">
			 	<label>Password</label>
				 <input name="password" value={password} onChange={this.inputHandler} type="text"/>
			 </div>
 
			 <button onClick={this.login}>Log In</button>

			 <div className="inputs">
			 	<label>First Name</label>
				 <input name="firstname" value={firstname} onChange={this.inputHandler} type="text"/>
			 </div>

			 <div className="inputs">
			 	<label>Last Name</label>
				 <input name="lastname" value={lastname} onChange={this.inputHandler} type="text"/>
			 </div>

			 <div className="inputs">
			 	<label>Email</label>
				 <input name="email" value={email} onChange={this.inputHandler} type="text"/>
			 </div>

			 <button onClick={this.register}>Register</button>
			 
			</>
		)
	}
}

const mapDispatchToProps = {
	updateUser
}

export default connect(null, mapDispatchToProps)(withRouter(LoginRegisterForm))