import React from 'react';
import {Link} from 'react-router-dom';

const ToursHeader = (props) => (
	<header>
		<Link to='/tour-info'>
			<button>
				Create a Tour
			</button>
		</Link>
		<Link to='/account'>
			<i className="fa fa-user-circle-o" aria-hidden="true"></i>
		</Link>
		<nav>
			<Link to='/'>
				<div>Local Tours</div>
			</Link>
			<Link to='/my-tours'>
				<div>My Tours</div>
			</Link>
		</nav>
	</header>
)

export default ToursHeader