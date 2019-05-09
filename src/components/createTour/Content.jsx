import React, {Component} from 'react'
import Recorder from './recorder/Recorder'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import {v4 as randomString} from 'uuid';

class Content extends Component {

	state = {
		object_key: '',
		order_pos: null
	}

	componentDidMount() {
		!this.props.username && this.props.history.replace(`/account?${this.props.history.location.pathname}`)
	}

	getSig = (blob, location) => {
		const filename = `tour${this.props.match.params.id}content${randomString()}`

		this.setState({
			order_pos: this.props.match.params.count,
			object_key: filename
		})

		Axios.get('/api/sig', {
			params: {
				filename,
				filetype: blob.type
			}
		}).then(res => {
			const {signedRequest, url} = res.data
			this.uploadBlob(blob, signedRequest, url, location)
		}).catch(err => console.log(err))
	}

	uploadBlob = (blob, signedRequest, url, location) => {
		const options = {
      headers: {
        'Content-Type': blob.type,
      },
		}
		Axios.put(signedRequest, blob, options)
		.then(() => {
			const {id: tour_id} = this.props.match.params
			const {order_pos, object_key} = this.state
			Axios.post('/api/content', {url, tour_id, location, order_pos, object_key})
			.then()
			.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
	}
	
	render() {
		const {id} = this.props.match.params
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