import { all, call } from 'redux-saga/effects';
import logicSagas from './safeBoxLogic/logicSagas';


export default function* rootSaga(){
	yield all([
		call(logicSagas),
	]);
}