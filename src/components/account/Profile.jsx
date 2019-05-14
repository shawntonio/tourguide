import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {clearUser} from '../../store'

class Profile extends Component {
	componentDidMount(){
		this.props.previousPageReturn()
	}

	logout = () => {
		Axios.get('/auth/logout').then(() => {
			this.props.clearUser()
		})
	}

	render() {
		return (
			<>
				<button onClick={this.logout}>Logout</button>
				<button onClick={() => this.props.history.push('/my-tours')}>Tour Work Bench</button>
			</>
		)
	}
}

const mapDispatchToProps = {
	clearUser
}

export default connect(null, mapDispatchToProps)(withRouter(Profile))