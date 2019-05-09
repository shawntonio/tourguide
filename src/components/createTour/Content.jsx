import React, {Component} from 'react'
import Recorder from './recorder/Recorder'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Content extends Component {

	componentDidMount() {
		!this.props.username && this.props.history.replace(`/account?${this.props.history.location.pathname}`)
	}
	
	render() {
		const {id} = this.props.match.params
		return (
			<div>
				<Recorder id={id} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {username} = state
	return {username}
}

export default connect(mapStateToProps)(withRouter(Content))