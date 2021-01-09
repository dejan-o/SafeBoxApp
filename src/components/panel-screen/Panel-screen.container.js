import React from 'react';
import './Panel-screen.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScreenMessage, resetInputSequence, setIsLocked, setBoxCode, setScreenActive, setServiceMode, serviceModeProcess } from '../../redux/actions';
import { screenMessages, serialNumber } from '../../constants';
import PanelScreen from './Panel-screen.component';

const PanelScreenContainer = ({ 
	screenMessage, 
	inputSequence, 
	isLocked, 
	setScreenMessage, 
	resetInputSequence, 
	setIsLocked, 
	setBoxCode, 
	boxCode, 
	setScreenActive, 
	isActive, 
	setServiceMode, 
	serviceModeProcess,
	isServiceMode, 
}) => {
	
	//checking locking sequence (locking sequence should contain 6 digits and 7th character 'L')
	function checkLockingSequence(sequence){
		if(sequence[sequence.length - 1] === 'L' && sequence.length === 7 &&  !isNaN(+sequence.substring(0, 6)))
			return true;
		return false;
	}

	//checking unlocking sequence (unlocking sequence should contain 6 digits)
	function checkUnlockingSequence(sequence, boxCode){
		if(sequence.length === 6 && !isNaN(+sequence.substring(0, 6)) && sequence === boxCode && !isServiceMode)
			return true;
		return false;
	}

	//save boxcode, change lock status and update screen messages
	function saveBoxCode(){
		const boxPass = inputSequence.substring(0, 6);
		setBoxCode(boxPass);
		resetInputSequence();
		setScreenMessage(screenMessages.locking);
		setTimeout(() => {
			setIsLocked();
			setScreenMessage(screenMessages.ready);
			setTimeout( () => {
				setScreenMessage(screenMessages.blank);
			}, 500);
		}, 3000);
	}

	//unlock box, change islocked, message and box code state 
	function unlockBox(){
		resetInputSequence();
		setScreenMessage(screenMessages.unlocking);
		setTimeout(() => {
			setBoxCode('');
			setIsLocked();
			setScreenMessage(screenMessages.ready);
			setTimeout( () => {
				setScreenMessage(screenMessages.blank);
			}, 500);
		}, 3000);
	}

	//reject input sequence for locking/unlocking and show error on the screen
	function rejectSequence(){
		resetInputSequence();
		setScreenMessage(screenMessages.error);
		setTimeout( () => {setScreenMessage(screenMessages.blank);}, 1000);
	}
	//check if sequence is for entering service mode
	function checkIsSequenceForServiceMode(){
		if(inputSequence !== boxCode && inputSequence === '000000')
			return true; 
		return false;
	}

	function enterServiceMode(){
		resetInputSequence();
		setServiceMode(true);
		setScreenMessage(screenMessages.service);
		setTimeout(() => {
			setTimeout( () => {
				setScreenMessage(screenMessages.blank);
			}, 500);
		}, 700);
	}
    
	//render last 10digit if code is longer than 10 characters, if sequence is for locking dont show character L on the end
	function renderSequence(sequence){
		if(!sequence.length)
			return '';
		if(sequence > 10)
			sequence = sequence.substring(sequence.length-10);
		if(sequence[sequence.length - 1] === 'L' && !isLocked)
			return sequence.substring(0, sequence.length - 1);
		return sequence;
	}

	
	//if there is input sequence and sequence doesnt change for 1.2 s, code will be proccesed for unlocking/locking
	React.useEffect( () => {
		if(inputSequence && !isActive)
			setScreenActive(true);

		const timeoutId = setTimeout( () => {
			if(inputSequence){
				if(!isLocked){
					if(checkLockingSequence(inputSequence)){
						saveBoxCode();
					}
					else{
						rejectSequence();
					}
				} else {
					if(checkUnlockingSequence(inputSequence, boxCode)){
						unlockBox();
					}
					else if(isServiceMode){
						serviceModeProcess(inputSequence, serialNumber, unlockBox, rejectSequence);
					}
					else if(checkIsSequenceForServiceMode()){
						enterServiceMode();
					}
					else{
						rejectSequence();
					}
				}
			}
		}, 1200);

		return () => {
			clearTimeout(timeoutId);
		};

	}, [inputSequence]);


	//disabling screen light if system is inactive for 5s
	React.useEffect( () => {
		const activeId = setTimeout( () => {
			if(isActive)
				setScreenActive(false);
		}, 5000);

		return () => clearTimeout(activeId);
	}, [isLocked, isActive, inputSequence, screenMessage]);


	return (
		<PanelScreen isActive={isActive} isLocked={isLocked} inputSequence={inputSequence} screenMessage={screenMessage} renderSequence={renderSequence}/>
	);
};

PanelScreenContainer.propTypes = {
	screenMessage: PropTypes.string.isRequired,
	inputSequence: PropTypes.string.isRequired,
	isLocked: PropTypes.bool.isRequired,
	setScreenMessage: PropTypes.func.isRequired,
	resetInputSequence: PropTypes.func.isRequired,
	setIsLocked: PropTypes.func.isRequired,
	setBoxCode: PropTypes.func.isRequired,
	boxCode: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired,
	setScreenActive: PropTypes.func.isRequired,
	setServiceMode: PropTypes.func.isRequired,
	serviceModeProcess: PropTypes.func.isRequired,
	isServiceMode: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => {
	return {
		screenMessage: state.screenMessage,
		inputSequence: state.inputSequence,
		isLocked: state.isLocked,
		boxCode: state.code,
		isActive: state.isActive,
		isServiceMode: state.isServiceMode
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setScreenMessage: (msg) => dispatch(setScreenMessage(msg)),
		resetInputSequence: () => dispatch(resetInputSequence()),
		setIsLocked: () => dispatch(setIsLocked()),
		setBoxCode: (code) => dispatch(setBoxCode(code)),
		setScreenActive: (payload) => dispatch(setScreenActive(payload)),
		setServiceMode: (payload) => dispatch(setServiceMode(payload)), 
		serviceModeProcess: (inputSequence, sn, unlockBox, rejectSequence) => dispatch(serviceModeProcess(inputSequence, sn, unlockBox, rejectSequence)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelScreenContainer);
