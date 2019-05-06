import React, {Component} from 'react'
import {Link} from 'react-router-dom'



export default class CreateTour extends Component {

	render() {
		
		return (
			<div>
				My tours 
				<Link to='/tour-info'>Create Tour</Link>
				
			</div>
		)
	}
}