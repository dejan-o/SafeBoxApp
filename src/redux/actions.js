import actionTypes from './types';

export const handleKeyPress = (payload) => ({
	type: actionTypes.HANDLE_KEYPRESS,
	payload
});

export const  setScreenActive = (payload) => ({
	type: actionTypes.SET_SCREEN_ACTIVE,
	payload
});


export const setScreenMessage = (payload) => ({
	type: actionTypes.SET_SCREEN_MESSAGE,
	payload
});

export const setIsLocked = () => ({
	type: actionTypes.SET_IS_LOCKED,
});

export const setBoxCode = (payload) => ({
	type: actionTypes.SET_BOX_CODE,
	payload
});

export const resetInputSequence = () => ({
	type: actionTypes.RESET_INPUT_SEQUENCE, 
});

