import React from 'react';

const EditorHeader = (props) => (
	<div className='content-edit'>
		<button onClick={props.deleteContent}>Delete</button>
	</div>
)

export default EditorHeader