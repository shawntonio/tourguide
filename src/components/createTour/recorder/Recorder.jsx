import React, {Component} from 'react';
import Axios from 'axios';
import {v4 as randomString} from 'uuid';

export default class Recorder extends Component {
	constructor(props) {
		super(props)
		this.audioRef = React.createRef();
		this.soundBar = React.createRef();
		this.state = {
			mediaRecorder: null,
			chunks: [],
			blob: null,
			recording: false
		}
	}
	componentDidMount(){
		const newDiv = document.createElement('div')

		navigator.geolocation.getCurrentPosition(position => {
			const {latitude: lat, longitude: lng} = position.coords
			this.setState({location: {lat, lng}})
		})

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({audio: true})
			.then(stream => {
				const mediaRecorder = new MediaRecorder(stream)
				this.setState({
					mediaRecorder
				})
				//listeners
				mediaRecorder.ondataavailable = e => {
					this.state.chunks.push(e.data)
					const {size} = e.data
					if (size > 860) {
						this.soundBar.current.appendChild(newDiv)
						newDiv.classList.add('sound3')
					} else if (size > 820) {
						this.soundBar.current.appendChild(newDiv)
						newDiv.classList.add('sound2')
					} else if (size > 780) {
						this.soundBar.current.appendChild(newDiv)
						newDiv.classList.add('sound1')
					}
				}
					
				mediaRecorder.onstop = e => {
					console.log(this.state.chunks)
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

	getSig = (blob, location, tourId) => {
		const filename = `tour${tourId}content${randomString()}`
	
		Axios.get('/api/sig', {
			params: {
				filename,
				filetype: blob.type
			}
		}).then(res => {
			const {signedRequest, url} = res.data
			this.uploadBlob(blob, signedRequest, url, location, filename, tourId)
		}).catch(err => console.log(err))
	}
	
	uploadBlob = (blob, signedRequest, url, location, object_key, tour_id) => {
		const options = {
			headers: {
				'Content-Type': blob.type,
			},
		}
		Axios.put(signedRequest, blob, options)
		.then(() => {
			Axios.post('/api/content', {url, tour_id, location, object_key})
			.then(() => {
				this.props.clearAddMarker()
				this.props.changePrompt('Click marker to edit point of interest')
			})
			.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
	}

	startRecording = () => {
		const {mediaRecorder} = this.state
		this.setState({recording: true})
		mediaRecorder.start(100)
	}
	
	stopRecording = () => {
		this.setState({recording: false})
		this.state.mediaRecorder.stop()
	}
	
	addPOI = () => {
		const lat = this.props.addMarkerLatLng.lat()
		const lng = this.props.addMarkerLatLng.lng()
		this.getSig(this.state.blob, {lat, lng}, this.props.tourId)
	}

	render() {
		return(
			<div className='recorder'>
				<div className="recordButtons">
					<i className={`fas fa-dot-circle fa-2x ${this.state.recording ? 'hide' : null}`} onClick={this.startRecording}></i>
					<i className={`fas fa-stop-circle fa-2x ${!this.state.recording ? 'hide' : null}`} onClick={this.stopRecording}></i>
				</div>
				<div className="sound-bar" ref={this.soundBar}></div>
				{this.state.blob && <div className='audio-controls'>
					<audio ref={this.audioRef} controls ></audio> 
					<button onClick={this.addPOI}>Add Point of Interest</button>
				</div>}
			</div>
		)
	}
}