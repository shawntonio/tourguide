import React, {Component} from 'react';
import ChooseMap from '../../maps/ChooseMap';
import {Link} from 'react-router-dom';

export default class Recorder extends Component {
	constructor(props) {
		super(props)

		this.audioRef = React.createRef();

		this.state = {
			mediaRecorder: null,
			chunks: [],
			blob: null,
			location: null
		}
	}
	componentDidMount(){
		navigator.geolocation.getCurrentPosition(position => {
			const {latitude: lat, longitude: lng} = position.coords
			this.setState({location: {lat, lng}})
		})

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			console.log('getUserMedia supported.');
			navigator.mediaDevices.getUserMedia({audio: true})
			.then(stream => {
				const mediaRecorder = new MediaRecorder(stream)
				this.setState({
					mediaRecorder
				})
				//listeners
				mediaRecorder.ondataavailable = e => {
					this.state.chunks.push(e.data)
				}
				mediaRecorder.onstop = e => {
					const {chunks} = this.state
					this.setState({
						blob: new Blob(chunks, { 'type' : chunks[0].type}),
						chunks: []
					})

					this.audioRef.current.src = URL.createObjectURL(this.state.blob)
				}
			})
			.catch(err => console.log(err))
		} else {
			console.log('getUserMedia not supported on your browser!')
		}
	}

	startRecording = () => {
		const {mediaRecorder} = this.state
		mediaRecorder.start()
		console.log(mediaRecorder.state)
	}

	stopRecording = () => {
		this.state.mediaRecorder.stop()
		console.log(this.state.mediaRecorder.state)
	}

	clickLocation = (location) => {
		this.setState({ location })
	}

	render() {
		return(
			<div>
				<div className="recordButtons">
					<button onClick={this.startRecording}>record</button>
					<button onClick={this.stopRecording}>stop</button>
				</div>
				{this.state.blob && <audio ref={this.audioRef} controls ></audio> }
				<ChooseMap clickLocation={this.clickLocation} currentLocation={this.state.location} />
				<Link to='/my-tours'>
					<button onClick={() => this.props.getSig(this.state.blob, this.state.location)}>Add Point of Interest</button>
				</Link>
			</div>
		)
	}
}