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
			<div className='tour'>
				<div className='tour-title'>
					<h3>{name}</h3>
					<p>by @(username)</p>
				</div>
				<div className="tour-specs">
					{type === 'city' && <i className="fas fa-city"></i>}
					{type === 'Hike' && <i className="fas fa-hiking"></i>}
					{type === 'Scenic Drive' && <i class="fas fa-car-side"></i>}
					{type === 'indoor' && <i className="fas fa-door-open"></i>}

					{duration === 1 && <p className='tour-spec'>{duration}hr</p>}
					{duration > 1 && <p className='tour-spec'>{duration}hrs</p>}

					{costs > 0 && costs < 51 && <p className='tour-spec'>$</p>}

					{costs > 50 && costs < 101 && <p className='tour-spec'>$$</p>}

					{costs > 100 && <p className='tour-spec'>$$</p>}

					<p className='tour-spec'>{difficulty}</p>
				</div>

				<div className="tour-buttons">
					{live && this.props.buyable && <div>
						<Link to={`/buy/${id}`}>
							<button>Buy for ${price}</button>
						</Link>
						<button>Preview </button>
					</div>
					}

					{live && this.props.bought && <div>	
						<Link to={`/tour-view/${id}`}>
							<button>Start</button>
						</Link>
					</div>
					}
					

					{!live && <div>
						{/* <Link to={`/content/${id}/${this.state.content.length}`} >
							<button>Add Point of Interest</button>
						</Link> */}
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

				

			</div>
		)
	}
}