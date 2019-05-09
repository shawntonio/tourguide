import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class Tour extends Component {
	state = {
		content: []
	}

	componentDidMount(){
		Axios.get(`/api/content/${this.props.tour.id}`)
		.then(res => this.setState({content: res.data}))
	}

	render() {
		const {id, name, costs, type, duration, price, difficulty} = this.props.tour
		return (
			<div>
				<h3>{name}</h3>
				<p>{type}</p>
				<p>{duration}</p>
				<p>{costs}</p>
				<p>{price}</p>
				<p>{difficulty}</p>
				<p>{this.state.content.length} Points of interest</p>
				<Link to={`/content/${id}`} >
					<button>Add Point of Interest</button>
				</Link>
				<Link to={`/preview/${id}`} >
					<button>Preview</button>
				</Link>

			</div>
		)
	}
}