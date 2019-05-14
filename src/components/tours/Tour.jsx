import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';


export default class Tour extends Component {
	state = {
		content: []
	}

	componentDidMount() {
		Axios.get(`/api/content/${this.props.tour.id}`)
			.then(res => this.setState({ content: res.data }))
	}

	deleteTour = (id) => {
		this.state.content.forEach(content => {
			Axios.delete(`/api/content/${content.id}`)
			.catch(err => console.log(err))
		})
		this.props.deleteTour(id)
	}

	render() {
		const { id, name, costs, type, duration, price, difficulty, live } = this.props.tour
		return (
			<div>
				<h3>{name}</h3>
				<p>Type: {type}</p>
				<p>Hrs: {duration}</p>
				<p>Associated Costs:{costs}</p>
				<p>${price}</p>
				<p>Difficulty: {difficulty}</p>

				{live && this.props.buyable && <div>
					<Link to={`/buy/${id}`}>
						<button>Buy</button>
					</Link>
					<Link to={`/tour-view/${id}`}>
						<button>Start</button>
					</Link>
				</div>
				}
				

				{!live && <div>
					<p>{this.state.content.length} Points of interest</p>
					<Link to={`/content/${id}/${this.state.content.length}`} >
						<button>Add Point of Interest</button>
					</Link>
					<Link to={`/tour-view/${id}`} >
						<button>Editor</button>
					</Link>
					<Link to={`/publish/${id}`}>
						<button>Publish</button>
					</Link>
				</div>
				}

				{this.props.deleteTour && <button onClick={() => this.deleteTour(id)}>Delete</button>}
				

			</div>
		)
	}
}