import { setConfirm, setBoxCode, resetInputSequence, setIsLocked, setServiceMode } from './logicActions';
import { setScreenMessage, setScreenActive } from '../screen/screenActions';
import { screenMessages, serialNumber } from '../../constants';
import { call, put, delay } from 'redux-saga/effects';

export const fetchData = async (inputSequence) => {
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
//must have 6 digits and uppercase char L after digits eg('777555L') 
export function checkLockingSequence(sequence){
	return sequence[sequence.length - 1] === 'L' && sequence.length === 7 &&  !isNaN(+sequence.substring(0, 6));
}
//Checking unlocking sequence, must match boxCode string
export function checkUnlockingSequence(sequence, boxCode, isServiceMode){
	return sequence === boxCode && !isServiceMode;
}
//Checking is sequence for entering service mode
export function checkIsSequenceForServiceMode(inputSequence){
	return inputSequence === '000000';
}


export function* saveBoxCode(inputSequence){
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
export function* rejectSequence(){
	yield put(resetInputSequence());
	yield put(setScreenMessage(screenMessages.error));
	yield delay(1000);
	yield put(setScreenMessage(screenMessages.blank));
	yield put(setConfirm(false));
	yield delay(5000);
	yield put(setScreenActive(false));
}
export function* unlockBox(){
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
export function* enterServiceMode(){
	yield put(resetInputSequence());
	yield put(setServiceMode(true));
	yield put(setScreenMessage(screenMessages.service));
	yield delay(700);
	yield put(setScreenMessage(screenMessages.blank));
	yield put(setConfirm(false));
	yield delay(5000);
	yield put(setScreenActive(false));
}
export function* processServiceSequence(inputSequence, fetchMasterCode){
	yield put(setScreenMessage(screenMessages.validating));
	yield put(resetInputSequence());
	const data = yield call(() => fetchMasterCode(inputSequence));
	if(data.sn === serialNumber){
		yield put(setServiceMode(false));
		yield unlockBox();
	}
	else{
		yield put(setServiceMode(false));
		yield rejectSequence();
	}
}