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

export const setServiceMode = (payload) => ({
	type: actionTypes.SET_SERVICE_MODE,
	payload
});


//Processing serviceMode sequence
export const serviceModeProcess = (inputSequence, serialNumber, unlockBox, rejectInputSequence) => (dispatch)=>{
	dispatch(resetInputSequence());
	dispatch(setScreenMessage('Validating...'));

	
	fetch(`https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a?c
		ode=${inputSequence}`
	)
		.then(response=>response.json())
		.then(response=>{
			if(response === serialNumber)
				unlockBox();
			else
				rejectInputSequence();
			dispatch(setServiceMode(false));
		});

	
};