import logicTypes from './logicTypes';

export const handleKeyPress = (payload) => ({
	type: logicTypes.HANDLE_KEYPRESS,
	payload
});

export const setIsLocked = () => ({
	type: logicTypes.SET_IS_LOCKED,
});

export const setBoxCode = (payload) => ({
	type: logicTypes.SET_BOX_CODE,
	payload
});

export const resetInputSequence = () => ({
	type: logicTypes.RESET_INPUT_SEQUENCE, 
});

export const setServiceMode = (payload) => ({
	type: logicTypes.SET_SERVICE_MODE,
	payload
});

export const setConfirm = (payload) => ({
	type: logicTypes.SET_CONFIRM,
	payload
});



