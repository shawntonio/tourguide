import {createStore} from 'redux';

const initialState = {
	username: '',
	login_id: null
}

export const SET_USER = 'SET_USER'
export const GET_USER = 'GET_USER'
export const CLEAR_USER = 'CLEAR_USER'

const userReducer = (state = initialState, action) => {
	const {type, payload} = action
	switch(type) {
		
		default:
			return state
	}
}

export default createStore(userReducer);