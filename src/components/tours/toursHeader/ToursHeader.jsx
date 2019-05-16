import React from 'react';
import {Link} from 'react-router-dom';

const ToursHeader = (props) => (
	<header>
		<div className="tours-header">
			<Link className='link' to='/'>
				<h1 className='logo'>LOX</h1>
			</Link>
			<Link to='/tour-info'>
				<button>
					Create a Tour
				</button>
			</Link>
			<Link to='/account'>
			<i className="fas fa-user-circle fa-2x"></i>
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