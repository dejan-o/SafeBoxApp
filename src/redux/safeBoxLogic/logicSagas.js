import { takeLatest, delay, all, put, call, select } from 'redux-saga/effects';
import logicTypes from './logicTypes';
import { setConfirm } from './logicActions';
import { setScreenActive } from 'redux/screen/screenActions';
import { fetchData, checkIsSequenceForServiceMode, checkUnlockingSequence, checkLockingSequence, unlockBox, saveBoxCode, rejectSequence, enterServiceMode, processServiceSequence } from './sagaUtils';
export const getConfirm = (state) => state.logic.isConfirmed;
export const getIsLocked = (state) => state.logic.isLocked;
export const getInputSequence = (state) => state.logic.inputSequence;
export const getBoxCode = (state) => state.logic.safeBoxCode;
export const getIsServiceMode = (state) => state.logic.isServiceMode;
export const getKey = (state) => state.logic.key;
export const getIsActive = (state) => state.screen.isActive;


export function* onKeyPress({ payload }){
	let confirm = yield select(getConfirm);
	let isLocked = yield select(getIsLocked);
	let inputSequence = yield select(getInputSequence);
	let boxCode = yield select(getBoxCode);
	let isServiceMode = yield select(getIsServiceMode);
	let isActive = yield select(getIsActive);
	let confirmed = confirm;
	//preprocessing 
	if(!isActive)
		yield put(setScreenActive(true));
    
	if(!isLocked && payload ==='L'){
		yield put(setConfirm(true));
		confirmed = true;
	}	
	yield delay(1200);

	//processing sequence
	if(!confirmed)
		yield put(setConfirm(true));
	if(!isLocked){
		switch(true){
		case checkLockingSequence(inputSequence):
			yield saveBoxCode(inputSequence);
			break;
		default:
			yield rejectSequence();
		}
	}
	else {
		switch(true){
		case checkUnlockingSequence(inputSequence, boxCode, isServiceMode):
			yield unlockBox();
			break;
		case isServiceMode:
			yield processServiceSequence(inputSequence, fetchData);
			break;	
		case checkIsSequenceForServiceMode(inputSequence):
			yield enterServiceMode();
			break;
		default:
			yield rejectSequence();
		}
	}
}

export function* handleKeyClick(){
	yield takeLatest(logicTypes.HANDLE_KEYPRESS, onKeyPress);
}

export default function* logicSagas(){
	yield (all([call(handleKeyClick)]));
}