import {createStore} from 'redux';

const initialState = {
	username: '',
	login_id: null,
	loc: {lat: null, lng: null}
}

export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'
export const SET_LOCATION = 'SET_LOCATION'

export function updateUser(login_id, username) {
	return {
		type: SET_USER,
		payload: {login_id, username}
	}
}

export function clearUser() {
	return {
		type: CLEAR_USER
	}
}

export function setLocation(loc) {
	return {
		type: SET_LOCATION,
		payload: {loc}
	}
}

export function getLocation() {
	return 
}

const userReducer = (state = initialState, action) => {
	const {type, payload} = action
	switch(type) {
		case SET_USER:
			return {...state, ...payload}
		case CLEAR_USER:
			return initialState
		case SET_LOCATION:
			return {...state, ...payload}
		default:
			return state
	}
}

export default createStore(userReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());