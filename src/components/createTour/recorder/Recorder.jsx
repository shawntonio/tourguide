import React, {Component} from 'react';
// import getSig from './GetSig'
import Axios from 'axios';
import {v4 as randomString} from 'uuid';

export default class Recorder extends Component {
	constructor(props) {
		super(props)

		this.audioRef = React.createRef();

		this.state = {
			mediaRecorder: null,
			chunks: [],
			blob: null		
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
			.then(() => this.props.clearAddMarker())
			.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
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

	addPOI = () => {
		const lat = this.props.addMarkerLatLng.lat()
		const lng = this.props.addMarkerLatLng.lng()
		this.getSig(this.state.blob, {lat, lng}, this.props.tourId)
	}

	render() {
		return(
			<div>
				<div className="recordButtons">
					<i className="fas fa-dot-circle fa-2x" onClick={this.startRecording}></i>
					<i className="fas fa-stop-circle fa-2x" onClick={this.stopRecording}></i>
				</div>
				{this.state.blob && <div>
						<audio ref={this.audioRef} controls ></audio> 
						<button onClick={this.addPOI}>Add Point of Interest</button>
					</div>
				}
				
			</div>
		)
	}
}