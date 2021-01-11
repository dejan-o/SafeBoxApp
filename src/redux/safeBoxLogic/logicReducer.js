import logicTypes from './logicTypes';

const initState = {
	inputSequence: '',
	safeBoxCode: '',
	isServiceMode: false,
	isLocked: false,
	isConfirmed: false,
};


const logicReducer = (state = initState, action = {}) => {
	switch(action.type){
	case logicTypes.HANDLE_KEYPRESS:
		return { ...state, inputSequence: state.inputSequence + action.payload };
	case logicTypes.SET_IS_LOCKED:
		return { ...state, isLocked: !state.isLocked };
	case logicTypes.SET_BOX_CODE:
		return { ...state, safeBoxCode: action.payload };
	case logicTypes.RESET_INPUT_SEQUENCE:
		return { ...state, inputSequence: '' };
	case logicTypes.SET_SERVICE_MODE:
		return { ...state, isServiceMode: action.payload };
	case logicTypes.SET_CONFIRM:
		return { ...state, isConfirmed: action.payload };
	default:
		return state;
	}
};

export default logicReducer;
