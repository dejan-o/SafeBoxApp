import actionTypes from './types';

const initState = {
	isLocked: false,
	screenMessage: '',
	isActive: false,
	code: '',
	inputSequence: '',
	isServiceMode: false,
};

const mainReducer = (state = initState, action = {}) => {
	switch(action.type){
	case actionTypes.HANDLE_KEYPRESS:
		return { ...state, inputSequence: state.inputSequence + action.payload };
	case actionTypes.SET_SCREEN_ACTIVE:
		return { ...state, isActive: action.payload };
	case actionTypes.SET_SCREEN_MESSAGE:
		return { ...state, screenMessage: action.payload };
	case actionTypes.SET_IS_LOCKED:
		return { ...state, isLocked: !state.isLocked };
	case actionTypes.SET_BOX_CODE:
		return { ...state, code: action.payload };
	case actionTypes.RESET_INPUT_SEQUENCE:
		return { ...state, inputSequence: '' };
	case actionTypes.SET_SERVICE_MODE:
		return { ...state, isServiceMode: action.payload };
	default:
		return state;
	}
};

export default mainReducer;
