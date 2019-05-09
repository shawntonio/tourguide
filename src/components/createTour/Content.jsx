import React, {Component} from 'react'
import Recorder from './recorder/Recorder'

export default class Content extends Component {

	
	
	render() {
		const {id} = this.props.match.params
		return (
			<div>
				<Recorder id={id} />
			</div>
		)
	}
}