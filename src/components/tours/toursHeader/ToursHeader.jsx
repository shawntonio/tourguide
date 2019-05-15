import React from 'react';
import {Link} from 'react-router-dom';

const ToursHeader = (props) => (
	<header>
		<div className="tours-header">
			<Link to='/'>
				<i className="fa fa-globe fa-2x" aria-hidden="true"></i>
			</Link>
			<Link to='/tour-info'>
				<button>
					Create a Tour
				</button>
			</Link>
			<Link to='/account'>
				<i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
			</Link>
		</div>
		<nav className='tours_header_nav'>
			<Link className='link' to='/'>
				<div>Local Tours</div>
			</Link>
			<Link className='link' to='/my-tours'>
				<div>My Tours</div>
			</Link>
		</nav>
	</header>
)

export default ToursHeader