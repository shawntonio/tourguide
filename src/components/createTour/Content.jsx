import React, {Component} from 'react'
import Recorder from './recorder/Recorder'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import {v4 as randomString} from 'uuid';

class Content extends Component {

	componentDidMount() {
		!this.props.username && this.props.history.replace(`/account?${this.props.history.location.pathname}`)
	}

	getSig = (blob, location) => {
		const filename = `tour${this.props.match.params.id}content${randomString()}`
		
		Axios.get('/api/sig', {
			params: {
				filename,
				filetype: blob.type
			}
		}).then(res => {
			const {signedRequest, url} = res.data
			this.uploadBlob(blob, signedRequest, url, location, filename)
		}).catch(err => console.log(err))
	}

	uploadBlob = (blob, signedRequest, url, location, object_key) => {
		const options = {
      headers: {
        'Content-Type': blob.type,
      },
		}
		Axios.put(signedRequest, blob, options)
		.then(() => {
			const {id: tour_id, count} = this.props.match.params
			const order_pos = +count + 1
			Axios.post('/api/content', {url, tour_id, location, order_pos, object_key})
			.then(() => this.props.history.push('/my-tours'))
			.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
	}
	
	render() {
		return (
			<div>
				<Recorder getSig={this.getSig} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {username} = state
	return {username}
}

export default connect(mapStateToProps)(withRouter(Content))