import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';

import {clearUser} from '../../store'

class Profile extends Component {

	logout = () => {
		Axios.get('/auth/logout').then(() => {
			this.props.clearUser()
		})
	}

	render() {
		return (
			<>
				<button onClick={this.logout}>Logout</button>
				<button>My Tours</button>
			</>
		)
	}
}

const mapDispatchToProps = {
	clearUser
}

export default connect(null, mapDispatchToProps)(Profile)