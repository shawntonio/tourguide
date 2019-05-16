import React, {Component} from 'react'
import Axios from 'axios';

export default class Publish extends Component {
	state = {
		costs: 0,
		price: 0,
		type: '',
		duration: '',
		difficulty: '',
		tour: {}
	}

	componentDidMount() {
		Axios.get(`/api/tour/${this.props.match.params.id}`).then(res => {
			this.setState({tour: res.data})
		})
	}

	inputHandler = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	submitFormHandle = (e) => {
		e.preventDefault()
		const {type, duration, difficulty, costs, price} = this.state
		Axios.put(`/api/tour/${this.props.match.params.id}`, {type, duration, costs, price, difficulty})
		.then(() => {
			this.props.history.push('/workbench')
		}).catch(err => console.log(err))
	}

	render() {
		const {type, duration, difficulty, costs, price} = this.state
		const {name} = this.state.tour

		return (
			<div>
				<h3>{name}</h3>
				<form onSubmit={this.submitFormHandle}>
					<div className="inputs">
						<label>Type of Tour</label>
						<select name="type" value={type} onChange={this.inputHandler} >
							<option value="choose">choose</option>
							<option value="city">City Tour</option>
							<option value="hike">Hike</option>
							<option value="scenic drive">Scenic Drive</option>
							<option value="indoors">Indoors</option>
						</select>
					</div>

					<div className="inputs">
						<label>Duration (hours)</label>
						<input name='duration' value={duration} type="number" onChange={this.inputHandler} />
					</div>

					<div className="inputs">
						<label>Associated Costs</label>
						<input name='costs' value={costs} type="number" onChange={this.inputHandler} />
					</div>

					<div className="inputs">
						<label>Price of Tour</label>
						<input name='price' value={price} type="number" onChange={this.inputHandler} />
					</div>

					<div className="inputs">
						<label>Difficulty</label>
						<select name="difficulty" value={difficulty} onChange={this.inputHandler}>
							<option value="choose">choose</option>
							<option value="easy">Easy</option>
							<option value="normal">Normal</option>
							<option value="hard">Hard</option>
						</select>
					</div>

					<button>Publish</button>
				</form>
			</div>
		)
	}
}