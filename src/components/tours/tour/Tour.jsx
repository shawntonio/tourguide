import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import { v4 as randomString } from 'uuid';

import { setLocation } from '../../../store';


class Tour extends Component {
	constructor() {
		super()
		this.photoInput = React.createRef()
		this.state = {
			content: [],
			url: ''
		}
	}

	componentDidMount() {
		Axios.get(`/api/content/${this.props.tour.id}`)
			.then(res => this.setState({ content: res.data }))
		
		Axios.get(`/user?id=${this.props.tour.user_id}`)
		.then((res) => this.setState({url: res.data.profile_pic}))
	}

	deleteTour = (id) => {
			if (this.state.content[0]) {
				alert('You still have audio content in this tour. If you want to delete this tour, delete the all content first.')
			} else this.props.deleteTour(id)
	}

	getSig = (file) => {
		const filename = `${randomString()}-${file.name.replace(/\s/g, '-')}`

		Axios.get(`api/sig`, {
			params: {
				filename,
				filetype: file.type
			}
		}).then(res => {
			const { signedRequest, url } = res.data
			this.setState({uploadImg: url})
			this.uploadFile(file, signedRequest, url)
		})
	}

	uploadFile = (file, signedRequest, url) => {
		const options = {
			headers: {
				'Content-Type': file.type,
			},
		}

		Axios.put(signedRequest, file, options).then(() => {
			Axios.put(`/api/tour/${this.props.tour.id}`, {...this.props.tour, cover_photo: url})
			.then(() => this.props.getTours())
			.catch(err => console.log(err))
		})
	}

	clickImgInput = () => {
		this.photoInput.current.click()
	}

	render() {
		const { id, name, costs, type, duration, price, difficulty, live, cover_photo } = this.props.tour
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

				{cover_photo && <img className="cover-photo" src={cover_photo} alt='cover' />}
				{!cover_photo && live && <img className="cover-photo" src='https://bigriverequipment.com/wp-content/uploads/2017/10/no-photo-available.png' alt='none' />}
				{!cover_photo && this.props.deleteTour &&
					<div>
						<input ref={this.photoInput} accept="image/*" style={{display: 'none'}} type="file" onChange={() => this.getSig(this.photoInput.current.files[0])} />
						<p onClick={this.clickImgInput}>Add cover photo</p>
					</div>
				}

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