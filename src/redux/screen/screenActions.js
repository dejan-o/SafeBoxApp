import screenTypes from './screenTypes';


export const  setScreenActive = (payload) => ({
	type: screenTypes.SET_SCREEN_ACTIVE,
	payload
});


export const setScreenMessage = (payload) => ({
	type: screenTypes.SET_SCREEN_MESSAGE,
	payload
});

