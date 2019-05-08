import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Tour extends Component {

	render() {
		const {user_id, name, costs, type, duration, price, difficulty} = this.props.tour
		return (
			<div>
				<h3>{name}</h3>
				<p>{type}</p>
				<p>{duration}</p>
				<p>{costs}</p>
				<p>{price}</p>
				<p>{difficulty}</p>
				<Link to={`/content/${user_id}`} >
					<button>Add Content</button>
				</Link>
			</div>
		)
	}
}