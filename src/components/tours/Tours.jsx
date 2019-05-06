import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import LocalTours from './LocalTours'
import FromFollowed from './FromFollowed'


class Tours extends Component {



	render() {
		return (
			<div>
				<header>
					<Link to='/account'>
						<div>Account</div>
					</Link>
				</header>
				{/* <nav><div>Local Tours</div> <div>From Favorite Guides</div></nav> */}
				<Switch>
					<Route exact path='/' component={LocalTours} />
					<Route path='/from-followed' component={FromFollowed} />
				</Switch>
			</div>

		)
	}
}

export default Tours