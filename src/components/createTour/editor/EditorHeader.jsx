import React from 'react';

const EditorHeader = (props) => (
	<div>
		{props.activeMarker.title}
		<button>Move</button>
		<button onClick={props.deleteContent}>Delete</button>
	</div>
)

export default EditorHeader