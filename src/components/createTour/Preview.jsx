import React, {Component} from 'react'
import ContentMap from '../maps/ContentMap'

export default class Preview extends Component {

	render() {
		const {id} = this.props.match.params
		return (
			<div style={{height: '100vh', width:'100vw'}}>
				<ContentMap id={id} />
			</div>
		)
	}
}