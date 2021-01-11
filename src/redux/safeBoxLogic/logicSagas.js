import { takeLatest, delay, all, put, call, select } from 'redux-saga/effects';
import logicTypes from './logicTypes';
import { setConfirm, setBoxCode, resetInputSequence, setIsLocked, setServiceMode } from './logicActions';
import { setScreenMessage, setScreenActive } from '../screen/screenActions';
export const getConfirm = (state) => state.logic.isConfirmed;
export const getIsLocked = (state) => state.logic.isLocked;
export const getInputSequence = (state) => state.logic.inputSequence;
export const getBoxCode = (state) => state.logic.safeBoxCode;
export const getIsServiceMode = (state) => state.logic.isServiceMode;
export const getKey = (state) => state.logic.key;
export const getIsActive = (state) => state.screen.isActive;
import { screenMessages, serialNumber } from '../../constants';

const fetchData = async (inputSequence) => {
	try{
		const response =  await	fetch(`https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a?c
		ode=${inputSequence}`
		);
		const data = await response.json();
		return data;
	}
	catch (e) {
		console.log(e);
	}
};

function checkLockingSequence(sequence){
	return !!(sequence[sequence.length - 1] === 'L' && sequence.length === 7 &&  !isNaN(+sequence.substring(0, 6)));
}

function checkUnlockingSequence(sequence, boxCode, isServiceMode){
	return !!(sequence.length === 6 && !isNaN(+sequence.substring(0, 6)) && sequence === boxCode && !isServiceMode);
}

function checkIsSequenceForServiceMode(inputSequence, boxCode){
	return !!(inputSequence !== boxCode && inputSequence === '000000');
}


function* saveBoxCode(inputSequence){
	const boxPass = inputSequence.substring(0, 6);
	yield put(setBoxCode(boxPass));
	yield put(resetInputSequence());
	yield put(setScreenMessage(screenMessages.locking));
	yield delay(3000);
	yield put(setIsLocked());
	yield put(setScreenMessage(screenMessages.ready));
	yield delay(200);
	yield put(setConfirm(false));
	yield put(setScreenMessage(screenMessages.blank));
	yield delay(5000);
	yield put(setScreenActive(false));
}

function* rejectSequence(){
	yield put(resetInputSequence());
	yield put(setScreenMessage(screenMessages.error));
	yield delay(1000);
	yield put(setScreenMessage(screenMessages.blank));
	yield put(setConfirm(false));
	yield delay(5000);
	yield put(setScreenActive(false));
}

function* unlockBox(){
	yield put(resetInputSequence());
	yield put(setScreenMessage(screenMessages.unlocking));
	yield delay(3000);
	yield put(setBoxCode(''));
	yield put(setIsLocked());
	yield put(setScreenMessage(screenMessages.ready));
	yield delay(200);
	yield put(setScreenMessage(screenMessages.blank));
	yield put(setConfirm(false));
	yield delay(5000);
	yield put(setScreenActive(false));
}

function* enterServiceMode(){
	yield put(resetInputSequence());
	yield put(setServiceMode(true));
	yield put(setScreenMessage(screenMessages.service));
	yield delay(700);
	yield put(setScreenMessage(screenMessages.blank));
	yield put(setConfirm(false));
	yield delay(5000);
	yield put(setScreenActive(false));
}


export function* onKeyPress({ payload }){
	let confirm = yield select(getConfirm);
	let isLocked = yield select(getIsLocked);
	let inputSequence = yield select(getInputSequence);
	let boxCode = yield select(getBoxCode);
	let isServiceMode = yield select(getIsServiceMode);
	let isActive = yield select(getIsActive);
	if(!isActive)
		yield put(setScreenActive(true));
    
	if(!isLocked && payload ==='L'){
		yield put(setConfirm(true));
	}	
	yield delay(1200);
	if(!confirm)
		yield put(setConfirm(true));
	if(!isLocked){
		if(checkLockingSequence(inputSequence))
			yield saveBoxCode(inputSequence);
		else
			yield rejectSequence();
	}
	else {
		if(checkUnlockingSequence(inputSequence, boxCode, isServiceMode)){
			yield unlockBox();
		}
		else if(isServiceMode){
			yield put(setScreenMessage(screenMessages.validating));
			yield put(resetInputSequence());
			const data = yield call(() => fetchData(inputSequence));
			if(data.sn === serialNumber){
				yield put(setServiceMode(false));
				yield unlockBox();
			}
			else{
				yield put(setServiceMode(false));
				yield rejectSequence();
			}		
		}
		else if(checkIsSequenceForServiceMode(inputSequence, boxCode)){
			yield enterServiceMode();
		}
		else{
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