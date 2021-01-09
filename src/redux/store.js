import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import mainReducer from './reducer';

const middlewares = [thunkMiddleware];

if(process.env.NODE_ENV === 'development'){
	middlewares.push(logger);
}


const store = createStore(mainReducer, applyMiddleware(...middlewares));

export default store;