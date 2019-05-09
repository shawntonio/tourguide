import {createStore} from 'redux';

const initialState = {
	username: '',
	login_id: null
}

export const SET_USER = 'SET_USER'
export const GET_USER = 'GET_USER'
export const CLEAR_USER = 'CLEAR_USER'

export function updateUser(login_id, username) {
	return {
		type: SET_USER,
		payload: {login_id, username}
	}
}

export function clearUser() {
	return {
		type: CLEAR_USER,
	}
}

const userReducer = (state = initialState, action) => {
	const {type, payload} = action
	switch(type) {
		case SET_USER:
			return {...state, ...payload}
		case CLEAR_USER:
			return initialState
		default:
			return state
	}
}

export default createStore(userReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());