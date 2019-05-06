
const initialState = {
	name: '',
	location: '',
	costs: '',
	price: null,
	type: '',
	time: '',
	difficulty: '',
	live: false
}

export const UPDATE = 'UPDATE'

export default (state = initialState, action) => {
	const {type, payload} = action
	switch (type) {
		case UPDATE:
			return {...state, ...payload}	
		default:
			return state
	}
}