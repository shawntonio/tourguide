import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'


import LocalTours from './LocalTours'
import FromFollowed from './FromFollowed'
import Buy from './Buy'



class Tours extends Component {



	render() {
		return (
				<div>
					<header>
						<Link to='/tour-info'>
							<button>
								Create a Tour
							</button>
						</Link>
						<Link to='/account'>
							<div>Account</div>
						</Link>
					</header>
					{/* <nav><div>Local Tours</div> <div>From Favorite Guides</div></nav> */}
					<Switch>
						<Route exact path='/' component={LocalTours} />
						<Route path='/from-followed' component={FromFollowed} />
						<Route path='/buy' component={Buy} />
					</Switch>
				</div>
		)
	}
}

export default Tours