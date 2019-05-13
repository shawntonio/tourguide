import React, { Component } from 'react'
import axios from 'axios'

import ContentMap from '../../maps/ContentMap'
import EditorHeader from './EditorHeader'

export default class Preview extends Component {

	state = {
		tour: {},
		content: [],
		activeMarker: {},
		showInfoWindow: false
	}

	async componentDidMount() {
		const { id } = this.props.match.params

		axios.get(`/api/tour/${id}`).then(res => {
			this.setState({ tour: res.data })
		}).catch(err => console.log(err))

		axios.get(`/api/content/${id}`).then(res => {
			this.setState({ content: res.data })
		})
	}

	setMarker = (marker, bool) => {
		this.setState({ activeMarker: marker, showInfoWindow: bool })
	}

	deleteContent = () => {
		axios.delete(`/api/content/${this.state.activeMarker.contentId}`)
		.then(() => {
			console.log('hit')
				this.componentDidMount()
				this.setState({ activeMarker: {}, showInfoWindow: false })
			})
			.catch(err => console.log(err))
	}

	render() {
		const { id } = this.props.match.params
		return (
			<div style={{ height: '100vh', width: '100vw' }}>
				<header style={{marginBottom: '5px'}}>
					logo
					{this.state.showInfoWindow && <EditorHeader activeMarker={this.state.activeMarker} deleteContent={this.deleteContent} />}

				</header>
				{
					this.state.content[0] && <ContentMap id={id} setMarker={this.setMarker} {...this.state} />
				}
			</div>
		)
	}
}