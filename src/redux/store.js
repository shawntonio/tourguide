import {createStore, combineReducers} from 'redux';

import tourReducer from './tourReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	tour: tourReducer,
	user: userReducer
})

export default createStore(rootReducer);