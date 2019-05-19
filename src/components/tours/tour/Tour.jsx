import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setLocation } from '../../../store';


class Tour extends Component {
	state = {
		content: [],
		url: ''
	}

	componentDidMount() {
		Axios.get(`/api/content/${this.props.tour.id}`)
			.then(res => this.setState({ content: res.data }))
		
		Axios.get(`/user?id=${this.props.tour.user_id}`)
		.then((res) => this.setState({url: res.data.profile_pic}))
	}

	deleteTour = (id) => {
		this.state.content.forEach(content => {
			Axios.delete(`/api/content/${content.id}`)
				.catch(err => console.log(err))
		})
		this.props.deleteTour(id)
	}

	// watchLocation = () => {
	// 	const id = navigator.geolocation.watchPosition(pos => {
	// 		console.log(pos)
	// 		const location = {lat: pos.coords.latitude, lng: pos.coords.longitude}
	// 		this.props.setLocation(location)
	// 	})
	// }

	render() {
		const { id, name, costs, type, duration, price, difficulty, live } = this.props.tour
		return (
			<div className='tour'>
				{live && this.props.deleteTour && <div className='live-tour'>live</div>}
				<div className='tour-title'>
					<img className='tourguide-pic' src={this.state.url} alt="profile"/>
					<div className='tourguide-info'>
						<h3>{name}</h3>
						<p>by @(username)</p>
					</div>
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
						<Link to={`/tour-view/${id}?start`}>
							<button onClick={this.watchLocation}>Start</button>
						</Link>
					</div>
					}

					{this.props.deleteTour && <div>
						<button onClick={() => this.deleteTour(id)}>Delete</button>
						{!live &&
							<Link to={`/tour-view/${id}`} >
								<button>Editor</button>
							</Link>
						}
						{!live &&
							<Link to={`/publish/${id}`}>
								<button>Publish</button>
							</Link>
						}
					</div>}
				</div>



			</div>
		)
	}
}

const mapDispatchToProps = {
	setLocation
}

export default connect(null, mapDispatchToProps)(Tour)