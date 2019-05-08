import React, {Component} from 'react';
import ChooseMap from '../../maps/ChooseMap';

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
				console.log(mediaRecorder)
				this.setState({
					mediaRecorder
				})
				//listeners
				mediaRecorder.ondataavailable = e => {
					this.state.chunks.push(e.data)
					console.log(e.data)
				}
				mediaRecorder.onstop = e => {
					const {chunks, blob} = this.state
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
		const {chunks, mediaRecorder} = this.state
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
		console.log(this.audioRef.current)
		return(
			<div>
				<audio ref={this.audioRef} controls ></audio>
				<div className="recordButtons">
					<button onClick={this.startRecording}>record</button>
					<button onClick={this.stopRecording}>stop</button>
				</div>
				<ChooseMap clickLocation={this.clickLocation} currentLocation={this.state.location} />
				<button>Add Point of Interest</button>
			</div>
		)
	}
}