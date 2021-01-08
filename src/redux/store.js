import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import mainReducer from './reducer';


const store = createStore(mainReducer, applyMiddleware(thunkMiddleware, logger));

export default store;