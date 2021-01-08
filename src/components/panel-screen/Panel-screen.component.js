import React from 'react';
import './Panel-screen.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScreenMessage, resetInputSequence, setIsLocked, setBoxCode, setScreenActive } from '../../redux/actions';
import { screenMessages } from '../../constants';

const PanelScreen = ({ screenMessage, inputSequence, isLocked, setScreenMessage, resetInputSequence, setIsLocked, setBoxCode, boxCode, setScreenActive, isActive }) => {
	
	//checking locking sequence (locking sequence should contain 6 digits and 7th character 'L')
	function checkLockingSequence(sequence){
		if(sequence[sequence.length - 1] === 'L' && sequence.length === 7 && typeof +sequence.substring(0, 6) === 'number')
			return true;
		return false;
	}

	//checking unlocking sequence (unlocking sequence should contain 6 digits)
	function checkUnlockingSequence(sequence, boxCode){
		if(sequence.length === 6 && typeof +sequence === 'number' && sequence === boxCode)
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
		<section className={`panel-screen ${isActive ? 'light-on' : 'light-off'}`}>
			<span className="panel-screen__left">{ isLocked ? 'Locked' : 'Unlocked' }</span>
			<span className="panel-screen__main">{ renderSequence(inputSequence) || screenMessage }</span>
		</section>
	);
};

PanelScreen.propTypes = {
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
};


const mapStateToProps = (state) => {
	return {
		screenMessage: state.screenMessage,
		inputSequence: state.inputSequence,
		isLocked: state.isLocked,
		boxCode: state.code,
		isActive: state.isActive,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setScreenMessage: (msg) => dispatch(setScreenMessage(msg)),
		resetInputSequence: () => dispatch(resetInputSequence()),
		setIsLocked: () => dispatch(setIsLocked()),
		setBoxCode: (code) => dispatch(setBoxCode(code)),
		setScreenActive: (payload) => dispatch(setScreenActive(payload)), 
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelScreen);
