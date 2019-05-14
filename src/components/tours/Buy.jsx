import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';


import PaymentForm from './PaymentForm';
import { updateUser } from '../../store';

class Buy extends Component {

	state = {
		tour: {}
	}

	async componentDidMount() {
		const {login_id} = this.props
		const {id} = this.props.match.params
		if(!login_id) {
			Axios.get('/auth/user').then(res => {
				const { login_id, username } = res.data
				if (!login_id) {
					this.props.history.push(`/account?${this.props.history.location.pathname}`)
				} else {
					this.props.updateUser(login_id, username)
				}
			}).catch(err => console.log(err))
		} else {
			Axios.get(`/api/tour/${id}`).then(res => {
				this.setState({ tour: res.data })
			}).catch(err => console.log(err))
		}
	}

	render() {
		const {name} = this.state.tour
		return (
			<div>
				<h1>{name}</h1>
				<Elements>
					<PaymentForm tour={this.state.tour} user_id={this.props.login_id}/>
				</Elements>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {login_id} = state
	return {login_id}
}

const mapDispatchToProps = {
	updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Buy))