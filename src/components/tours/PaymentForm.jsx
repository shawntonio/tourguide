import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';

class PaymentForm extends Component {
	state = {
		complete: false
	}

	async submit(e) {
		const {token} = await this.props.stripe.createToken({name: `${this.props.user_id}`})

		const body = {
			token_id: token.id,
			tour: this.props.tour
		}

		Axios.post(`/stripe/charge`, body).then(() => {
			this.setState({complete: true})
			Axios.post(`/api/paid`, {
				user_id: this.props.user_id, 
				tour_id: this.props.tour.id
			}).then(() => this.props.history.push('/my-tours'))
			.catch(err => console.log(err))
		}).catch(err => console.log(err))
	}

	render() {

		return (
			<div className='payment-form'>
				{this.state.complete && <h2>Payment Complete</h2>}
				<h3>Enter Payment Information</h3>
				<CardElement className='card-input' />
				<button onClick={() => this.submit()}>Submit</button>
			</div>
		)
	}
}

export default injectStripe(withRouter(PaymentForm))