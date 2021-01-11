import { combineReducers } from 'redux';

import logicReducer from './safeBoxLogic/logicReducer';
import screenReducer from './screen/screenReducer';

export default combineReducers({
	logic: logicReducer,
	screen: screenReducer
});