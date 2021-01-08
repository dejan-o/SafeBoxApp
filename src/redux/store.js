import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import mainReducer from './reducer';


const store = createStore(mainReducer, applyMiddleware(logger));

export default store;