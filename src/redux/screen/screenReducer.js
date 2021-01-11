import screenTypes from './screenTypes';


const initState = {
	message: '',
	isActive: false,
};


const screenReducer = (state = initState, action = {}) => {
	switch(action.type){
	case screenTypes.SET_SCREEN_ACTIVE:
		return { ...state, isActive: action.payload };
	case screenTypes.SET_SCREEN_MESSAGE:
		return { ...state, message: action.payload };
	default:
		return state;
	}
};

export default screenReducer;
